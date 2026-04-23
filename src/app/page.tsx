import { Suspense } from "react";
import { PublicNavbar } from "@/app/components/public/PublicNavbar";
import { StorefrontSearch } from "@/app/components/public/StorefrontSearch";
import { MarketplaceProductCard } from "@/app/components/public/MarketplaceProductCard";
import { getAllPublicProducts } from "@/actions/products/get-all-public-products";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Package } from "lucide-react";

export const revalidate = 60;

async function StorefrontContent({ search }: { search?: string }) {
    const isSearching = Boolean(search?.trim());

    const [available, topItems] = await Promise.all([
        getAllPublicProducts({ search, sortBy: "newest" }),
        isSearching ? Promise.resolve([]) : getAllPublicProducts({ sortBy: "bestseller", limit: 8 }),
    ]);

    return (
        <div className="space-y-12">
            {!isSearching && topItems.length > 0 && (
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-semibold">Top Items</h2>
                    </div>
                    <Separator className="mb-6" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {topItems.map((product) => (
                            <MarketplaceProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            )}

            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Package className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">
                        {isSearching ? `Suchergebnisse für „${search}"` : "Verfügbare Items"}
                    </h2>
                    {available.length > 0 && (
                        <span className="text-sm text-muted-foreground ml-auto">
                            {available.length} {available.length === 1 ? "Produkt" : "Produkte"}
                        </span>
                    )}
                </div>
                <Separator className="mb-6" />

                {available.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-lg">
                            {isSearching ? "Keine Produkte gefunden." : "Noch keine Produkte vorhanden."}
                        </p>
                        <p className="text-sm mt-1">Schau bald wieder vorbei.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {available.map((product) => (
                            <MarketplaceProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;

    return (
        <div className="min-h-screen">
            <PublicNavbar />

            <main className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="mb-8 flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Entdecke 3D-Produkte</h1>
                    <Suspense>
                        <StorefrontSearch defaultValue={q} />
                    </Suspense>
                </div>

                <Suspense
                    fallback={
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="aspect-square rounded-lg bg-muted animate-pulse" />
                            ))}
                        </div>
                    }
                >
                    <StorefrontContent search={q} />
                </Suspense>
            </main>
        </div>
    );
}
