"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateProfileSchema = z.object({
    name: z.string().min(2, "Name muss mindestens 2 Zeichen haben"),
});

export async function updateProfile(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Nicht autorisiert" };

    const parsed = updateProfileSchema.safeParse({ name: formData.get("name") });
    if (!parsed.success) {
        return { success: false, errors: parsed.error.flatten().fieldErrors };
    }

    const supabase = supabaseServer();
    const { error } = await supabase
        .from("users")
        .update({ name: parsed.data.name, updated_at: new Date().toISOString() })
        .eq("id", session.user.id);

    if (error) return { success: false, error: "Fehler beim Speichern" };

    revalidatePath("/dashboard/settings");
    return { success: true };
}
