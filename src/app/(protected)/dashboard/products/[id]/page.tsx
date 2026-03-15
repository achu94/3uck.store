// src/app/(protected)/dashboard/products/[id]/page.tsx
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
        .select("*")
        .eq("id", id)
        .single();

    if (!product) {
        notFound();
    }

    return <CreateProduct initialProduct={product} />;
}
