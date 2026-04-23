"use server";

import { supabaseServer } from "@/lib/supabaseServer";

export type ProductImage = {
    id: number;
    url: string;
    sort_order: number | null;
    alt_text: string | null;
};

export type PublicProductDetail = {
    id: string;
    title: string;
    description: string | null;
    price: number;
    main_image_url: string | null;
    slug: string;
    available_colors: string[] | null;
    available_materials: string[] | null;
    available_sizes: string[] | null;
    store_id: number;
    average_rating: number | null;
    review_count: number | null;
    product_images: ProductImage[];
};

export async function getPublicProductBySlug(
    storeId: number,
    productSlug: string,
): Promise<PublicProductDetail | null> {
    const supabase = supabaseServer();

    const { data, error } = await supabase
        .from("products")
        .select(
            "id, title, description, price, main_image_url, slug, available_colors, available_materials, available_sizes, store_id, average_rating, product_images(id, url, sort_order, alt_text)",
        )
        .eq("store_id", storeId)
        .eq("slug", productSlug)
        .eq("status", "published")
        .single();

    if (error || !data) {
        return null;
    }

    const raw = data as typeof data & {
        product_images: ProductImage[];
        average_rating?: number | null;
    };

    const sortedImages = (raw.product_images ?? []).sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
    );

    // review_count is not a column in the products table — fetch separately
    const { data: ratingData } = await supabase
        .from("products")
        .select("review_count")
        .eq("id", raw.id)
        .single();

    return {
        ...raw,
        average_rating: raw.average_rating ?? null,
        review_count: (ratingData as { review_count?: number | null } | null)?.review_count ?? null,
        product_images: sortedImages,
    } as PublicProductDetail;
}
