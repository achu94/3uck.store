"use server";

import type { Store } from "@/types/db";
import { StoreManager } from "@/app/components/protected/store/StoreManager";
import { getStore } from "@/actions/store/get-store";
import { getCategories } from "@/actions/category/get-category";
import { getProducts } from "@/actions/products/get-products";
import { getStoreReviews } from "@/actions/reviews/get-store-reviews";

export default async function Page() {
    const store: Store | null = await getStore();

    if (!store) {
        return <StoreManager store={null} categories={[]} products={[]} reviews={[]} />;
    }

    const [categories, products, reviews] = await Promise.all([
        getCategories(),
        getProducts(),
        getStoreReviews(store.id),
    ]);

    return (
        <StoreManager
            store={store}
            categories={categories ?? []}
            products={products ?? []}
            reviews={reviews}
        />
    );
}
