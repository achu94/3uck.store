import { getStore } from "@/actions/store/get-store";
import { NewStore } from "@/app/components/protected/store/create/NewStore";
import { Store } from "@/types/db";
import { redirect } from "next/navigation";

export default async function Page() {
    const store: Store | null = await getStore();

    if (store) redirect("/store");

    return <NewStore />;
}
