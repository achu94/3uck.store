"use server";

import { supabaseServer } from "@/lib/supabaseServer";

export type PublicProduct = {
    id: string;
    title: string;
    description: string | null;
    price: number;
    main_image_url: string | null;
    slug: string;
};

export async function getPublicProducts(storeId: number): Promise<PublicProduct[]> {
    const supabase = supabaseServer();

    const { data, error } = await supabase
        .from("products")
        .select("id, title, description, price, main_image_url, slug")
        .eq("store_id", storeId)
        .eq("status", "published")
        .order("created_at", { ascending: false });

    if (error || !data) {
        return [];
    }

    return data as PublicProduct[];
}
