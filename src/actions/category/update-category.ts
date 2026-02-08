"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { updateCategorySchema } from "@/schemas/category.schema";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export type UpdateCategoryState = {
    errors: {
        name?: string[];
        description?: string[];
        is_active?: string[];
        sort_order?: string[];
        categoryId?: string[];
    };
    values?: {
        name?: string;
        description?: string;
        is_active?: boolean;
        sort_order?: number;
    };
};

export async function updateCategory(
    prevState: UpdateCategoryState,
    formData: FormData,
): Promise<UpdateCategoryState> {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return {
            errors: {
                name: ["Nicht autorisiert."],
            },
        };
    }

    const data = Object.fromEntries(formData.entries());
    const result = updateCategorySchema.safeParse(data);

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
            values: {
                name: formData.get("name")?.toString(),
                description: formData.get("description")?.toString(),
                is_active: formData.get("is_active") === "true",
                sort_order: Number(formData.get("sort_order") ?? 0),
            },
        };
    }

    const parsed = result.data;

    // 🔒 Ownership + Kategorie laden
    const { data: category } = await supabaseServer()
        .from("categories")
        .select("id, store_id")
        .eq("id", parsed.categoryId)
        .single();

    if (!category) {
        return {
            errors: {
                categoryId: ["Kategorie nicht gefunden."],
            },
        };
    }

    const { data: store } = await supabaseServer()
        .from("stores")
        .select("id")
        .eq("id", category.store_id)
        .eq("user_id", userId)
        .single();

    if (!store) {
        return {
            errors: {
                categoryId: ["Kein Zugriff auf diese Kategorie."],
            },
        };
    }

    const { error } = await supabaseServer()
        .from("categories")
        .update({
            name: parsed.name,
            description: parsed.description,
            is_active: parsed.is_active,
            sort_order: parsed.sort_order,
        })
        .eq("id", parsed.categoryId);

    if (error) {
        return {
            errors: {
                name: ["Fehler beim Aktualisieren der Kategorie."],
            },
            values: {
                name: parsed.name,
                description: parsed.description ?? undefined,
                is_active: parsed.is_active,
                sort_order: parsed.sort_order,
            },
        };
    }

    revalidatePath(`/store/${category.store_id}`);
    return { errors: {} };
}
