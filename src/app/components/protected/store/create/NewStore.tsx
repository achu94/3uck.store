"use client";

import { useAtomValue } from "jotai";
import { storeTypeAtom } from "@/atoms/store";

import { Card3DModelStore } from "./Card3DModelStore";
import { Card3DPrintStore } from "./Card3DPrintStore";

import { LucideImagePlay } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { InputWithBadge } from "@/components/ui/ShopUrlInput";
import { ImageUploadPreview } from "@/components/ui/ImageUploadPreview";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function NewStore() {
    const storeTyp = useAtomValue(storeTypeAtom);

    if (storeTyp === null) {
        return (
            <div className="hero min-h-screen bg-base-200 flex flex-col items-center justify-start">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">
                            Willkommen im Store Manger!
                        </h1>
                        <div className="flex flex-wrap gap-4 mt-8 justify-center">
                            <Card3DPrintStore />
                            <Card3DModelStore />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <p className="text-sm leading-relaxed">
                Grundinformationen und Darstellung deines Shops
            </p>

            <div className="w-full ">
                <ImageUploadPreview
                    label="Titelbild auswählen"
                    aspect="banner"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/6">
                    <ImageUploadPreview
                        label="Shopbild auswählen"
                        aspect="square"
                    />
                </div>
                <div className="w-full md:flex-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basisinformationen</CardTitle>
                            <CardDescription>
                                Name und Shop-Url können später nicht mehr
                                geändert werden
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input placeholder="Shop Kontakt Email" />
                                <Input placeholder="Shop Name" />
                                <InputWithBadge badget="https://3uck.shop/" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Beschreibung</CardTitle>
                        <CardDescription>
                            Sagen Sie etwas über Ihren Shop
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            id="textarea-message"
                            placeholder="Beschreiben Sie Ihren Shop..."
                        />
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Social Media Links</CardTitle>
                        <CardDescription>
                            Optional kann später ergänzt werden
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-5 text-center items-center ">
                            <InputWithBadge badget="Youtube/" />
                            <InputWithBadge badget="Tiktok/" />
                            <InputWithBadge badget="Instagram/" />
                            <InputWithBadge badget="Facebook/" />
                            <InputWithBadge badget="Twitter/" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
