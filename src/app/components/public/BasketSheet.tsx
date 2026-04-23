"use client";

import { useAtom, useAtomValue } from "jotai";
import { basketAtom, basketCountAtom, basketTotalAtom, type BasketItem } from "@/atoms/basket";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const formatEur = (value: number) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);

function BasketItemRow({
    item,
    onRemove,
    onChangeQty,
}: {
    item: BasketItem;
    onRemove: () => void;
    onChangeQty: (delta: number) => void;
}) {
    const specs = [item.selectedColor, item.selectedMaterial, item.selectedSize]
        .filter(Boolean)
        .join(", ");

    return (
        <div className="flex gap-3 py-3">
            <div className="relative h-16 w-16 shrink-0 rounded-md overflow-hidden bg-muted">
                {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" unoptimized />
                ) : (
                    <ShoppingCart className="absolute inset-0 m-auto h-6 w-6 text-muted-foreground" />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <Link
                    href={`/${item.storeSlug}/product/${item.productId}`}
                    className="text-sm font-medium line-clamp-1 hover:underline"
                >
                    {item.title}
                </Link>
                {specs && <p className="text-xs text-muted-foreground mt-0.5">{specs}</p>}
                <p className="text-sm font-semibold mt-1">{formatEur(item.price)}</p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
                <button
                    type="button"
                    onClick={onRemove}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-1">
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={() => onChangeQty(-1)}
                        disabled={item.quantity <= 1}
                    >
                        <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm w-5 text-center">{item.quantity}</span>
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={() => onChangeQty(1)}
                    >
                        <Plus className="h-3 w-3" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function BasketSheet({ open, onOpenChange }: Props) {
    const [basket, setBasket] = useAtom(basketAtom);
    const count = useAtomValue(basketCountAtom);
    const total = useAtomValue(basketTotalAtom);

    function removeItem(index: number) {
        setBasket((prev) => prev.filter((_, i) => i !== index));
    }

    function changeQty(index: number, delta: number) {
        setBasket((prev) =>
            prev
                .map((item, i) =>
                    i === index ? { ...item, quantity: item.quantity + delta } : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    function clearBasket() {
        setBasket([]);
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="flex flex-col w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Warenkorb
                        {count > 0 && (
                            <span className="text-sm font-normal text-muted-foreground">
                                ({count} {count === 1 ? "Artikel" : "Artikel"})
                            </span>
                        )}
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto -mx-6 px-6">
                    {basket.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground py-16">
                            <ShoppingCart className="h-12 w-12 opacity-30" />
                            <p className="text-sm">Dein Warenkorb ist leer.</p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {basket.map((item, i) => (
                                <BasketItemRow
                                    key={`${item.productId}-${i}`}
                                    item={item}
                                    onRemove={() => removeItem(i)}
                                    onChangeQty={(delta) => changeQty(i, delta)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {basket.length > 0 && (
                    <SheetFooter className="flex-col gap-3">
                        <Separator />
                        <div className="flex items-center justify-between text-sm font-semibold">
                            <span>Gesamt</span>
                            <span>{formatEur(total)}</span>
                        </div>
                        <Button className="w-full" size="lg" asChild>
                            <Link href="/checkout">Zur Kasse</Link>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-muted-foreground"
                            onClick={clearBasket}
                        >
                            Warenkorb leeren
                        </Button>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}
