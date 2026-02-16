import { getCategories } from "@/actions/category/get-category";
import { Categories } from "@/app/components/protected/categories/Category";

export default async function Page() {
    const categories = await getCategories();

    return <Categories categories={categories} />;
}
