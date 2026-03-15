// src/actions/products/update-product.ts
"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { updateProductSchema } from "@/schemas/product.schema";

export async function updateProduct(productId: string, rawData: any) {
    // 1. Auth-Check
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Nicht autorisiert" };

    // 2. Zod-Validierung
    // Wir nehmen die Rohdaten vom Formular und jagen sie durch das Schema
    const validation = updateProductSchema.safeParse({ ...rawData, id: productId });

    if (!validation.success) {
        // Hier kommen die 'errors' her, die deine UI (setErrors) erwartet
        return {
            success: false,
            errors: validation.error.flatten().fieldErrors
        };
    }

    const { data } = validation;
    const supabase = supabaseServer();

    // 3. Slug-Generierung (NOT NULL Constraint in DB)
    const slug = data.title
        ? slugify(data.title, { lower: true, strict: true })
        : `draft-${productId}`;

    // 4. Update in Supabase
    const { error } = await supabase
        .from("products")
        .update({
            title: data.title,
            slug: slug,
            description: data.description,
            price: data.price,
            available_colors: data.available_colors,
            available_materials: data.available_materials,
            available_sizes: data.available_sizes,
            status: data.status,
            is_active: data.status === "published",
            updated_at: new Date().toISOString(),
        })
        .eq("id", productId);

    if (error) {
        console.error("Update Error:", error);
        return { success: false, error: "Fehler beim Speichern in der Datenbank" };
    }

    // 5. Cache refresh
    revalidatePath("/dashboard/products");
    return { success: true };
}