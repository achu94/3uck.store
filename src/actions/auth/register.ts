"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/schemas/auth.schema";
import { type RegisterInput } from "@/schemas/auth.schema";
import { createUser, getUserByEmail } from "@/services/user";

export async function registerUser(userData: RegisterInput) {
    try {
        // Validate input
        const validated = registerSchema.parse(userData);

        // Check if user already exists
        const existingUser = await getUserByEmail(validated.email);
        if (existingUser) {
            return {
                success: false,
                error: "Benutzer mit dieser E-Mail existiert bereits",
            };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(validated.password, 12);

        // Create user
        const user = await createUser({
            email: validated.email,
            name: validated.name,
            password: hashedPassword,
            provider: "credentials",
            provider_id: `credentials_${Date.now()}`,
        });

        return {
            success: true,
            userId: user.id,
        };
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
