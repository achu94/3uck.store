"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Nicht eingeloggt" };

    const supabase = supabaseServer();

    const { data: store } = await supabase
        .from("stores")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

    if (!store) return { success: false, error: "Kein Store gefunden" };

    const { error } = await supabase
        .from("orders")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", orderId)
        .eq("store_id", store.id);

    if (error) return { success: false, error: "Status konnte nicht aktualisiert werden" };

    revalidatePath("/dashboard/orders");
    return { success: true };
}
