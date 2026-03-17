"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateSingleProductImage } from "@/actions/products/upload-product-image";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Sparkles } from "lucide-react"; // Sparkles für den "Store-Vibe"
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploadSectionProps {
    productId: string;
    initialImage?: string | null;
    isMain?: boolean;
    slotIndex?: number;
    label?: string;
    onUploadSuccess: (url: string | null) => void;
}

export function ImageUploadSection({
    productId,
    initialImage,
    isMain = false,
    slotIndex,
    label,
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
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Bild ist zu groß (max. 5MB)");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const result = await updateSingleProductImage(
                productId,
                formData,
                isMain,
                slotIndex,
            );
            if (result.success && result.url) {
                setPreviewUrl(result.url);
                onUploadSuccess(result.url);
                toast.success("Bild erfolgreich aktualisiert");
            } else {
                toast.error(result.error || "Upload fehlgeschlagen");
            }
        } catch (err) {
            console.error("Upload Error:", err);
            toast.error("Fehler beim Upload");
        } finally {
            setIsUploading(false);
            if (event.target) event.target.value = "";
        }
    };

    const itemsAssetUrl = process.env.NEXT_PUBLIC_ITEMS_ASSET_URL;
    const inputId = `image-upload-${isMain ? "main" : `slot-${slotIndex}`}`;

    return (
        <div className="space-y-3">
            {label && (
                <div className="flex items-center gap-2">
                    {isMain && (
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                    )}
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
                        {label}
                    </Label>
                </div>
            )}

            <div className="relative group">
                {previewUrl ? (
                    <div
                        className={cn(
                            "relative aspect-square w-full bg-background border shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-primary/30",
                            isMain ? "rounded-3xl p-1" : "rounded-2xl",
                        )}
                    >
                        <div className="relative w-full h-full overflow-hidden rounded-[inherit]">
                            <Image
                                src={`${itemsAssetUrl}/${previewUrl}`}
                                alt="Vorschau"
                                fill
                                unoptimized
                                className="object-cover transition duration-500 group-hover:scale-110"
                            />

                            {/* Overlay: Angepasst an das Store-Bearbeiten Design */}
                            <label
                                htmlFor={inputId}
                                className="absolute inset-0 z-30 bg-background/60 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer text-foreground text-xs font-bold gap-2"
                            >
                                {isUploading ? (
                                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                ) : (
                                    <>
                                        <div className="p-2 rounded-full bg-primary text-primary-foreground shadow-lg">
                                            <Plus className="h-4 w-4" />
                                        </div>
                                        <span>Ändern</span>
                                    </>
                                )}
                            </label>
                        </div>
                    </div>
                ) : (
                    <Label
                        htmlFor={inputId}
                        className={cn(
                            "flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed bg-muted/20 cursor-pointer hover:bg-muted/40 hover:border-primary/30 transition-all duration-300 shadow-none hover:shadow-inner",
                            isMain ? "rounded-3xl" : "rounded-2xl",
                            isUploading && "pointer-events-none opacity-60",
                        )}
                    >
                        {isUploading ? (
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                <div className="p-3 rounded-2xl bg-background border shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <Plus
                                        className={cn(
                                            "text-primary",
                                            isMain ? "h-6 w-6" : "h-5 w-5",
                                        )}
                                    />
                                </div>
                                {isMain && (
                                    <span className="text-[10px] uppercase font-black tracking-[0.15em] text-muted-foreground">
                                        Main Image
                                    </span>
                                )}
                            </div>
                        )}
                    </Label>
                )}

                <input
                    id={inputId}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isUploading}
                />
            </div>
        </div>
    );
}
