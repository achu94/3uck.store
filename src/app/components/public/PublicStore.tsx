import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getStoreBySlug } from "@/actions/store/get-store-by-slug";
import { getPublicProducts } from "@/actions/products/get-public-products";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StoreReviewSection } from "./reviews/StoreReviewSection";
import { StarDisplay } from "./reviews/StarRating";

export async function PublicStore({ storeSlug }: { storeSlug: string }) {
    const store = await getStoreBySlug(storeSlug);

    if (!store) {
        notFound();
    }

    const products = await getPublicProducts(store.id);

    return (
        <main className="min-h-screen">
            <div className="border-b">
                <div className="container mx-auto px-4 py-10 max-w-5xl">
                    <div className="flex items-center gap-6">
                        {store.logo_url && (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_STORE_ASSET_URL}/${store.logo_url}`}
                                alt={store.name}
                                width={80}
                                height={80}
                                className="rounded-full object-cover"
                                unoptimized
                            />
                        )}
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-2xl font-bold">{store.name}</h1>
                                <Badge variant="secondary">{store.type === "print" ? "3D-Druck" : "3D-Modelle"}</Badge>
                                <Badge variant={store.is_active ? "default" : "secondary"}>
                                    {store.is_active ? "Aktiv" : "Inaktiv"}
                                </Badge>
                            </div>
                            <div className="text-yellow-400">
                                <StarDisplay value={store.average_rating} count={store.review_count} />
                            </div>
                            {store.description && (
                                <p className="text-muted-foreground text-sm max-w-xl">{store.description}</p>
                            )}
                            {store.contact_email && (
                                <p className="text-muted-foreground text-xs">{store.contact_email}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10 max-w-5xl">
                <h2 className="text-lg font-semibold mb-6">Produkte</h2>
                <Separator className="mb-6" />

                {products.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-lg">Noch keine Produkte vorhanden.</p>
                        <p className="text-sm mt-1">Schau bald wieder vorbei.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/${storeSlug}/product/${product.slug}`}
                                className="group"
                            >
                                <Card className="overflow-hidden transition-shadow hover:shadow-md">
                                    <div className="aspect-square relative bg-muted">
                                        <Image
                                            src={
                                                product.main_image_url
                                                    ? `${process.env.NEXT_PUBLIC_ITEMS_ASSET_URL}/${product.main_image_url}`
                                                    : "/images/placeholder.png"
                                            }
                                            alt={product.title}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                    <CardContent className="p-3 space-y-1">
                                        <p className="text-sm font-medium leading-tight line-clamp-2 group-hover:underline">
                                            {product.title}
                                        </p>
                                        <p className="text-sm font-semibold">
                                            {new Intl.NumberFormat("de-DE", {
                                                style: "currency",
                                                currency: "EUR",
                                            }).format(product.price)}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="mt-12">
                    <StoreReviewSection
                        storeId={store.id}
                        storeSlug={storeSlug}
                        averageRating={store.average_rating ?? null}
                        reviewCount={store.review_count ?? null}
                    />
                </div>
            </div>
        </main>
    );
}
