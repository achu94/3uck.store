"use server";

import { z } from "zod";
import { signIn } from "@/lib/auth";
import { loginSchema } from "@/schemas/auth.schema";
import { type LoginInput } from "@/schemas/auth.schema";

export async function loginUser(credentials: LoginInput) {
    try {
        // Validate input
        const validated = loginSchema.parse(credentials);
        
        // Attempt sign in
        const result = await signIn("credentials", {
            email: validated.email,
            password: validated.password,
            redirect: false,
        });

        if (result?.error) {
            return {
                success: false,
                error: "Invalid email or password",
            };
        }

        return { success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: error.errors[0]?.message || "Validation failed",
            };
        }
        
        return {
            success: false,
            error: "Login failed",
        };
    }
}