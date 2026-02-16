"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { z } from "zod";
import { waitListSchema } from "@/schemas/waitlist.schema";
import { type CreateWaitList } from "@/schemas/waitlist.schema";

export async function createWaitlist(userData: CreateWaitList) {
    const supabase = supabaseServer();

    try {
        const validated = waitListSchema.parse(userData);

        await supabase
            .from("waitlist")
            .insert(validated)
            .select()
            .single();

    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: error.issues[0]?.message || "Validation failed",
            };
        }

        return {
            success: false,
            error: "Registrierung fehlgeschlagen",
        };
    }
}
