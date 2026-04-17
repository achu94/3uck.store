"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";
import { createReviewSchema } from "@/schemas/review.schema";

export async function createProductReview(
    productId: string,
    storeSlug: string,
    productSlug: string,
    rawData: { rating: number; comment?: string | null },
) {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, error: "Nicht eingeloggt" };
    }

    const validation = createReviewSchema.safeParse(rawData);
    if (!validation.success) {
        return { success: false, error: "Ungültige Eingabe" };
    }

    const supabase = supabaseServer();

    const { error } = await supabase.from("reviews").upsert(
        {
            user_id: session.user.id,
            product_id: productId,
            store_id: null,
            rating: validation.data.rating,
            comment: validation.data.comment ?? null,
            updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,product_id" },
    );

    if (error) {
        return { success: false, error: "Fehler beim Speichern der Bewertung" };
    }

    revalidatePath(`/${storeSlug}/product/${productSlug}`);
    return { success: true };
}
