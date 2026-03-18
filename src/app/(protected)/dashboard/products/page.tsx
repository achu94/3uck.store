import { getProducts, GetProductsResult } from "@/actions/products/get-products";
import { ProductList } from "@/app/components/protected/products/ProductList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
    const products:GetProductsResult = await getProducts();

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Products</h1>
                <Button asChild>
                    <Link href="/dashboard/products/new">Create new product</Link>
                </Button>
            </div>
            <ProductList products={products} />
        </div>
    );
}
