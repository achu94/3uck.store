"use client";

import { useRef, useState } from "react";
import { LucideImagePlus, X } from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";

type Props = {
    name: string;
    label?: string;
    aspect?: "square" | "banner";
};

export function ImageUploadPreview({
    name,
    label = "Bild auswählen",
    aspect = "square",
}: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_SIZE) {
            toast.error("Bild zu groß", {
                description: "Das Bild darf maximal 10 MB groß sein.",
                position: "top-center",
            });

            // Input zurücksetzen
            e.target.value = "";
            setPreview(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);
    }

    function clearImage() {
        setPreview(null);
        if (inputRef.current) inputRef.current.value = "";
    }

    return (
        <div className="w-full">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={onFileChange}
                name={name}
            />

            <div
                onClick={() => inputRef.current?.click()}
                className={clsx(
                    "relative group cursor-pointer overflow-hidden rounded-lg border border-border bg-muted hover:bg-muted/80 transition",
                    aspect === "square" ? "aspect-square" : "aspect-[3/1]",
                )}
            >
                {preview ? (
                    <>
                        <img
                            src={preview}
                            alt="Preview"
                            className="h-full w-full object-cover"
                        />

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                clearImage();
                            }}
                            className="absolute top-2 right-2 rounded-full bg-background/80 p-1 opacity-0 group-hover:opacity-100 transition"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                        <LucideImagePlus />
                        <span className="text-sm">{label}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
