import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { MarketplaceProduct } from "@/actions/products/get-all-public-products";

const formatEur = (value: number) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);

export function MarketplaceProductCard({ product }: { product: MarketplaceProduct }) {
    return (
        <Link
            href={`/${product.store_slug}/product/${product.slug}`}
            className="group"
        >
            <Card className="overflow-hidden transition-shadow hover:shadow-md">
                <div className="aspect-square relative bg-muted">
                    <Image
                        src={
                            product.main_image_url
                                ? `${process.env.NEXT_PUBLIC_ITEMS_ASSET_URL}/${product.main_image_url}`
                                : "/images/placeholder.png"
                        }
                        alt={product.title}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
                <CardContent className="p-3 space-y-1">
                    <p className="text-sm font-medium leading-tight line-clamp-2 group-hover:underline">
                        {product.title}
                    </p>
                    <p className="text-sm font-semibold">{formatEur(product.price)}</p>
                </CardContent>
            </Card>
        </Link>
    );
}
