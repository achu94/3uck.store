import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({
        message: "Bitte gib eine gültige E-Mail-Adresse ein.",
    }),
    password: z.string().min(6, {
        message: "Passwort muss mindestens 6 Zeichen lang sein.",
    }),
});

export const registerSchema = z.object({
    email: z.string().email({
        message: "Bitte gib eine gültige E-Mail-Adresse ein.",
    }),
    password: z.string().min(6, {
        message: "Passwort muss mindestens 6 Zeichen lang sein.",
    }),
    name: z.string().min(2, {
        message: "Name muss mindestens 2 Zeichen lang sein.",
    }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;