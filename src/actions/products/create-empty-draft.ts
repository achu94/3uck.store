// src/app/(protected)/dashboard/products/actions.ts
"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import { productBaseSchema, type ProductRow } from "@/schemas/product.schema";

export async function createEmptyDraft(): Promise<Pick<ProductRow, "id">> {
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
        id: crypto.randomUUID(),
    });

    const { product_images, ...rest } = partialData;

    const draftData = {
        ...rest,
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

    return { id: data.id };
}
