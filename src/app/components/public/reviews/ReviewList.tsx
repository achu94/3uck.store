import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { StarDisplay } from "./StarRating";
import type { ReviewWithUser } from "@/actions/reviews/get-product-reviews";

type Props = {
    reviews: ReviewWithUser[];
};

export function ReviewList({ reviews }: Props) {
    if (reviews.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">Noch keine Bewertungen.</p>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review, i) => (
                <div key={review.id}>
                    {i > 0 && <Separator className="mb-4" />}
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted overflow-hidden shrink-0">
                            {review.user?.image ? (
                                <Image
                                    src={review.user.image}
                                    alt={review.user.name ?? "User"}
                                    width={32}
                                    height={32}
                                    className="object-cover w-full h-full"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-muted-foreground">
                                    {review.user?.name?.[0]?.toUpperCase() ?? "?"}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium">
                                    {review.user?.name ?? "Anonym"}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {new Date(review.created_at).toLocaleDateString("de-DE", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                            {review.rating > 0 && (
                                <div className="text-yellow-400">
                                    <StarDisplay value={review.rating} />
                                </div>
                            )}
                            {review.comment && (
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {review.comment}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
