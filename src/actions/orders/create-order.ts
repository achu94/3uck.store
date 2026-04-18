"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";

export async function createOrder(
    storeId: number,
    storeSlug: string,
    items: { productId: string; title: string; price: number; quantity: number }[],
    notes?: string,
) {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, error: "Nicht eingeloggt" };
    }

    const supabase = supabaseServer();
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
            user_id: session.user.id,
            store_id: storeId,
            status: "pending",
            total_price: totalPrice,
            notes: notes ?? null,
        })
        .select("id")
        .single();

    if (orderError || !order) {
        return { success: false, error: "Bestellung konnte nicht erstellt werden" };
    }

    const { error: itemsError } = await supabase.from("order_items").insert(
        items.map((i) => ({
            order_id: order.id,
            product_id: i.productId,
            title: i.title,
            price: i.price,
            quantity: i.quantity,
        })),
    );

    if (itemsError) {
        return { success: false, error: "Bestellpositionen konnten nicht gespeichert werden" };
    }

    revalidatePath(`/${storeSlug}`);
    return { success: true, orderId: order.id };
}
