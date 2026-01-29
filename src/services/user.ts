import type { UserInsert } from "@/types/public.users";
import { supabase } from "@/lib/supabaseClient";

export async function createUser(user: UserInsert) {
    try {
        const { data, error } = await supabase
            .from("users")
            .insert(user)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (err) {
        console.error("createUser failed:", err);
        throw err; // wichtig: Fehler weiterreichen
    }
}

export async function getUserByEmail(email: string) {
    try {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (error) {
            throw error;
        }

        return data;
    } catch (err) {
        console.error("getUserByEmail failed:", err);
        throw err; // wichtig: Fehler weiterreichen
    }
}

export async function getUserByProviderId(providerId: string) {
    try {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("provider_id", providerId)
            .maybeSingle();

        if (error) {
            throw error;
        }

        return data;
    } catch (err) {
        console.error("getUserByEmail failed:", err);
        throw err; // wichtig: Fehler weiterreichen
    }
}

export async function getUserById(id: string) {
    try {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (err) {
        console.error("getUserById failed:", err);
        throw err; // wichtig: Fehler weiterreichen
    }
}

export async function updateUser(id: string, updates: Partial<UserInsert>) {
    try {
        const { data, error } = await supabase
            .from("users")
            .update(updates)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (err) {
        console.error("updateUser failed:", err);
        throw err; // wichtig: Fehler weiterreichen
    }
}