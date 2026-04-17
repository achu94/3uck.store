"use server";

import { supabaseServer } from "@/lib/supabaseServer";

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
};

export async function getPublicProductBySlug(
    storeId: number,
    productSlug: string,
): Promise<PublicProductDetail | null> {
    const supabase = supabaseServer();

    const { data, error } = await supabase
        .from("products")
        .select(
            "id, title, description, price, main_image_url, slug, available_colors, available_materials, available_sizes, store_id",
        )
        .eq("store_id", storeId)
        .eq("slug", productSlug)
        .eq("status", "published")
        .single();

    if (error || !data) {
        return null;
    }

    // Try to fetch rating columns — they may not exist before the reviews migration is applied
    const { data: ratingData } = await supabase
        .from("products")
        .select("average_rating, review_count")
        .eq("id", data.id)
        .single();

    return {
        ...data,
        average_rating: (ratingData as { average_rating?: number | null } | null)?.average_rating ?? null,
        review_count: (ratingData as { review_count?: number | null } | null)?.review_count ?? null,
    } as PublicProductDetail;
}
