"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { createStoreSchema } from "@/schemas/store.schema";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/uploadImage";

export type CreateStoreState = {
    errors: {
        name?: string[];
        slug?: string[];
        type?: string[];
        description?: string[];
        contact_email?: string[];
        logo_url?: string[];
    };
    values?: {
        name?: string;
        slug?: string;
        description?: string;
        contact_email?: string;
    };
};

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

export async function createStore(
    prevState: CreateStoreState,
    formData: FormData,
): Promise<CreateStoreState> {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return {
            errors: {
                name: ["Nicht autorisiert."],
            },
        };
    }

    const data = Object.fromEntries(
        [...formData.entries()].filter(([, value]) => !(value instanceof File)),
    );

    const result = createStoreSchema.safeParse(data);

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
            values: {
                name: formData.get("name")?.toString(),
                slug: formData.get("slug")?.toString(),
                description: formData.get("description")?.toString(),
                contact_email: formData.get("contact_email")?.toString(),
            },
        };
    }

    const parsed = result.data;

    const logoFile = formData.get("logo_url") as File | null;
    let logoKey: string | null = null;

    if (logoFile instanceof File && logoFile.size > 0) {
        if (logoFile.size > MAX_IMAGE_SIZE) {
            return {
                errors: {
                    logo_url: ["Das Logo darf maximal 10 MB groß sein."],
                },
                values: getValues(formData),
            };
        }

        logoKey = await uploadImage({
            file: logoFile,
            bucket: "3uck-store-assets",
            prefix: `stores/${parsed.slug}`,
            width: 512,
        });
    }

    const { data: store, error } = await supabaseServer()
        .from("stores")
        .insert({
            ...parsed,
            user_id: userId,
            logo_url: logoKey,
        })
        .select()
        .single();

    if (error) {
        return {
            errors: {
                name: ["Fehler beim Erstellen des Stores."],
            },
            values: getValues(formData),
        };
    }

    revalidatePath("/store");
    redirect(`/store`);
}

const getValues = (formData: FormData) => ({
    name: formData.get("name")?.toString(),
    slug: formData.get("slug")?.toString(),
    description: formData.get("description")?.toString(),
    contact_email: formData.get("contact_email")?.toString(),
});
