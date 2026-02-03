"use client";

import { createStore } from "@/actions/store/create-store";

import { useAtomValue } from "jotai";
import { storeTypeAtom } from "@/atoms/store";

import { Card3DModelStore } from "./Card3DModelStore";
import { Card3DPrintStore } from "./Card3DPrintStore";

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
import { userIdAtom } from "@/atoms/auth";
import { Button } from "@/components/ui/button";

export function NewStore() {
    const storeTyp = useAtomValue(storeTypeAtom);
    const userId = useAtomValue(userIdAtom);

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
        <form action={createStore} className="flex flex-col gap-6">
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
                                <Input
                                    placeholder="Shop Kontakt Email"
                                    name="contact_email"
                                    type="email"
                                    required
                                />
                                <Input
                                    placeholder="Shop Name"
                                    name="name"
                                    required
                                />
                                <InputWithBadge
                                    badge="https://3uck.shop/"
                                    name="slug"
                                    required
                                />
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
                            name="description"
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
                            <InputWithBadge badge="Youtube/" name="youtube" />
                            <InputWithBadge badge="Tiktok/" name="tiktok" />
                            <InputWithBadge
                                badge="Instagram/"
                                name="instagram"
                            />
                            <InputWithBadge badge="Facebook/" name="facebook" />
                            <InputWithBadge badge="Twitter/" name="twitter" />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <input type="hidden" name="type" value={storeTyp} />
            <input type="hidden" name="user_id" value={userId!} />

            <Button type="submit" className="btn btn-primary self-end">
                Store erstellen
            </Button>
        </form>
    );
}
