"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import type { ReviewWithUser } from "./get-product-reviews";

export async function getStoreReviews(storeId: number): Promise<ReviewWithUser[]> {
    const supabase = supabaseServer();

    const { data, error } = await supabase
        .from("reviews")
        .select("id, rating, comment, created_at, user_id, users(id, name, image)")
        .eq("store_id", storeId)
        .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((r) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        created_at: r.created_at,
        user: Array.isArray(r.users) ? r.users[0] : (r.users as { id: string; name: string | null; image: string | null }),
    }));
}
