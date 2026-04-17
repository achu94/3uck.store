import { z } from "zod";

export const createReviewSchema = z.object({
    rating: z.number().int().min(0).max(5),
    comment: z.string().max(1000).nullable().optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
