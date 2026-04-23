"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/actions/products/get-public-product-by-slug";

type Props = {
    mainImageUrl: string | null;
    galleryImages: ProductImage[];
    title: string;
};

const assetUrl = (url: string) =>
    `${process.env.NEXT_PUBLIC_ITEMS_ASSET_URL}/${url}`;

export function ProductGallery({ mainImageUrl, galleryImages, title }: Props) {
    const allImages: string[] = [];
    if (mainImageUrl) allImages.push(assetUrl(mainImageUrl));
    for (const img of galleryImages) {
        const full = assetUrl(img.url);
        if (!allImages.includes(full)) allImages.push(full);
    }
    if (allImages.length === 0) allImages.push("/images/placeholder.png");

    const [selected, setSelected] = useState(allImages[0]);

    return (
        <div className="flex flex-col gap-3">
            <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                <Image
                    src={selected}
                    alt={title}
                    fill
                    className="object-cover"
                    unoptimized
                    priority
                />
            </div>

            {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {allImages.map((url, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setSelected(url)}
                            className={cn(
                                "relative shrink-0 h-16 w-16 rounded-md overflow-hidden border-2 transition-colors",
                                selected === url
                                    ? "border-primary"
                                    : "border-transparent hover:border-muted-foreground/40"
                            )}
                        >
                            <Image
                                src={url}
                                alt={`${title} ${i + 1}`}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
