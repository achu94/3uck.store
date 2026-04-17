import { auth } from "@/lib/auth";
import { getProductReviews } from "@/actions/reviews/get-product-reviews";
import { getUserProductReview } from "@/actions/reviews/get-user-review";
import { createProductReview } from "@/actions/reviews/create-product-review";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";
import { StarDisplay } from "./StarRating";
import { Separator } from "@/components/ui/separator";

type Props = {
    productId: string;
    storeSlug: string;
    productSlug: string;
    averageRating: number | null;
    reviewCount: number | null;
};

export async function ProductReviewSection({
    productId,
    storeSlug,
    productSlug,
    averageRating,
    reviewCount,
}: Props) {
    const session = await auth();
    const [reviews, existingReview] = await Promise.all([
        getProductReviews(productId),
        session?.user?.id ? getUserProductReview(productId) : Promise.resolve(null),
    ]);

    async function submitReview(data: { rating: number; comment: string | null }) {
        "use server";
        return createProductReview(productId, storeSlug, productSlug, data);
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Bewertungen
                </h2>
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
