"use client";

import type { Store } from "@/types/db";
import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import {
    Star,
    Plus,
    BadgeCheck,
    Box,
    Mail,
    ShoppingBag,
    Sparkles,
} from "lucide-react";

import { getAssetsUrl } from "@/lib/utils";

type StoreManagerProps = {
    store: Store | null;
};

type ItemPlaceholder = {
    id: string;
    name: string;
    price: string;
    image_url: string | null;
    description?: string | null;
    rating?: number | null;
    sales?: number | null;
};

type CategoryPlaceholder = {
    id: string;
    name: string;
    items: ItemPlaceholder[];
};

export function StoreManager({ store }: StoreManagerProps) {
    if (!store) redirect("/store/create");
    
    const storeAssetUrl = getAssetsUrl("STORE");

    const storeInitial = (store.name?.[0] ?? "S").toUpperCase();

    // ✅ Platzhalter-Daten (später ersetzen durch echte DB Daten)
    const rating = 4.8;
    const salesCount = 123;
    const verifiedStore = true;

    const categories: CategoryPlaceholder[] = [
        {
            id: "cat-1",
            name: "Kategorie X",
            items: [
                {
                    id: "i-1",
                    name: "Item 1",
                    price: "9.99€",
                    image_url: null,
                    description: "Kurze Item Beschreibung (Platzhalter)…",
                    rating: 4.9,
                    sales: 44,
                },
                {
                    id: "i-2",
                    name: "Item 2",
                    price: "14.99€",
                    image_url:
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=60",
                    description: "Noch ein Item mit Bild…",
                    rating: 4.7,
                    sales: 21,
                },
            ],
        },
        {
            id: "cat-2",
            name: "Kategorie Y",
            items: [
                {
                    id: "i-3",
                    name: "Item 3",
                    price: "29.99€",
                    image_url: null,
                    description: "Platzhalter Beschreibung…",
                    rating: 4.8,
                    sales: 8,
                },
            ],
        },
    ];

    const comments = [
        { id: "c1", user: "Max", text: "Sehr guter Store!" },
        { id: "c2", user: "Anna", text: "Schneller Versand ✅" },
    ];

    return (
        <div className="min-h-screen">
            <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 space-y-6">
                {/* ✅ STORE HEADER */}
                <Card className="overflow-hidden">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            {/* LEFT: LOGO + STATS */}
                            <div className="flex flex-col items-center md:items-start gap-3">
                                {/* Logo */}
                                <div className="w-28 h-28 rounded-2xl border bg-background flex items-center justify-center overflow-hidden">
                                    {store.logo_url ? (
                                        <img
                                            src={`${storeAssetUrl}/${store.logo_url}`}
                                            alt={`${store.name} Logo`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-3xl font-bold text-muted-foreground">
                                            {storeInitial}
                                        </div>
                                    )}
                                </div>

                                {/* rating + sales */}
                                <div className="flex flex-col gap-2 w-full">
                                    {/* Stars */}
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-0.5">
                                            {Array.from({ length: 5 }).map(
                                                (_, idx) => (
                                                    <Star
                                                        key={idx}
                                                        className={`h-4 w-4 ${
                                                            idx <
                                                            Math.round(rating)
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : "text-muted-foreground"
                                                        }`}
                                                    />
                                                ),
                                            )}
                                        </div>
                                        <span className="text-sm font-medium">
                                            {rating}
                                        </span>
                                    </div>

                                    {/* Verkäufe */}
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <ShoppingBag className="h-4 w-4" />
                                        <span>
                                            Verkäufe:{" "}
                                            <span className="text-foreground font-medium">
                                                {salesCount}
                                            </span>
                                        </span>
                                    </div>

                                    {/* Status Badge */}
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Badge className="w-fit">
                                            {store.is_active
                                                ? "Aktiv"
                                                : "Inaktiv"}
                                        </Badge>

                                        {verifiedStore && (
                                            <Badge
                                                variant="secondary"
                                                className="gap-1"
                                            >
                                                <BadgeCheck className="h-4 w-4" />
                                                Verified Store
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: STORE INFO */}
                            <div className="md:col-span-2 space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                                                {store.name}
                                            </h1>

                                            <Badge
                                                variant="outline"
                                                className="gap-1"
                                            >
                                                <Sparkles className="h-4 w-4" />
                                                3D Print
                                            </Badge>
                                        </div>

                                        <p className="text-sm text-muted-foreground">
                                            @{store.slug}
                                        </p>
                                    </div>

                                    {/* Owner Actions */}
                                    <div className="flex gap-2">
                                        <Button size="sm" className="gap-2">
                                            <Plus className="h-4 w-4" />
                                            Kategorie hinzufügen
                                        </Button>
                                    </div>
                                </div>

                                <p className="text-sm sm:text-base text-muted-foreground">
                                    {store.description ??
                                        "Keine Beschreibung vorhanden..."}
                                </p>

                                <Separator />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="h-4 w-4" />
                                        <span>
                                            Kontakt:{" "}
                                            <span className="text-foreground font-medium">
                                                {store.contact_email ?? "—"}
                                            </span>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Box className="h-4 w-4" />
                                        <span>
                                            Typ:{" "}
                                            <span className="text-foreground font-medium">
                                                {store.type ?? "—"}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ✅ CATEGORIES + ITEMS */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Kategorien</h2>
                    </div>

                    {categories.map((cat) => (
                        <Card key={cat.id} className="overflow-hidden">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between gap-3">
                                    <CardTitle className="text-lg">
                                        {cat.name}
                                    </CardTitle>

                                    {/* Owner Action */}
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Item hinzufügen
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* ✅ Responsive Items Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {cat.items.map((item) => {
                                        const itemImage =
                                            item.image_url ??
                                            "https://placehold.co/600x400?text=";

                                        return (
                                            <Card
                                                key={item.id}
                                                className="group overflow-hidden border bg-background transition hover:shadow-lg hover:border-primary/30"
                                            >
                                                {/* Image */}
                                                <div className="aspect-[4/3] w-full bg-muted overflow-hidden relative">
                                                    {item.image_url ? (
                                                        <img
                                                            src={itemImage}
                                                            alt={item.name}
                                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                                            <Box className="h-8 w-8" />
                                                            <span className="text-sm">
                                                                Kein Bild
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <CardContent className="p-4 space-y-3">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="min-w-0">
                                                            <div className="font-semibold truncate">
                                                                {item.name}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground line-clamp-2">
                                                                {item.description ??
                                                                    "Kurze Beschreibung (Platzhalter)…"}
                                                            </div>
                                                        </div>

                                                        <div className="text-sm font-bold whitespace-nowrap">
                                                            {item.price ?? "—"}
                                                        </div>
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className="text-xs text-muted-foreground">
                                                            ⭐{" "}
                                                            {item.rating ?? "—"}{" "}
                                                            • Verkäufe{" "}
                                                            {item.sales ?? "—"}
                                                        </div>

                                                        <Button
                                                            size="sm"
                                                            variant="secondary"
                                                        >
                                                            Bearbeiten
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* ✅ COMMENTS */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Kommentare</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        {comments.length === 0 ? (
                            <div className="text-sm text-muted-foreground">
                                Noch keine Kommentare vorhanden.
                            </div>
                        ) : (
                            comments.map((c) => (
                                <div
                                    key={c.id}
                                    className="rounded-xl border bg-background p-3"
                                >
                                    <div className="text-sm font-medium">
                                        {c.user}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {c.text}
                                    </div>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
