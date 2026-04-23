"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAtomValue } from "jotai";
import { basketCountAtom } from "@/atoms/basket";

export function NavbarBasket() {
    const count = useAtomValue(basketCountAtom);

    return (
        <Button variant="ghost" size="icon" className="relative" aria-label="Warenkorb">
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
    );
}
