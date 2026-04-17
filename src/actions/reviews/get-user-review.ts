"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";

export async function getUserProductReview(productId: string) {
    const session = await auth();
    if (!session?.user?.id) return null;

    const supabase = supabaseServer();
    const { data } = await supabase
        .from("reviews")
        .select("id, rating, comment")
        .eq("user_id", session.user.id)
        .eq("product_id", productId)
        .single();

    return data ?? null;
}

export async function getUserStoreReview(storeId: number) {
    const session = await auth();
    if (!session?.user?.id) return null;

    const supabase = supabaseServer();
    const { data } = await supabase
        .from("reviews")
        .select("id, rating, comment")
        .eq("user_id", session.user.id)
        .eq("store_id", storeId)
        .single();

    return data ?? null;
}
