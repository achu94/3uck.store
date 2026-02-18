"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { createCategorySchema } from "@/schemas/category.schema";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export type CreateCategoryState = {
    errors: {
        name?: string[];
        slug?: string[];
        description?: string[];
        storeId?: string[];
    };
    values?: {
        name?: string;
        slug?: string;
        description?: string;
    };
};

export async function createCategory(
    formData: FormData,
): Promise<CreateCategoryState> {
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
    const result = createCategorySchema.safeParse(data);

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
            values: {
                name: formData.get("name")?.toString(),
                slug: formData.get("slug")?.toString(),
                description: formData.get("description")?.toString(),
            },
        };
    }

    const parsed = result.data;

    const { data: store } = await supabaseServer()
        .from("stores")
        .select("id")
        .eq("id", parsed.storeId)
        .eq("user_id", userId)
        .single();

    if (!store) {
        return {
            errors: {
                storeId: ["Kein Zugriff auf diesen Store."],
            },
        };
    }

    const { error } = await supabaseServer().from("categories").insert({
        store_id: parsed.storeId,
        name: parsed.name,
        slug: parsed.slug,
        description: parsed.description,
        is_active: parsed.is_active,
        sort_order: parsed.sort_order,
    });

    if (error) {
        return {
            errors: {
                name: ["Fehler beim Erstellen der Kategorie."],
            },
            values: {
                name: parsed.name,
                slug: parsed.slug,
                description: parsed.description ?? undefined,
            },
        };
    }

    revalidatePath(`/store/${parsed.storeId}`);
    return { errors: {} };
}
