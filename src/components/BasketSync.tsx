"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useAtom } from "jotai";
import { basketAtom } from "@/atoms/basket";
import { saveCartToDb } from "@/actions/cart/save-cart";
import { loadCartFromDb } from "@/actions/cart/load-cart";

export function BasketSync() {
    const { data: session, status } = useSession();
    const [basket, setBasket] = useAtom(basketAtom);
    const initialized = useRef(false);
    const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // On login, merge DB cart into local state
    useEffect(() => {
        if (status === "authenticated" && !initialized.current) {
            initialized.current = true;
            loadCartFromDb().then((dbItems) => {
                if (dbItems.length === 0) return;
                setBasket((current) => {
                    const merged = [...current];
                    for (const dbItem of dbItems) {
                        const exists = merged.find(
                            (i) =>
                                i.productId === dbItem.productId &&
                                i.selectedColor === dbItem.selectedColor &&
                                i.selectedMaterial === dbItem.selectedMaterial &&
                                i.selectedSize === dbItem.selectedSize
                        );
                        if (!exists) merged.push(dbItem);
                    }
                    return merged;
                });
            });
        }
        if (status === "unauthenticated") {
            initialized.current = false;
        }
    }, [status, setBasket]);

    // Debounced save on basket change when authenticated
    useEffect(() => {
        if (status !== "authenticated" || !session?.user) return;
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => {
            saveCartToDb(basket);
        }, 1500);
        return () => {
            if (saveTimer.current) clearTimeout(saveTimer.current);
        };
    }, [basket, status, session]);

    return null;
}
