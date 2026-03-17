// src/schemas/product.schema.ts
import { z } from "zod";

const productImageSchema = z.object({
    id: z.string().optional(),
    url: z.string(),
    sort_order: z.number().default(0),
    product_id: z.string().optional(),
});

export const productBaseSchema = z.object({
    id: z.string(),
    title: z.string().default(""),
    price: z.coerce.number().default(0),
    description: z.string().nullable().default(""),
    main_image_url: z.string().nullable().default(null),
    product_images: z.array(productImageSchema).default([]),
    available_materials: z.array(z.string()).default([]),
    available_colors: z.array(z.string()).default([]),
    available_sizes: z.array(z.string()).default([]),
    status: z.enum(["draft", "published"]).default("draft"),
});

export const updateProductSchema = productBaseSchema.extend({
    title: z.string().min(3, "Titel muss mindestens 3 Zeichen lang sein"),
    price: z.coerce.number().gt(0, "Preis muss über 0 liegen"),
});

export type ProductRow = z.infer<typeof productBaseSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;