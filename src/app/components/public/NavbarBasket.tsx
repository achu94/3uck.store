"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAtomValue } from "jotai";
import { basketCountAtom } from "@/atoms/basket";
import { BasketSheet } from "./BasketSheet";

export function NavbarBasket() {
    const count = useAtomValue(basketCountAtom);
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Warenkorb"
                onClick={() => setOpen(true)}
            >
                <ShoppingCart className="h-5 w-5" />
                {count > 0 && (
                    <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center p-0 text-[10px] rounded-full"
                    >
                        {count > 99 ? "99+" : count}
                    </Badge>
                )}
            </Button>

            <BasketSheet open={open} onOpenChange={setOpen} />
        </>
    );
}
