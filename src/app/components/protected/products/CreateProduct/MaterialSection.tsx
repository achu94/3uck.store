// src/app/components/protected/products/CreateProduct/MaterialSection.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MaterialSectionProps {
    selected: string[];
    error?: string;
    onChange: (mats: string[]) => void;
}

const MATERIALS = ["PLA", "PETG", "ABS", "ASA", "TPU (Flex)", "Carbon"];

export function MaterialSection({
    selected,
    error,
    onChange,
}: MaterialSectionProps) {
    const toggle = (m: string) => {
        const next = selected.includes(m)
            ? selected.filter((x) => x !== m)
            : [...selected, m];
        onChange(next);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label className={error ? "text-destructive" : ""}>
                    Material (Filament)
                </Label>
                <Badge variant="outline" className="text-[10px] font-bold">
                    MULTIPLE
                </Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {MATERIALS.map((m) => (
                    <button
                        key={m}
                        type="button"
                        onClick={() => toggle(m)}
                        className={cn(
                            "h-10 text-xs font-medium border rounded-md transition-all",
                            selected.includes(m)
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background border-input hover:bg-muted",
                        )}
                    >
                        {m}
                    </button>
                ))}
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}
