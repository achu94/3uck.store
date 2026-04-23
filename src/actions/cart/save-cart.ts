"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import type { BasketItem } from "@/atoms/basket";

function encodeItemTitle(item: BasketItem): string {
    const parts = [item.title];
    if (item.selectedColor) parts.push(`color:${item.selectedColor}`);
    if (item.selectedMaterial) parts.push(`material:${item.selectedMaterial}`);
    if (item.selectedSize) parts.push(`size:${item.selectedSize}`);
    return parts.join("|");
}

export async function saveCartToDb(items: BasketItem[]): Promise<void> {
    const session = await auth();
    if (!session?.user?.id) return;

    const supabase = supabaseServer();
    const userId = session.user.id;

    const storeGroups = new Map<number, BasketItem[]>();
    for (const item of items) {
        const group = storeGroups.get(item.storeId) ?? [];
        group.push(item);
        storeGroups.set(item.storeId, group);
    }

    const { data: existingOrders } = await supabase
        .from("orders")
        .select("id, store_id")
        .eq("user_id", userId)
        .eq("status", "cart");

    const existingByStore = new Map<number, string>();
    for (const o of existingOrders ?? []) {
        existingByStore.set(o.store_id, o.id);
    }

    const activeStoreIds = new Set(storeGroups.keys());
    const toDelete: string[] = [];
    for (const [storeId, orderId] of existingByStore) {
        if (!activeStoreIds.has(storeId)) toDelete.push(orderId);
    }
    if (toDelete.length > 0) {
        await supabase.from("orders").delete().in("id", toDelete);
    }

    for (const [storeId, storeItems] of storeGroups) {
        const total = storeItems.reduce((s, i) => s + i.price * i.quantity, 0);
        const existingId = existingByStore.get(storeId);

        let orderId: string;

        if (existingId) {
            await supabase
                .from("orders")
                .update({ total_price: total, updated_at: new Date().toISOString() })
                .eq("id", existingId);
            orderId = existingId;
            await supabase.from("order_items").delete().eq("order_id", orderId);
        } else {
            const { data: newOrder } = await supabase
                .from("orders")
                .insert({ user_id: userId, store_id: storeId, status: "cart", total_price: total })
                .select("id")
                .single();
            if (!newOrder) continue;
            orderId = newOrder.id;
        }

        await supabase.from("order_items").insert(
            storeItems.map((i) => ({
                order_id: orderId,
                product_id: i.productId,
                title: encodeItemTitle(i),
                price: i.price,
                quantity: i.quantity,
            }))
        );
    }
}
