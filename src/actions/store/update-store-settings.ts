"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const storeSettingsSchema = z.object({
    description: z
        .string()
        .max(1000, "Beschreibung max. 1000 Zeichen")
        .optional()
        .nullable(),
    contact_email: z
        .string()
        .email("Ungültige E-Mail")
        .optional()
        .nullable()
        .or(z.literal("")),
});

export async function updateStoreSettings(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Nicht autorisiert" };

    const raw = {
        description: (formData.get("description") as string) || null,
        contact_email: (formData.get("contact_email") as string) || null,
    };

    const parsed = storeSettingsSchema.safeParse(raw);
    if (!parsed.success) {
        return { success: false, errors: parsed.error.flatten().fieldErrors };
    }

    const supabase = supabaseServer();

    const { data: store } = await supabase
        .from("stores")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

    if (!store) return { success: false, error: "Store nicht gefunden" };

    const { error } = await supabase
        .from("stores")
        .update({
            description: parsed.data.description,
            contact_email: parsed.data.contact_email || null,
            updated_at: new Date().toISOString(),
        })
        .eq("id", store.id);

    if (error) return { success: false, error: "Fehler beim Speichern" };

    revalidatePath("/dashboard/settings");
    return { success: true };
}
