"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import type { BasketItem } from "@/atoms/basket";

function decodeItemTitle(encoded: string): {
    title: string;
    selectedColor?: string;
    selectedMaterial?: string;
    selectedSize?: string;
} {
    const parts = encoded.split("|");
    const title = parts[0] ?? encoded;
    const opts: Record<string, string> = {};
    for (const part of parts.slice(1)) {
        const [key, ...rest] = part.split(":");
        if (key) opts[key] = rest.join(":");
    }
    return {
        title,
        selectedColor: opts["color"],
        selectedMaterial: opts["material"],
        selectedSize: opts["size"],
    };
}

export async function loadCartFromDb(): Promise<BasketItem[]> {
    const session = await auth();
    if (!session?.user?.id) return [];

    const supabase = supabaseServer();

    const { data: orders } = await supabase
        .from("orders")
        .select("id, store_id, stores!inner(slug)")
        .eq("user_id", session.user.id)
        .eq("status", "cart");

    if (!orders?.length) return [];

    const items: BasketItem[] = [];

    for (const order of orders) {
        const storeSlug = (order.stores as unknown as { slug: string } | null)?.slug ?? "";

        const { data: orderItems } = await supabase
            .from("order_items")
            .select("product_id, title, price, quantity")
            .eq("order_id", order.id);

        for (const item of orderItems ?? []) {
            if (!item.product_id) continue;
            const decoded = decodeItemTitle(item.title);
            items.push({
                productId: item.product_id,
                storeId: order.store_id,
                storeSlug,
                title: decoded.title,
                price: item.price,
                quantity: item.quantity,
                selectedColor: decoded.selectedColor,
                selectedMaterial: decoded.selectedMaterial,
                selectedSize: decoded.selectedSize,
            });
        }
    }

    return items;
}
