"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export type OrderWithItems = {
    id: string;
    status: string;
    total_price: number;
    notes: string | null;
    created_at: string;
    store: { id: number; name: string; slug: string } | null;
    items: { id: string; title: string; price: number; quantity: number }[];
};

export async function getMyOrders(): Promise<OrderWithItems[]> {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/signin");

    const supabase = supabaseServer();

    const { data, error } = await supabase
        .from("orders")
        .select("id, status, total_price, notes, created_at, stores(id, name, slug), order_items(id, title, price, quantity)")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((o) => ({
        id: o.id,
        status: o.status,
        total_price: Number(o.total_price),
        notes: o.notes,
        created_at: o.created_at,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        store: Array.isArray(o.stores) ? o.stores[0] : (o.stores as any),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items: (o.order_items ?? []) as any,
    }));
}
