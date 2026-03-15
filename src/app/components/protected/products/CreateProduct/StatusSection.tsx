// src/app/components/protected/products/create/StatusSection.tsx
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusSectionProps {
    isDraft: boolean;
    onChange: (value: boolean) => void;
}

export function StatusSection({ isDraft, onChange }: StatusSectionProps) {
    return (
        <div
            className={cn(
                "flex items-center justify-between p-4 rounded-xl border-2 border-dashed transition-all",
                isDraft
                    ? "border-muted bg-muted/20"
                    : "border-primary/20 bg-primary/5",
            )}
        >
            <div className="flex items-center gap-3">
                <div
                    className={cn(
                        "p-2 rounded-full",
                        isDraft
                            ? "bg-background text-muted-foreground"
                            : "bg-primary/20 text-primary",
                    )}
                >
                    {isDraft ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </div>
                <div className="space-y-0.5">
                    <Label className="text-sm font-semibold flex items-center gap-2">
                        Status: {isDraft ? "Entwurf" : "Live"}
                    </Label>
                    <p className="text-[10px] text-muted-foreground italic">
                        {isDraft
                            ? "Nur für dich im Dashboard sichtbar."
                            : "Für alle Kunden im Shop sichtbar."}
                    </p>
                </div>
            </div>

            <Switch
                checked={!isDraft}
                onCheckedChange={(checked) => onChange(!checked)}
            />
        </div>
    );
}
