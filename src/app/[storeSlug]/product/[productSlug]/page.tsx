import { notFound } from "next/navigation";
import { RESERVED_SLUGS } from "@/lib/reservedSlugs";
import { PublicProduct } from "@/app/components/public/PublicProduct";
import { getStoreBySlug } from "@/actions/store/get-store-by-slug";
import { getPublicProductBySlug } from "@/actions/products/get-public-product-by-slug";

interface PageProps {
    params: Promise<{ storeSlug: string; productSlug: string }>;
}

export default async function Page({ params }: PageProps) {
    const { storeSlug, productSlug } = await params;
    const slug = storeSlug.toLowerCase();

    if (RESERVED_SLUGS.includes(slug)) {
        notFound();
    }

    return <PublicProduct storeSlug={slug} productSlug={productSlug} />;
}

export async function generateMetadata({ params }: PageProps) {
    const { storeSlug, productSlug } = await params;

    const store = await getStoreBySlug(storeSlug.toLowerCase());
    if (!store) return {};

    const product = await getPublicProductBySlug(store.id, productSlug);
    if (!product) return {};

    return {
        title: `${product.title} – ${store.name} | 3uck.store`,
        description: product.description ?? undefined,
        openGraph: {
            title: `${product.title} – ${store.name}`,
            description: product.description ?? undefined,
            images: product.main_image_url
                ? [
                      {
                          url: `${process.env.NEXT_PUBLIC_ITEMS_ASSET_URL}/${product.main_image_url}`,
                          width: 800,
                          height: 800,
                      },
                  ]
                : [],
        },
    };
}
