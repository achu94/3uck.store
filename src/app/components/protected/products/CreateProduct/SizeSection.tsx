// src/app/components/protected/products/CreateProduct/SizeSection.tsx
"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SizeSectionProps {
    selected: string[];
    error?: string;
    onChange: (sizes: string[]) => void;
}

// Typische Größen-Sets – kannst du beliebig erweitern
const COMMON_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];

export function SizeSection({ selected, error, onChange }: SizeSectionProps) {
    const toggleSize = (size: string) => {
        if (selected.includes(size)) {
            onChange(selected.filter((s) => s !== size));
        } else {
            onChange([...selected, size]);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-1">
                <Label
                    className={cn(
                        "text-base font-semibold",
                        error && "text-destructive",
                    )}
                >
                    Verfügbare Größen
                </Label>
                <p className="text-sm text-muted-foreground">
                    Wähle alle Größen aus, in denen dieses Produkt verfügbar
                    ist.
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {COMMON_SIZES.map((size) => {
                    const isSelected = selected.includes(size);
                    return (
                        <button
                            key={size}
                            type="button"
                            onClick={() => toggleSize(size)}
                            className={cn(
                                "px-4 py-2 rounded-md border text-sm font-medium transition-all duration-200",
                                isSelected
                                    ? "bg-blue-600 border-blue-600 text-white shadow-md scale-105"
                                    : "bg-background border-input hover:border-blue-400 hover:bg-blue-50/50 text-foreground",
                            )}
                        >
                            {size}
                        </button>
                    );
                })}
            </div>

            {/* Error Message – falls Zod z.B. sagt "Mindestens eine Größe wählen" */}
            {error && (
                <p className="text-sm font-medium text-destructive animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}

            {/* Anzeige der Auswahl-Zusammenfassung (Optional) */}
            {selected.length > 0 && (
                <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-semibold">Ausgewählt:</span>
                    <div className="flex gap-1">
                        {selected.map((s) => (
                            <span
                                key={s}
                                className="bg-muted px-1.5 py-0.5 rounded border border-border"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
