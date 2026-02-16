import { z } from "zod";

export const storeBaseSchema = z.object({
    name: z.string().min(4, {
        message: "Der Shop-Name muss mindestens 4 Zeichen lang sein.",
    }),

    slug: z
        .string()
        .min(4, {
            message: "Die Shop-URL muss mindestens 4 Zeichen lang sein.",
        })
        .regex(/^[a-z0-9-]+$/, {
            message:
                "Die Shop-URL darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten.",
        }),

    description: z
        .string()
        .max(1000, {
            message: "Die Beschreibung darf maximal 1000 Zeichen lang sein.",
        })
        .optional()
        .nullable(),

    contact_email: z
        .email({
            message: "Bitte gib eine gültige E-Mail-Adresse an.",
        })
        .optional()
        .nullable(),

    logo_url: z.string().optional().nullable(),

    type: z.enum(["print", "model"], {
        message: "Bitte wähle einen gültigen Store-Typ aus.",
    }),
});

export const createStoreSchema = storeBaseSchema;

export const updateStoreSchema = storeBaseSchema
    .omit({
        name: true,
        slug: true,
    })
    .extend({
        storeId: z.number().int({
            message: "Store-ID muss eine ganze Zahl sein.",
        }),
    });
