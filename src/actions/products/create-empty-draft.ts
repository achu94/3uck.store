// src/app/(protected)/dashboard/products/actions.ts
"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import { productBaseSchema } from "@/schemas/product.schema";
import { Tables } from "@/types/supabase";

export async function createEmptyDraft(): Promise<Tables<"products">> {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const supabase = supabaseServer();

    // 1. Store finden
    const { data: store } = await supabase
        .from("stores")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

    if (!store) throw new Error("Store not found");

    const partialData = productBaseSchema.parse({
        id: crypto.randomUUID(), // Temporäre ID, falls nötig, oder DB generiert sie
    });

    const draftData = {
        ...partialData,
        store_id: store.id,
        slug: `draft-${crypto.randomUUID()}`, // Pflichtfeld in deiner DB
    };

    // 3. Insert
    const { data, error } = await supabase
        .from("products")
        .insert(draftData)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
}