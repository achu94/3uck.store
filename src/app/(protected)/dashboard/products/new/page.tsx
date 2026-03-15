import { createEmptyDraft } from "@/actions/products/create-empty-draft";
import { redirect } from "next/navigation";

export default async function Page() {
    const initialProduct = await createEmptyDraft();

    redirect(`/dashboard/products/${initialProduct.id}`);
}
