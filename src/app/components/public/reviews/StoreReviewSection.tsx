import { auth } from "@/lib/auth";
import { getStoreReviews } from "@/actions/reviews/get-store-reviews";
import { getUserStoreReview } from "@/actions/reviews/get-user-review";
import { createStoreReview } from "@/actions/reviews/create-store-review";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";
import { StarDisplay } from "./StarRating";
import { Separator } from "@/components/ui/separator";

type Props = {
    storeId: number;
    storeSlug: string;
    averageRating: number | null;
    reviewCount: number | null;
};

export async function StoreReviewSection({
    storeId,
    storeSlug,
    averageRating,
    reviewCount,
}: Props) {
    const session = await auth();
    const [reviews, existingReview] = await Promise.all([
        getStoreReviews(storeId),
        session?.user?.id ? getUserStoreReview(storeId) : Promise.resolve(null),
    ]);

    async function submitReview(data: { rating: number; comment: string | null }) {
        "use server";
        return createStoreReview(storeId, storeSlug, data);
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-lg font-semibold">Bewertungen</h2>
                {(reviewCount ?? 0) > 0 ? (
                    <div className="text-yellow-400">
                        <StarDisplay value={averageRating} count={reviewCount} />
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">Noch keine Bewertungen</p>
                )}
            </div>

            <Separator />

            <div className="space-y-2">
                <h3 className="text-sm font-medium">
                    {existingReview ? "Deine Bewertung bearbeiten" : "Bewertung schreiben"}
                </h3>
                <ReviewForm
                    isAuthenticated={!!session?.user?.id}
                    existingReview={existingReview}
                    onSubmit={submitReview}
                />
            </div>

            {reviews.length > 0 && (
                <>
                    <Separator />
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Alle Bewertungen ({reviews.length})</h3>
                        <ReviewList reviews={reviews} />
                    </div>
                </>
            )}
        </div>
    );
}
