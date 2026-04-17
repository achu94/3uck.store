"use server";

import { supabaseServer } from "@/lib/supabaseServer";

export type ReviewWithUser = {
    id: string;
    rating: number;
    comment: string | null;
    created_at: string;
    user: {
        id: string;
        name: string | null;
        image: string | null;
    };
};

export async function getProductReviews(productId: string): Promise<ReviewWithUser[]> {
    const supabase = supabaseServer();

    const { data, error } = await supabase
        .from("reviews")
        .select("id, rating, comment, created_at, user_id, users(id, name, image)")
        .eq("product_id", productId)
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
