import { z } from "zod";

export const categoryBaseSchema = z.object({
    name: z.string().min(2, {
        message: "Der Kategoriename muss mindestens 2 Zeichen lang sein.",
    }),

    slug: z
        .string()
        .min(2, {
            message: "Die Kategorie-URL muss mindestens 2 Zeichen lang sein.",
        })
        .regex(/^[a-z0-9-]+$/, {
            message:
                "Die Kategorie-URL darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten.",
        }),

    description: z
        .string()
        .max(500, {
            message: "Die Beschreibung darf maximal 500 Zeichen lang sein.",
        })
        .optional()
        .nullable(),

    is_active: z.boolean().optional().default(true),

    sort_order: z
        .number()
        .int({
            message: "Die Sortierreihenfolge muss eine ganze Zahl sein.",
        })
        .optional()
        .default(0),
});

export const createCategorySchema = categoryBaseSchema.extend({
    storeId: z.number().int({
        message: "Store-ID muss eine ganze Zahl sein.",
    }),
});

export const updateCategorySchema = categoryBaseSchema
    .omit({
        slug: true,
    })
    .extend({
        categoryId: z.number().int({
            message: "Kategorie-ID muss eine ganze Zahl sein.",
        }),
    });
