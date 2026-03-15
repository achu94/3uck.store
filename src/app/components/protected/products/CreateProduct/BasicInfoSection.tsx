import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, ShoppingBag, Sparkles } from "lucide-react";

interface BasicInfoSectionProps {
    data: { title: string; price: string; salePrice: string };
    onChange: (field: string, value: string) => void;
}

export function BasicInfoSection({ data, onChange }: BasicInfoSectionProps) {
    return (
        <div className="space-y-4">
            <div className="space-y-1.5">
                <Label
                    htmlFor="title"
                    className="text-sm font-semibold flex items-center gap-2"
                >
                    <Plus className="h-4 w-4 text-primary" /> Produkt Titel
                </Label>
                <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => onChange("title", e.target.value)}
                    placeholder="z.B. Articulated Dragon Model"
                    className="text-xl font-medium bg-muted/20 h-12"
                />
            </div>

            <div className="space-y-4 pt-2">
                <Label className="text-sm font-semibold flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-primary" />{" "}
                    Preisgestaltung
                </Label>
                <div className="flex flex-wrap gap-4">
                    <div className="space-y-1.5 flex-1 min-w-[140px]">
                        <Label className="text-[10px] uppercase text-muted-foreground font-bold">
                            Basis-Preis
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                €
                            </span>
                            <Input
                                type="number"
                                value={data.price}
                                onChange={(e) =>
                                    onChange("price", e.target.value)
                                }
                                step="0.01"
                                className="pl-7 bg-muted/20 font-medium"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-[140px]">
                        <Label className="text-[10px] uppercase text-blue-500 font-bold flex items-center gap-1">
                            <Sparkles className="h-3 w-3" /> Angebot
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500/50 text-sm">
                                €
                            </span>
                            <Input
                                type="number"
                                value={data.salePrice}
                                onChange={(e) =>
                                    onChange("salePrice", e.target.value)
                                }
                                step="0.01"
                                className="pl-7 bg-blue-500/5 border-blue-500/20 text-blue-500 font-bold"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
