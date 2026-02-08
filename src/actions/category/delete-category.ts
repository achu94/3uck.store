"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export type DeleteCategoryState = {
    errors?: {
        categoryId?: string[];
    };
};

export async function deleteCategory(
    categoryId: number,
): Promise<DeleteCategoryState> {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return {
            errors: {
                categoryId: ["Nicht autorisiert."],
            },
        };
    }

    // 🔒 Kategorie + Ownership prüfen
    const { data: category } = await supabaseServer()
        .from("categories")
        .select("id, store_id")
        .eq("id", categoryId)
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
        .update({ is_active: false })
        .eq("id", categoryId);

    if (error) {
        return {
            errors: {
                categoryId: ["Fehler beim Löschen der Kategorie."],
            },
        };
    }

    revalidatePath(`/store/${category.store_id}`);
    return {};
}
