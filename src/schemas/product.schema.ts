// src/schemas/product.schema.ts
import { z } from "zod";
import { Tables } from "@/types/supabase";

// 1. Das LOCKERE Schema (für createEmptyDraft und Zwischenspeichern)
export const productBaseSchema = z.object({
    id: z.string().uuid(),
    title: z.string().default(""),
    price: z.coerce.number().default(0),
    description: z.string().nullable().default(""),
    main_image_url: z.string().nullable().default(null), // <-- HIER hinzufügen
    available_materials: z.array(z.string()).default([]),
    available_colors: z.array(z.string()).default([]),
    available_sizes: z.array(z.string()).default([]),
    status: z.enum(["draft", "published"]).default("draft"),
});

// 2. Das HARTE Schema (für "Veröffentlichen")
export const updateProductSchema = productBaseSchema.extend({
    title: z.string().min(3, "Titel muss mindestens 3 Zeichen lang sein"),
    price: z.coerce.number().gt(0, "Preis muss über 0 liegen"),
    // Falls ein Bild zum Veröffentlichen PFLICHT sein soll:
    // main_image_url: z.string().min(1, "Bitte lade ein Bild hoch"),
});

export type ProductRow = Tables<"products">;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;