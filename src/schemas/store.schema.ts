import { z } from "zod";

export const storeBaseSchema = z.object({
    name: z.string().min(4),
    slug: z.string().min(4),
    description: z.string().nullable().optional(),
    contact_email: z.string().email().nullable().optional(),
    logo_url: z.string().url().nullable().optional(),
    type: z.string(),
});

export const createStoreSchema = storeBaseSchema.extend({
    user_id: z.string(),
});

export const updateStoreSchema = storeBaseSchema
    .omit({
        name: true,
        slug: true,
    })
    .extend({
        storeId: z.number(),
    });
