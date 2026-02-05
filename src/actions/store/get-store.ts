"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";

import type { Store } from "@/types/db";

export async function getStore(): Promise<Store | null> {
    const session = await auth();

    const userId = session?.user?.id;
    if (!userId) {
        redirect("/login");
    }

    const supabase = supabaseServer();

    const { data: store, error } = await supabase
        .from("stores")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error || !store) {
        return null;
    }

    return store;
}
