// src/app/components/protected/products/CreateProduct/CreateProduct.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Deine Sections
import { ImageUploadSection } from "./ImageUploadSection";
import { BasicInfoSection } from "./BasicInfoSection";
import { MaterialSection } from "./MaterialSection";
import { ColorSection } from "./ColorSection";
import { SizeSection } from "./SizeSection";
import { DescriptionSection } from "./DescriptionSection";

// Actions & Types
import { ProductRow, UpdateProductInput } from "@/schemas/product.schema";
import { updateProduct } from "@/actions/products/update-product";
import { Label } from "@/components/ui/label";

interface CreateProductProps {
    initialProduct: ProductRow;
}

export function CreateProduct({ initialProduct }: CreateProductProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const [formData, setFormData] = useState<UpdateProductInput>({
        id: initialProduct.id,
        title: initialProduct.title || "",
        price: initialProduct.price || 0,
        description: initialProduct.description || "",
        main_image_url: initialProduct.main_image_url || null,
        product_images: initialProduct.product_images || [],
        available_materials: initialProduct.available_materials || [],
        available_colors: initialProduct.available_colors || [],
        available_sizes: initialProduct.available_sizes || [],
        status: (initialProduct.status as "draft" | "published") || "draft",
    });

    const handleSubmit = async (shouldBeDraft: boolean) => {
        setErrors({});

        startTransition(async () => {
            const payload = {
                ...formData,
                status: shouldBeDraft ? "draft" : "published",
                product_images: []
            };

            const result = await updateProduct(initialProduct.id, payload);

            if (result.errors) {
                setErrors(result.errors);
                toast.error("Validierung fehlgeschlagen.");
                return;
            }

            if (!result.success) {
                toast.error(result.error || "Fehler beim Speichern.");
                return;
            }

            toast.success(
                shouldBeDraft
                    ? "Entwurf gespeichert"
                    : "Produkt veröffentlicht!",
            );
            router.push("/dashboard/products");
            router.refresh();
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 space-y-8">
                {/* Header Bereich analog zum StoreManager */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold leading-tight">
                        Produkt bearbeiten
                    </h1>
                    <p className="text-sm text-muted-foreground font-mono uppercase">
                        ID: {initialProduct.id}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Linke Seite: Media (Sticky) */}
                    <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
                        <Card>
                            <CardContent className="p-6">
                                <ImageUploadSection
                                    productId={initialProduct.id}
                                    initialImage={formData.main_image_url}
                                    isMain={true}
                                    onUploadSuccess={(url) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            main_image_url: url,
                                        }))
                                    }
                                />

                                <div className="mt-6 space-y-2">
                                    <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                        Weitere Bilder (Galerie)
                                    </Label>

                                    <div className="grid grid-cols-4 gap-2">
                                        {[0, 1, 2, 3].map((idx) => (
                                            <ImageUploadSection
                                                key={idx}
                                                productId={initialProduct.id}
                                                slotIndex={idx}
                                                isMain={false}
                                                initialImage={
                                                    formData.product_images?.find(
                                                        (img) =>
                                                            img.sort_order ===
                                                            idx,
                                                    )?.url
                                                }
                                                onUploadSuccess={(newUrl) => {
                                                    setFormData((prev) => {
                                                        const otherImages =
                                                            prev.product_images.filter(
                                                                (img) =>
                                                                    img.sort_order !==
                                                                    idx,
                                                            );

                                                        return {
                                                            ...prev,
                                                            product_images: [
                                                                ...otherImages,
                                                                {
                                                                    url: newUrl as string,
                                                                    sort_order:
                                                                        idx,
                                                                },
                                                            ].sort(
                                                                (a, b) =>
                                                                    a.sort_order -
                                                                    b.sort_order,
                                                            ),
                                                        };
                                                    });
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Rechte Seite: Formular-Daten */}
                    <div className="lg:col-span-7 space-y-6">
                        <Card>
                            <CardContent className="p-6 space-y-10">
                                <BasicInfoSection
                                    data={formData}
                                    errors={errors}
                                    onChange={(field, val) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [field]: val,
                                        }))
                                    }
                                />

                                <Separator />

                                <MaterialSection
                                    selected={formData.available_materials}
                                    error={errors.available_materials?.[0]}
                                    onChange={(mats) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            available_materials: mats,
                                        }))
                                    }
                                />

                                <Separator />

                                <ColorSection
                                    selected={formData.available_colors}
                                    error={errors.available_colors?.[0]}
                                    onChange={(cols) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            available_colors: cols,
                                        }))
                                    }
                                />

                                <Separator />

                                <SizeSection
                                    selected={formData.available_sizes}
                                    error={errors.available_sizes?.[0]}
                                    onChange={(sizes) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            available_sizes: sizes,
                                        }))
                                    }
                                />

                                <Separator />

                                <DescriptionSection
                                    value={formData.description || ""}
                                    error={errors.description?.[0]}
                                    onChange={(val) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            description: val,
                                        }))
                                    }
                                />

                                {/* FOOTER ACTIONS */}
                                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                                    <Button
                                        variant="ghost"
                                        className="w-full sm:w-auto"
                                        onClick={() => router.back()}
                                        disabled={isPending}
                                    >
                                        Abbrechen
                                    </Button>

                                    <div className="flex flex-1 w-full gap-3">
                                        <Button
                                            variant="secondary"
                                            className="flex-1"
                                            onClick={() => handleSubmit(true)}
                                            disabled={isPending}
                                        >
                                            {isPending ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                "Entwurf"
                                            )}
                                        </Button>

                                        <Button
                                            className="flex-[1.5]"
                                            onClick={() => handleSubmit(false)}
                                            disabled={isPending}
                                        >
                                            {isPending ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                "Veröffentlichen"
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
