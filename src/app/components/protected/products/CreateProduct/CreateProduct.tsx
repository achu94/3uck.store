// CreateProduct.tsx
"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, Plus } from "lucide-react";
import Link from "next/link";

import { ImageUploadSection } from "./ImageUploadSection";
import { BasicInfoSection } from "./BasicInfoSection";
import { MaterialSection } from "./MaterialSection";
import { ColorSection } from "./ColorSection";
import { DescriptionSection } from "./DescriptionSection";
import { Card, CardContent } from "@/components/ui/card";

export function CreateProduct() {
    const [isPending, startTransition] = useTransition();

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        salePrice: "",
        description: "",
        materials: [] as string[],
        colors: [] as string[],
        images: [] as File[],
    });

    const handleSubmit = async () => {
        startTransition(async () => {
            console.log("Sende Daten:", formData);
            // Hier kommt später deine Server Action rein:
            // await createProductAction(formData);
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* ... Header wie oben ... */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                    <ImageUploadSection
                        onChange={(files) =>
                            setFormData((prev) => ({ ...prev, images: files }))
                        }
                    />
                </div>

                <div className="lg:col-span-7">
                    <Card>
                        <CardContent className="p-6 space-y-8">
                            <BasicInfoSection
                                data={formData}
                                onChange={(field, val) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        [field]: val,
                                    }))
                                }
                            />
                            <MaterialSection
                                selected={formData.materials}
                                onChange={(mats) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        materials: mats,
                                    }))
                                }
                            />
                            <ColorSection
                                selected={formData.colors}
                                onChange={(cols) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        colors: cols,
                                    }))
                                }
                            />
                            <DescriptionSection
                                value={formData.description}
                                onChange={(val) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        description: val,
                                    }))
                                }
                            />

                            <div className="flex items-center gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    className="flex-1 h-12"
                                >
                                    Abbrechen
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isPending}
                                    className="flex-[2] h-12 text-md font-bold shadow-lg shadow-primary/20"
                                >
                                    {isPending ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <Plus className="mr-2 h-5 w-5" />
                                    )}
                                    Produkt veröffentlichen
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
