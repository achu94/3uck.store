import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const standardColors = [
    { name: "Schwarz", hex: "#0a0a0a" },
    { name: "Weiß", hex: "#fafafa" },
    { name: "Grau", hex: "#71717a" },
    { name: "Rot", hex: "#ef4444" },
    { name: "Blau", hex: "#3b82f6" },
    { name: "Grün", hex: "#22c55e" },
    { name: "Gelb", hex: "#eab308" },
    { name: "Orange", hex: "#f97316" },
];

const premiumColors = [
    { name: "Silber", hex: "#94a3b8" },
    { name: "Gold", hex: "#fbbf24" },
    { name: "Kupfer", hex: "#b45309" },
    { name: "Glow", hex: "#bef264" },
    {
        name: "Rainb.",
        hex: "linear-gradient(45deg, #ff0000, #ffff00, #00ff00, #0000ff)",
        special: "border-primary/20",
    },
];

interface ColorSectionProps {
    selected: string[];
    onChange: (colors: string[]) => void;
}

export function ColorSection({ selected, onChange }: ColorSectionProps) {
    const toggleColor = (name: string) => {
        const newSelection = selected.includes(name)
            ? selected.filter((c) => c !== name)
            : [...selected, name];
        onChange(newSelection);
    };

    return (
        <div className="space-y-6 pt-4 border-t border-dashed">
            <Label className="text-sm font-semibold flex items-center gap-2">
                <Palette className="h-4 w-4 text-primary" /> Verfügbare Farben
            </Label>
            <div className="space-y-6">
                <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                        Standard
                    </span>
                    <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
                        {standardColors.map((c) => (
                            <ColorCircle
                                key={c.name}
                                color={c}
                                active={selected.includes(c.name)}
                                onClick={() => toggleColor(c.name)}
                            />
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                        Premium & Effekte
                    </span>
                    <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
                        {premiumColors.map((c) => (
                            <ColorCircle
                                key={c.name}
                                color={c}
                                active={selected.includes(c.name)}
                                onClick={() => toggleColor(c.name)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ColorCircle({
    color,
    active,
    onClick,
}: {
    color: any;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="flex flex-col items-center gap-2 cursor-pointer group"
        >
            <div
                className={cn(
                    "w-8 h-8 rounded-full border border-muted transition-all duration-300 ring-offset-background",
                    active
                        ? "ring-2 ring-primary ring-offset-2 scale-110 shadow-lg"
                        : "hover:scale-105",
                    color.special,
                )}
                style={{ background: color.hex }}
            />
            <span
                className={cn(
                    "text-[9px] font-medium truncate w-full text-center transition-colors",
                    active
                        ? "text-primary font-bold"
                        : "text-muted-foreground group-hover:text-foreground",
                )}
            >
                {color.name}
            </span>
        </div>
    );
}
