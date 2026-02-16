import { z } from "zod";

export const waitListSchema = z.object({
    name: z.string().min(2, {
        message: "Name muss mindestens 2 Zeichen lang sein.",
    }),
    email: z.string().email({
        message: "Bitte gib eine gültige E-Mail-Adresse ein.",
    }),
    interest: z.string().min(2, {
        message: "Bitte wähle aus .",
    }),
    message: z.string().optional(),
});

export type CreateWaitList = z.infer<typeof waitListSchema>;