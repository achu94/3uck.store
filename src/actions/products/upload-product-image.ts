// src/app/(protected)/dashboard/products/actions.ts
"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import { uploadImage } from "@/lib/uploadImage";
import { revalidatePath } from "next/cache";

export async function uploadProductImage(productId: string, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Nicht autorisiert" };

    const file = formData.get("image") as File;
    if (!file) return { error: "Keine Datei gefunden" };

    // 1. Upload zum ITEMS Bucket (wie in deiner ENV definiert)
    const storagePath = await uploadImage({
        file,
        bucket: "3uck-item-assets",
        prefix: `products/${productId}`,
        width: 1080,
    });

    // 2. Den relativen Pfad in der DB speichern
    const supabase = supabaseServer();
    const { error } = await supabase
        .from("products")
        .update({
            // Falls du die Spalte in der DB 'main_image_url' genannt hast:
            main_image_url: storagePath
        })
        .eq("id", productId);

    if (error) {
        console.error("DB Error:", error);
        return { error: "DB Update fehlgeschlagen" };
    }

    revalidatePath(`/dashboard/products/${productId}`);

    // Wir geben den Pfad zurück. Im Frontend setzt du ihn mit 
    // NEXT_PUBLIC_ITEMS_ASSET_URL zusammen.
    return { success: true, url: storagePath };
}