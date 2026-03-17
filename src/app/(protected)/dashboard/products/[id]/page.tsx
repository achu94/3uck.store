import { supabaseServer } from "@/lib/supabaseServer";
import { CreateProduct } from "@/app/components/protected/products/CreateProduct/CreateProduct";
import { notFound } from "next/navigation";

export default async function EditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const supabase = supabaseServer();
    const { data: product } = await supabase
        .from("products")
        .select(
            `
            *,
            product_images (*)
        `,
        )
        .eq("id", id)
        .order("sort_order", {
            referencedTable: "product_images",
            ascending: true,
        })
        .single();

    if (!product) {
        notFound();
    }

    return <CreateProduct initialProduct={product} />;
}
