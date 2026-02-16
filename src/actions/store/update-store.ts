"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { updateStoreSchema } from "@/schemas/store.schema";
import { revalidatePath } from "next/cache";

export async function updateStore(formData: FormData) {
    const supabase = supabaseServer();

    const { storeId, ...updateData } = updateStoreSchema.parse(
        Object.fromEntries(formData),
    );

    const { error } = await supabase
        .from("stores")
        .update(updateData)
        .eq("id", storeId);

    if (error) throw error;

    revalidatePath("/dashboard/settings");
}
