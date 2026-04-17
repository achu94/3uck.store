"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "./StarRating";
import { toast } from "sonner";
import Link from "next/link";

type Props = {
    isAuthenticated: boolean;
    existingReview?: { id: string; rating: number; comment: string | null } | null;
    onSubmit: (data: { rating: number; comment: string | null }) => Promise<{ success: boolean; error?: string }>;
};

export function ReviewForm({ isAuthenticated, existingReview, onSubmit }: Props) {
    const [rating, setRating] = useState(existingReview?.rating ?? 0);
    const [comment, setComment] = useState(existingReview?.comment ?? "");
    const [isPending, startTransition] = useTransition();

    if (!isAuthenticated) {
        return (
            <p className="text-sm text-muted-foreground">
                <Link href="/auth/signin" className="underline hover:text-foreground">
                    Einloggen
                </Link>{" "}
                um eine Bewertung zu hinterlassen.
            </p>
        );
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (rating === 0 && !comment.trim()) {
            toast.error("Bitte gib mindestens eine Sternbewertung oder einen Kommentar an.");
            return;
        }
        startTransition(async () => {
            const result = await onSubmit({ rating, comment: comment.trim() || null });
            if (result.success) {
                toast.success(existingReview ? "Bewertung aktualisiert." : "Bewertung gespeichert.");
            } else {
                toast.error(result.error ?? "Fehler beim Speichern.");
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
                <p className="text-sm font-medium">Deine Bewertung</p>
                <div className="text-yellow-400">
                    <StarRating value={rating} onChange={setRating} size="lg" />
                </div>
            </div>
            <Textarea
                placeholder="Kommentar (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                maxLength={1000}
                className="resize-none"
            />
            <Button type="submit" disabled={isPending} size="sm">
                {isPending
                    ? "Wird gespeichert…"
                    : existingReview
                      ? "Bewertung aktualisieren"
                      : "Bewertung abschicken"}
            </Button>
        </form>
    );
}
