"use client";

import { createStore } from "@/actions/store/create-store";

import { useActionState } from "react";
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
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";

import type { CreateStoreState } from "@/actions/store/create-store";

const initialState: CreateStoreState = {
    errors: {},
};

export function NewStore() {
    const storeTyp = useAtomValue(storeTypeAtom);
    const [state, formAction] = useActionState(createStore, initialState);

    if (storeTyp === null) {
        return (
            <div className="hero min-h-screen bg-base-200 flex flex-col items-center justify-start">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <div className="flex flex-col items-center text-center gap-2">
                            <Store className="h-8 w-8 text-muted-foreground" />
                            <h1 className="text-xl font-bold">
                                Noch kein Store vorhanden
                            </h1>
                            <p className="text-sm text-muted-foreground max-w-md">
                                Wähle unten einen Store-Typ aus und erstelle
                                deinen eigenen Shop.
                            </p>
                        </div>
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
        <form action={formAction} className="flex flex-col gap-6">
            <p className="text-sm leading-relaxed">
                Grundinformationen und Darstellung deines Shops
            </p>

            {/* LOGO */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full md:w-1/6">
                    <ImageUploadPreview
                        label="Shopbild auswählen"
                        aspect="square"
                        name="logo_url"
                    />
                    {state.errors.logo_url && (
                        <p className="text-sm text-red-500 mt-1">
                            {state.errors.logo_url[0]}
                        </p>
                    )}
                </div>

                <div className="w-full md:flex-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basisinformationen</CardTitle>
                            <CardDescription>
                                Name und Shop-URL können später nicht mehr
                                geändert werden
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Input
                                        placeholder="Shop Kontakt E-Mail"
                                        name="contact_email"
                                        type="email"
                                        defaultValue={
                                            state.values?.contact_email
                                        }
                                    />
                                    {state.errors.contact_email && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {state.errors.contact_email[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Input
                                        placeholder="Shop Name"
                                        name="name"
                                        required
                                        defaultValue={state.values?.name}
                                    />
                                    {state.errors.name && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {state.errors.name[0]}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <InputWithBadge
                                        badge="https://3uck.shop/"
                                        name="slug"
                                        required
                                        defaultValue={state.values?.slug}
                                    />
                                    {state.errors.slug && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {state.errors.slug[0]}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* DESCRIPTION */}
            <Card>
                <CardHeader>
                    <CardTitle>Beschreibung</CardTitle>
                    <CardDescription>
                        Sagen Sie etwas über Ihren Shop
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Beschreiben Sie Ihren Shop..."
                        name="description"
                        defaultValue={state.values?.description}
                    />
                    {state.errors.description && (
                        <p className="text-sm text-red-500 mt-1">
                            {state.errors.description[0]}
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* SOCIAL (optional, aktuell ignoriert im Backend) */}
            <Card>
                <CardHeader>
                    <CardTitle>Social Media Links</CardTitle>
                    <CardDescription>
                        Optional – kann später ergänzt werden
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 items-center">
                        <InputWithBadge badge="Youtube/" name="youtube" />
                        <InputWithBadge badge="Tiktok/" name="tiktok" />
                        <InputWithBadge badge="Instagram/" name="instagram" />
                        <InputWithBadge badge="Facebook/" name="facebook" />
                        <InputWithBadge badge="Twitter/" name="twitter" />
                    </div>
                </CardContent>
            </Card>

            {/* TYPE */}
            <input type="hidden" name="type" value={storeTyp} />

            {state.errors.type && (
                <p className="text-sm text-red-500">{state.errors.type[0]}</p>
            )}

            <Button type="submit" className="self-end">
                Store erstellen
            </Button>
        </form>
    );
}
