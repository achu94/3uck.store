"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateStatusSchema = z.object({
    productIds: z.array(z.string()),
    status: z.enum(["draft", "published"]),
});

export async function bulkUpdateStatus(productIds: string[], status: "draft" | "published") {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const parsed = updateStatusSchema.safeParse({ productIds, status });
    if (!parsed.success) {
        throw new Error("Invalid input");
    }

    const supabase = supabaseServer();

    const { data: store } = await supabase
        .from("stores")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

    if (!store) throw new Error("Store not found");

    const { error } = await supabase
        .from("products")
        .update({ status })
        .in("id", productIds)
        .eq("store_id", store.id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/products");

    return { success: true };
}