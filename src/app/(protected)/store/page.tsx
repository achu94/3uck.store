"use server";

import type { Store } from "@/types/db";
import { StoreManager } from "@/app/components/protected/store/StoreManager";
import { getStore } from "@/actions/store/get-store";

export default async function Page() {
    const store: Store = await getStore();

    return <StoreManager store={store} />;
}
