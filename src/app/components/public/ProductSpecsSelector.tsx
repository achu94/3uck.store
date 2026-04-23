"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "./CheckoutButton";
import { Separator } from "@/components/ui/separator";

type Props = {
    storeId: number;
    storeSlug: string;
    product: { id: string; title: string; price: number };
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
                        className={cn("transition-colors", selected === option && "ring-2 ring-primary ring-offset-1")}
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

            <CheckoutButton
                storeId={storeId}
                storeSlug={storeSlug}
                product={product}
                isLoggedIn={isLoggedIn}
                selectedOptions={selectedOptions || undefined}
            />
        </>
    );
}
