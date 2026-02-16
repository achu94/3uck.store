"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import type { Database } from "@/types/supabase";

export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type GetCategoriesResult =
    | Omit<Category, "updated_at" | "store_id">[]
    | null;

export async function getCategories(
    categoryId?: number,
): Promise<GetCategoriesResult> {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        redirect("/auth/signin");
    }

    const supabase = supabaseServer();

    // 🔒 Ownership prüfen (einmal, immer)
    const { data: store } = await supabase
        .from("stores")
        .select("id")
        .eq("user_id", userId)
        .single();

    if (!store) {
        return null;
    }

    // 🧠 Basis-Query
    let query = supabase
        .from("categories")
        .select(
            `
            id,
            name,
            slug,
            description,
            is_active,
            sort_order,
            created_at
        `,
        )
        .eq("store_id", store.id);

    // 👉 Eine Kategorie
    if (categoryId) {
        const { data, error } = await query.eq("id", categoryId).single();

        if (error || !data) {
            return null;
        }

        return [data];
    }

    // 👉 Alle Kategorien
    const { data, error } = await query.order("sort_order", {
        ascending: true,
    });

    if (error || !data) {
        return [];
    }

    return data;
}
