"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoProps {
    data: {
        title: string;
        price: number;
        offer_price?: number | null;
    };
    errors: Record<string, string[]>;
    onChange: (field: string, val: string | number | null) => void;
}

export function BasicInfoSection({ data, errors, onChange }: BasicInfoProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                {/* Titel */}
                <div className="space-y-2">
                    <Label
                        htmlFor="title"
                        className={errors.title ? "text-destructive" : ""}
                    >
                        Produkt-Titel
                    </Label>
                    <Input
                        id="title"
                        value={data.title}
                        onChange={(e) => onChange("title", e.target.value)}
                        placeholder="z.B. Articulated Dragon Model"
                        className={errors.title ? "border-destructive" : ""}
                    />
                    {errors.title && (
                        <p className="text-xs text-destructive">
                            {errors.title[0]}
                        </p>
                    )}
                </div>

                {/* Preise */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">Basis-Preis (€)</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={data.price}
                            onChange={(e) => onChange("price", e.target.value)}
                            placeholder="0.00"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="offer_price" className="text-primary">
                            Angebot (€)
                        </Label>
                        <Input
                            id="offer_price"
                            type="number"
                            step="0.01"
                            value={data.offer_price || ""}
                            onChange={(e) =>
                                onChange(
                                    "offer_price",
                                    e.target.value === ""
                                        ? null
                                        : e.target.value,
                                )
                            }
                            placeholder="Optional"
                            className="border-primary/30 focus-visible:ring-primary/30"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
