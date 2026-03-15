import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Box } from "lucide-react";
import { cn } from "@/lib/utils";

interface MaterialSectionProps {
    selected: string[];
    onChange: (materials: string[]) => void;
}

export function MaterialSection({ selected, onChange }: MaterialSectionProps) {
    const materials = ["PLA", "PETG", "ABS", "ASA", "TPU (Flex)", "Carbon"];

    const toggleMaterial = (mat: string) => {
        const newSelection = selected.includes(mat)
            ? selected.filter((m) => m !== mat)
            : [...selected, mat];
        onChange(newSelection);
    };

    return (
        <div className="space-y-4 pt-4 border-t border-dashed">
            <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold flex items-center gap-2">
                    <Box className="h-4 w-4 text-primary" /> Material
                </Label>
                <Badge variant="secondary" className="text-[10px] uppercase">
                    Multiple
                </Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {materials.map((mat) => (
                    <div
                        key={mat}
                        onClick={() => toggleMaterial(mat)}
                        className={cn(
                            "py-2.5 px-3 rounded-lg border text-xs font-medium text-center cursor-pointer transition-all",
                            selected.includes(mat)
                                ? "border-primary bg-primary/5 text-primary shadow-sm"
                                : "bg-background hover:border-muted-foreground/30 text-muted-foreground",
                        )}
                    >
                        {mat}
                    </div>
                ))}
            </div>
        </div>
    );
}
