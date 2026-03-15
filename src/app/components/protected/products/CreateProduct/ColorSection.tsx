// src/app/components/protected/products/CreateProduct/ColorSection.tsx
"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ColorSectionProps {
    selected: string[];
    error?: string;
    onChange: (cols: string[]) => void;
}

const STANDARD_COLORS = [
    { name: "Schwarz", hex: "#000000" },
    { name: "Weiß", hex: "#ffffff" },
    { name: "Grau", hex: "#6b7280" },
    { name: "Rot", hex: "#ef4444" },
    { name: "Blau", hex: "#3b82f6" },
    { name: "Grün", hex: "#22c55e" },
    { name: "Gelb", hex: "#eab308" },
    { name: "Orange", hex: "#f97316" },
];

const PREMIUM_COLORS = [
    { name: "Silber", hex: "#c0c0c0" },
    { name: "Gold", hex: "#d4af37" },
    { name: "Kupfer", hex: "#b87333" },
    { name: "Glow", hex: "#a3e635" },
    {
        name: "Rainb.",
        hex: "conic-gradient(from 180deg at 50% 50%, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)",
    },
];

export function ColorSection({ selected, error, onChange }: ColorSectionProps) {
    const toggle = (colorName: string) => {
        const next = selected.includes(colorName)
            ? selected.filter((x) => x !== colorName)
            : [...selected, colorName];
        onChange(next);
    };

    const ColorCircle = ({ c }: { c: { name: string; hex: string } }) => (
        <div className="flex flex-col items-center gap-2">
            <button
                key={c.name}
                type="button"
                onClick={() => toggle(c.name)}
                className={cn(
                    "w-10 h-10 rounded-full border-2 transition-all duration-200",
                    selected.includes(c.name)
                        ? "border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                        : "border-transparent hover:scale-105",
                )}
                style={{ background: c.hex }}
                title={c.name}
            />
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-tight">
                {c.name}
            </span>
        </div>
    );

    return (
        <div className="space-y-6">
            <Label className="text-base font-semibold text-white flex items-center gap-2">
                Verfügbare Farben
            </Label>

            <div className="space-y-6">
                {/* Standard Farben */}
                <div className="space-y-3">
                    <Label className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                        Standard
                    </Label>
                    <div className="flex flex-wrap gap-x-5 gap-y-4">
                        {STANDARD_COLORS.map((c) => (
                            <ColorCircle key={c.name} c={c} />
                        ))}
                    </div>
                </div>

                {/* Premium Farben */}
                <div className="space-y-3">
                    <Label className="text-[10px] text-blue-400 font-mono uppercase tracking-widest">
                        Premium & Effekte
                    </Label>
                    <div className="flex flex-wrap gap-x-5 gap-y-4">
                        {PREMIUM_COLORS.map((c) => (
                            <ColorCircle key={c.name} c={c} />
                        ))}
                    </div>
                </div>
            </div>

            {error && (
                <p className="text-xs text-destructive font-mono mt-2 animate-pulse">
                    {error}
                </p>
            )}
        </div>
    );
}
