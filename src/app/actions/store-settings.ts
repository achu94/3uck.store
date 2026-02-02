"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";
import { StoreCreateInput } from "@/types/db";

export async function saveStoreSettings(formData: FormData) {
    const supabase = supabaseServer();

    const data = Object.fromEntries(formData);

    const { error } = await supabase
        .from("stores")
        .update({
            name: data.name,
            currency: data.currency,
        })
        .eq("id", data.storeId);

    if (error) throw error;

    revalidatePath("/dashboard/settings");
}
