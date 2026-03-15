// src/app/components/protected/products/CreateProduct/ImageUploadSection.tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { uploadProductImage } from "@/actions/products/upload-product-image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface ImageUploadSectionProps {
    productId: string;
    initialImage?: string | null;
    onUploadSuccess: (url: string | null) => void;
}

export function ImageUploadSection({
    productId,
    initialImage,
    onUploadSuccess,
}: ImageUploadSectionProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        initialImage || null,
    );

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];

        // Client-seitiger Check: Max 5MB
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Bild ist zu groß (max. 5MB)");
            event.target.value = ""; // Input reset
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const result = await uploadProductImage(productId, formData);
            if (result.success && result.url) {
                setPreviewUrl(result.url);
                onUploadSuccess(result.url); // Callback an Parent
                toast.success("Bild erfolgreich hochgeladen");
            } else {
                toast.error(result.error || "Upload fehlgeschlagen");
                event.target.value = "";
            }
        } catch (err) {
            console.error("Upload Error:", err);
            toast.error("Ein unerwarteter Fehler ist aufgetreten");
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = () => {
        setPreviewUrl(null);
        onUploadSuccess(null); // Callback an Parent
    };

    const itemsAssetUrl = process.env.NEXT_PUBLIC_ITEMS_ASSET_URL;

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-1">
                <Label className="text-lg font-semibold text-foreground">
                    Produktbild
                </Label>
                <p className="text-sm text-muted-foreground">
                    Das Hauptbild für dein Produkt (max. 5MB).
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {/* Hauptbild Vorschau / Upload Area */}
                {previewUrl ? (
                    <div className="relative aspect-square w-full rounded-xl border bg-muted overflow-hidden group">
                        <Image
                            src={`${itemsAssetUrl}/${previewUrl}`}
                            alt="Vorschau"
                            fill
                            className="object-cover transition-transform group-hover:scale-[1.02]"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-background/80 hover:bg-destructive hover:text-white p-2 rounded-full shadow-md transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ) : (
                    <Label
                        htmlFor="image-upload"
                        className={cn(
                            "flex flex-col items-center justify-center w-full aspect-square rounded-xl border-2 border-dashed bg-muted/30 cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-all",
                            isUploading && "pointer-events-none opacity-60",
                        )}
                    >
                        <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                            {isUploading ? (
                                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            ) : (
                                <>
                                    <div className="p-4 rounded-full bg-background border shadow-sm hover:border-muted-foreground/30 transition-colors">
                                        <Plus className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="text-center space-y-0.5">
                                        <p className="text-sm font-medium text-foreground">
                                            Bild hochladen
                                        </p>
                                        <p className="text-xs">
                                            PNG, JPG oder WEBP (max. 5MB)
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                        <Input
                            id="image-upload"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={isUploading}
                        />
                    </Label>
                )}

                {/* Platzhalter für weitere Bilder analog zu deinem Screen */}
                <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="aspect-square rounded-lg border border-border bg-muted/20 flex items-center justify-center text-muted-foreground/30 border-dashed"
                        >
                            <Plus className="h-4 w-4" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
