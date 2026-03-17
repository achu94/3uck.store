"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import { uploadImage } from "@/lib/uploadImage";
import { revalidatePath } from "next/cache";

export async function updateSingleProductImage(
    productId: string,
    formData: FormData,
    isMain: boolean,
    slotIndex?: number
) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Nicht autorisiert" };

    const file = formData.get("image") as File;
    if (!file) return { error: "Keine Datei gefunden" };

    // WICHTIG: Wir legen den Namen fest
    const imageId = `${crypto.randomUUID()}.webp`;

    // 1. Upload Hauptbild (1080px)
    const storagePath = await uploadImage({
        file,
        bucket: "3uck-item-assets",
        prefix: `products/${productId}`,
        fileName: imageId, // Hier übergeben
        width: 1080,
    });

    // 2. Upload Thumbnail (300px)
    // Gleicher Name, aber anderer Prefix (Ordner)
    await uploadImage({
        file,
        bucket: "3uck-item-assets",
        prefix: `products/${productId}/thumbs`,
        fileName: imageId, // Hier EXAKT GLEICH
        width: 300,
    });

    const supabase = supabaseServer();

    if (isMain) {
        await supabase
            .from("products")
            .update({ main_image_url: storagePath })
            .eq("id", productId);
    } else {
        // Altes Bild im Slot löschen
        await supabase
            .from("product_images")
            .delete()
            .eq("product_id", productId)
            .eq("sort_order", slotIndex);

        // Neues Galerie-Bild eintragen
        await supabase.from("product_images").insert({
            product_id: productId,
            url: storagePath,
            sort_order: slotIndex,
        });
    }

    revalidatePath(`/dashboard/products/${productId}`);
    return { success: true, url: storagePath };
}