import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus, Info, Plus } from "lucide-react";

interface ImageUploadSectionProps {
    onChange: (files: File[]) => void;
}

export function ImageUploadSection({ onChange }: ImageUploadSectionProps) {
    // Info: Für den echten Upload brauchst du ein <input type="file" /> oder eine Lib wie UploadThing
    return (
        <div className="space-y-4">
            <Card className="border-2 border-dashed border-muted bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
                <CardContent className="aspect-square flex flex-col items-center justify-center p-0">
                    <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors">
                        <div className="p-4 rounded-full bg-background border shadow-sm group-hover:scale-110 transition-transform">
                            <ImagePlus className="h-8 w-8" />
                        </div>
                        <div className="text-center">
                            <p className="font-semibold">Hauptbild hochladen</p>
                            <p className="text-xs">Klicken zum Auswählen</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="aspect-square rounded-xl border-2 border-dashed border-muted bg-muted/20 flex items-center justify-center hover:bg-muted/40 cursor-pointer transition-colors"
                    >
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                ))}
            </div>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 px-1">
                <Info className="h-3 w-3" /> Max. 5 Bilder, Quadratisch
                empfohlen.
            </p>
        </div>
    );
}
