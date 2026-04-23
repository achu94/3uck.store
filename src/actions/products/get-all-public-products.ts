"use server";

import { supabaseServer } from "@/lib/supabaseServer";

export type MarketplaceProduct = {
    id: string;
    title: string;
    description: string | null;
    price: number;
    main_image_url: string | null;
    slug: string;
    store_slug: string;
    sales_count: number;
    average_rating: number | null;
};

type RawProduct = {
    id: string;
    title: string;
    description: string | null;
    price: number;
    main_image_url: string | null;
    slug: string;
    sales_count: number | null;
    average_rating: number | null;
    stores: { slug: string } | null;
};

export async function getAllPublicProducts(options?: {
    search?: string;
    sortBy?: "newest" | "bestseller";
    limit?: number;
}): Promise<MarketplaceProduct[]> {
    const supabase = supabaseServer();

    let query = supabase
        .from("products")
        .select(
            "id, title, description, price, main_image_url, slug, sales_count, average_rating, stores!inner(slug)"
        )
        .eq("status", "published")
        .eq("stores.is_active", true);

    if (options?.search?.trim()) {
        query = query.ilike("title", `%${options.search.trim()}%`);
    }

    if (options?.sortBy === "bestseller") {
        query = query.order("sales_count", { ascending: false, nullsFirst: false });
    } else {
        query = query.order("created_at", { ascending: false });
    }

    if (options?.limit) {
        query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error || !data) {
        return [];
    }

    return (data as unknown as RawProduct[])
        .filter((p) => p.stores?.slug)
        .map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            price: p.price,
            main_image_url: p.main_image_url,
            slug: p.slug,
            store_slug: p.stores!.slug,
            sales_count: p.sales_count ?? 0,
            average_rating: p.average_rating,
        }));
}
