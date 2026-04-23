"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "./CheckoutButton";
import { Separator } from "@/components/ui/separator";
import { useSetAtom } from "jotai";
import { basketAtom, type BasketItem } from "@/atoms/basket";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

type Props = {
    storeId: number;
    storeSlug: string;
    product: { id: string; title: string; price: number; imageUrl?: string };
    availableMaterials: string[] | null;
    availableColors: string[] | null;
    availableSizes: string[] | null;
    isLoggedIn: boolean;
};

function OptionGroup({
    label,
    options,
    selected,
    onSelect,
}: {
    label: string;
    options: string[];
    selected: string | null;
    onSelect: (value: string) => void;
}) {
    return (
        <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {label}
                {selected && (
                    <span className="ml-2 normal-case font-normal text-foreground">
                        {selected}
                    </span>
                )}
            </h2>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <Button
                        key={option}
                        type="button"
                        size="sm"
                        variant={selected === option ? "default" : "outline"}
                        className={cn(
                            "transition-colors",
                            selected === option && "ring-2 ring-primary ring-offset-1"
                        )}
                        onClick={() => onSelect(selected === option ? "" : option)}
                    >
                        {option}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export function ProductSpecsSelector({
    storeId,
    storeSlug,
    product,
    availableMaterials,
    availableColors,
    availableSizes,
    isLoggedIn,
}: Props) {
    const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const setBasket = useSetAtom(basketAtom);

    const hasMaterials = availableMaterials && availableMaterials.length > 0;
    const hasColors = availableColors && availableColors.length > 0;
    const hasSizes = availableSizes && availableSizes.length > 0;

    const selectedOptions = [
        selectedMaterial && `Material: ${selectedMaterial}`,
        selectedColor && `Farbe: ${selectedColor}`,
        selectedSize && `Größe: ${selectedSize}`,
    ]
        .filter(Boolean)
        .join(", ");

    function addToBasket() {
        const newItem: BasketItem = {
            productId: product.id,
            storeId,
            storeSlug,
            title: product.title,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl,
            selectedColor: selectedColor ?? undefined,
            selectedMaterial: selectedMaterial ?? undefined,
            selectedSize: selectedSize ?? undefined,
        };

        setBasket((prev) => {
            const existingIndex = prev.findIndex(
                (i) =>
                    i.productId === newItem.productId &&
                    i.selectedColor === newItem.selectedColor &&
                    i.selectedMaterial === newItem.selectedMaterial &&
                    i.selectedSize === newItem.selectedSize
            );
            if (existingIndex >= 0) {
                return prev.map((item, idx) =>
                    idx === existingIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, newItem];
        });

        toast.success("In den Warenkorb gelegt", {
            description: product.title,
        });
    }

    return (
        <>
            {hasMaterials && (
                <OptionGroup
                    label="Material"
                    options={availableMaterials}
                    selected={selectedMaterial}
                    onSelect={(v) => setSelectedMaterial(v || null)}
                />
            )}

            {hasColors && (
                <OptionGroup
                    label="Farbe"
                    options={availableColors}
                    selected={selectedColor}
                    onSelect={(v) => setSelectedColor(v || null)}
                />
            )}

            {hasSizes && (
                <OptionGroup
                    label="Größe"
                    options={availableSizes}
                    selected={selectedSize}
                    onSelect={(v) => setSelectedSize(v || null)}
                />
            )}

            {(hasMaterials || hasColors || hasSizes) && <Separator />}

            <div className="flex flex-col gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={addToBasket}
                >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    In den Warenkorb
                </Button>

                <CheckoutButton
                    storeId={storeId}
                    storeSlug={storeSlug}
                    product={product}
                    isLoggedIn={isLoggedIn}
                    selectedOptions={selectedOptions || undefined}
                />
            </div>
        </>
    );
}
