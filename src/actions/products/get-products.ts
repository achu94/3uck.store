"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import { ProductRow } from "@/schemas/product.schema";

export type Product = ProductRow;
export type GetProductsResult =
    | Omit<Product, "updated_at" | "store_id">[]
    | null;

export async function getProducts(
    productId?: string,
): Promise<GetProductsResult> {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        redirect("/auth/signin");
    }

    const supabase = supabaseServer();

    const { data: store } = await supabase
        .from("stores")
        .select("id")
        .eq("user_id", userId)
        .single();

    if (!store) {
        return null;
    }

    let query = supabase
        .from("products")
        .select(
            `
            id,
            title,
            description,
            price,
            status,
            main_image_url,
            category_id,
            created_at
        `,
        )
        .eq("store_id", store.id);

    if (productId) {
        const { data, error } = await query.eq("id", productId).single();

        if (error || !data) {
            return null;
        }

        return [data as unknown as Product];
    }

    const { data, error } = await query.order("created_at", {
        ascending: false,
    });

    if (error || !data) {
        return [];
    }

    return data as unknown as Product[];
}
