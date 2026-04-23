import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getStoreBySlug } from "@/actions/store/get-store-by-slug";
import { getPublicProductBySlug } from "@/actions/products/get-public-product-by-slug";
import { Separator } from "@/components/ui/separator";
import { ProductReviewSection } from "./reviews/ProductReviewSection";
import { StarDisplay } from "./reviews/StarRating";
import { ProductGallery } from "./ProductGallery";
import { ProductSpecsSelector } from "./ProductSpecsSelector";

type Props = {
    storeSlug: string;
    productSlug: string;
};

export async function PublicProduct({ storeSlug, productSlug }: Props) {
    const [store, session] = await Promise.all([getStoreBySlug(storeSlug), auth()]);

    if (!store) notFound();

    const product = await getPublicProductBySlug(store.id, productSlug);
    if (!product) notFound();

    const formattedPrice = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(product.price);

    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-1">
                    <Link href={`/${storeSlug}`} className="hover:underline">
                        {store.name}
                    </Link>
                    <span>/</span>
                    <span className="text-foreground">{product.title}</span>
                </nav>

                <div className="grid md:grid-cols-2 gap-10">
                    <ProductGallery
                        mainImageUrl={product.main_image_url}
                        galleryImages={product.product_images}
                        title={product.title}
                    />

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold">{product.title}</h1>
                            <p className="text-2xl font-semibold">{formattedPrice}</p>
                            <div className="text-yellow-400">
                                <StarDisplay value={product.average_rating} count={product.review_count} />
                            </div>
                        </div>

                        {product.description && (
                            <>
                                <Separator />
                                <div className="space-y-2">
                                    <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                        Beschreibung
                                    </h2>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                        {product.description}
                                    </p>
                                </div>
                            </>
                        )}

                        <Separator />

                        <ProductSpecsSelector
                            storeId={store.id}
                            storeSlug={storeSlug}
                            product={{
                                id: product.id,
                                title: product.title,
                                price: product.price,
                                imageUrl: product.main_image_url
                                    ? `${process.env.NEXT_PUBLIC_ITEMS_ASSET_URL}/${product.main_image_url}`
                                    : undefined,
                            }}
                            availableMaterials={product.available_materials}
                            availableColors={product.available_colors}
                            availableSizes={product.available_sizes}
                            isLoggedIn={!!session?.user}
                        />
                    </div>
                </div>

                <div className="mt-12">
                    <Separator className="mb-8" />
                    <ProductReviewSection
                        productId={product.id}
                        storeSlug={storeSlug}
                        productSlug={productSlug}
                        averageRating={product.average_rating ?? null}
                        reviewCount={product.review_count ?? null}
                    />
                </div>
            </div>
        </main>
    );
}
