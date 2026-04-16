"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import type { Store } from "@/types/db";

export async function getStoreBySlug(slug: string): Promise<Store | null> {
    const supabase = supabaseServer();

    const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

    if (error || !data) {
        return null;
    }

    return data as Store;
}
