"use client";

import type { Store } from "@/types/db";
import type { GetCategoriesResult } from "@/actions/category/get-category";
import type { GetProductsResult } from "@/actions/products/get-products";
import type { ReviewWithUser } from "@/actions/reviews/get-product-reviews";
import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Star, Plus, Box, Mail, Package, ShoppingBag } from "lucide-react";

import { cn, getAssetsUrl } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

type StoreManagerProps = {
    store: Store | null;
    categories: NonNullable<GetCategoriesResult>;
    products: NonNullable<GetProductsResult>;
    reviews: ReviewWithUser[];
};

export function StoreManager({ store, categories, products, reviews }: StoreManagerProps) {
    if (!store) redirect("/store/create");

    const storeAssetUrl = getAssetsUrl("STORE");
    const itemAssetUrl = getAssetsUrl("ITEM");
    const storeInitial = (store.name?.[0] ?? "S").toUpperCase();

    const categoriesWithProducts = categories.map((cat) => ({
        ...cat,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items: products.filter((p) => (p as any).category_id === cat.id),
    }));

    const uncategorized = products.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (p) => !(p as any).category_id || !categories.find((c) => c.id === (p as any).category_id),
    );

    return (
        <div className="min-h-screen">
            <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 space-y-6">

                {/* STORE HEADER */}
                <Card className="overflow-hidden">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <div className="flex flex-col items-center md:items-start gap-3">
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

                                <div className="flex flex-col gap-2 w-full">
                                    {/* Rating */}
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-0.5">
                                            {Array.from({ length: 5 }).map((_, idx) => (
                                                <Star
                                                    key={idx}
                                                    className={`h-4 w-4 ${
                                                        idx < Math.round(store.average_rating ?? 0)
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-muted-foreground"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {(store.review_count ?? 0) > 0
                                                ? `${store.average_rating?.toFixed(1)} (${store.review_count})`
                                                : "Noch keine Bewertungen"}
                                        </span>
                                    </div>

                                    {/* Status */}
                                    <Badge
                                        className="w-fit"
                                        variant={store.is_active ? "default" : "secondary"}
                                    >
                                        {store.is_active ? "Aktiv" : "Inaktiv"}
                                    </Badge>
                                </div>
                            </div>

                            <div className="md:col-span-2 space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                                                {store.name}
                                            </h1>
                                            <Badge variant="outline">
                                                {store.type === "print" ? "3D-Druck" : "3D-Modelle"}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">@{store.slug}</p>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href="/dashboard/products/new"
                                            className={cn(buttonVariants({ size: "sm" }), "gap-2")}
                                        >
                                            <Plus className="h-4 w-4" />
                                            Produkt hinzufügen
                                        </Link>
                                    </div>
                                </div>

                                <p className="text-sm sm:text-base text-muted-foreground">
                                    {store.description ?? "Keine Beschreibung vorhanden."}
                                </p>

                                <Separator />

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                                    {store.contact_email && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Mail className="h-4 w-4" />
                                            <span className="text-foreground font-medium truncate">
                                                {store.contact_email}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Package className="h-4 w-4" />
                                        <span>
                                            <span className="text-foreground font-medium">{products.length}</span>{" "}
                                            Produkte
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Box className="h-4 w-4" />
                                        <span>
                                            <span className="text-foreground font-medium">{categories.length}</span>{" "}
                                            Kategorien
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <ShoppingBag className="h-4 w-4" />
                                        <span>
                                            <span className="text-foreground font-medium">0</span>{" "}
                                            Verkäufe
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* CATEGORIES + PRODUCTS */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Produkte nach Kategorie</h2>
                        <Link
                            href="/dashboard/categories"
                            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2")}
                        >
                            <Plus className="h-4 w-4" />
                            Kategorie verwalten
                        </Link>
                    </div>

                    {categories.length === 0 && products.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center text-muted-foreground">
                                <Box className="h-10 w-10 mx-auto mb-3 stroke-[1.5]" />
                                <p className="font-medium">Noch keine Produkte oder Kategorien.</p>
                                <p className="text-sm mt-1">Erstelle zuerst Kategorien, dann füge Produkte hinzu.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            {categoriesWithProducts.map((cat) => (
                                <Card key={cat.id} className="overflow-hidden">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between gap-3">
                                            <CardTitle className="text-lg">{cat.name}</CardTitle>
                                            <Link
                                                href="/dashboard/products/new"
                                                className={cn(
                                                    buttonVariants({ variant: "outline", size: "sm" }),
                                                    "gap-2",
                                                )}
                                            >
                                                <Plus className="h-4 w-4" />
                                                Produkt hinzufügen
                                            </Link>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {cat.items.length === 0 ? (
                                            <p className="text-sm text-muted-foreground py-4">
                                                Keine Produkte in dieser Kategorie.
                                            </p>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {cat.items.map((item) => (
                                                    <ProductCard
                                                        key={item.id}
                                                        item={item}
                                                        itemAssetUrl={itemAssetUrl}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}

                            {uncategorized.length > 0 && (
                                <Card className="overflow-hidden">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg text-muted-foreground">
                                            Ohne Kategorie
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {uncategorized.map((item) => (
                                                <ProductCard
                                                    key={item.id}
                                                    item={item}
                                                    itemAssetUrl={itemAssetUrl}
                                                />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </>
                    )}
                </div>

                {/* REVIEWS */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">
                            Bewertungen{" "}
                            {reviews.length > 0 && (
                                <span className="text-muted-foreground font-normal text-base">
                                    ({reviews.length})
                                </span>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {reviews.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Noch keine Bewertungen vorhanden.</p>
                        ) : (
                            reviews.map((r) => (
                                <div key={r.id} className="rounded-xl border bg-background p-4 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={r.user.image ?? undefined} />
                                            <AvatarFallback>
                                                {(r.user.name?.[0] ?? "?").toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium">{r.user.name ?? "Anonym"}</p>
                                            <div className="flex items-center gap-0.5">
                                                {Array.from({ length: 5 }).map((_, idx) => (
                                                    <Star
                                                        key={idx}
                                                        className={`h-3 w-3 ${
                                                            idx < r.rating
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : "text-muted-foreground"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-xs text-muted-foreground shrink-0">
                                            {new Date(r.created_at).toLocaleDateString("de-DE")}
                                        </span>
                                    </div>
                                    {r.comment && (
                                        <p className="text-sm text-muted-foreground">{r.comment}</p>
                                    )}
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function ProductCard({
    item,
    itemAssetUrl,
}: {
    item: NonNullable<GetProductsResult>[number];
    itemAssetUrl: string;
}) {
    return (
        <Card className="group overflow-hidden border bg-background transition hover:shadow-md hover:border-primary/30">
            <div className="aspect-[4/3] w-full bg-muted overflow-hidden relative">
                {item.main_image_url ? (
                    <Image
                        src={`${itemAssetUrl}/${item.main_image_url}`}
                        alt={item.title ?? ""}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        unoptimized
                    />
                ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
                        <Box className="h-8 w-8" />
                        <span className="text-sm">Kein Bild</span>
                    </div>
                )}
            </div>
            <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <div className="font-semibold truncate">{item.title}</div>
                        {item.description && (
                            <div className="text-xs text-muted-foreground line-clamp-2">
                                {item.description}
                            </div>
                        )}
                    </div>
                    <div className="text-sm font-bold whitespace-nowrap">
                        {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                        }).format(item.price ?? 0)}
                    </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <Badge variant={item.status === "published" ? "default" : "secondary"}>
                        {item.status === "published" ? "Veröffentlicht" : "Entwurf"}
                    </Badge>
                    <Button asChild size="sm" variant="outline">
                        <Link href={`/dashboard/products/${item.id}`}>Bearbeiten</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
