"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export type StoreOrder = {
    id: string;
    status: string;
    total_price: number;
    notes: string | null;
    created_at: string;
    customer: { id: string; name: string | null; image: string | null } | null;
    items: { id: string; title: string; price: number; quantity: number }[];
};

export async function getStoreOrders(): Promise<StoreOrder[]> {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/signin");

    const supabase = supabaseServer();

    const { data: store } = await supabase
        .from("stores")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

    if (!store) return [];

    const { data, error } = await supabase
        .from("orders")
        .select("id, status, total_price, notes, created_at, user_id, users(id, name, image), order_items(id, title, price, quantity)")
        .eq("store_id", store.id)
        .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((o) => ({
        id: o.id,
        status: o.status,
        total_price: Number(o.total_price),
        notes: o.notes,
        created_at: o.created_at,
        customer: Array.isArray(o.users) ? o.users[0] : (o.users as any),
        items: (o.order_items ?? []) as any,
    }));
}
