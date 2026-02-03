"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { createStoreSchema } from "@/schemas/store.schema";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function createStore(formData: FormData) {
    const session = await auth();

    const userId = session?.user?.id;
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const parsed = createStoreSchema.parse(Object.fromEntries(formData));

    const { data: store, error } = await supabaseServer()
        .from("stores")
        .insert({
            ...parsed,
            user_id: userId,
        })
        .select()
        .single();

    if (error) throw error;

    revalidatePath("/dashboard");
    redirect(`/dashboard/${store.slug}`);
}
