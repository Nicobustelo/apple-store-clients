import getCategory from "@/actions/get-category";
import getSubcategories from "@/actions/get-subcategories";
import getProducts from "@/actions/get-products";
import Container from "@/components/ui/Container";
import Billboard from "@/components/Billboard";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/ProductCard";

import Filter from "./components/Filter";
import MobileFilters from "./components/MobileFilters";
import CategoryPageComponent from "./CategoryPageComponent";

export const revalidate = 0;

interface CategoryPageProps {
    params: {
        categoryId: string;
    };
    searchParams: {
        [key: string]: string;
    }
}

interface Subcategory {
    id: string;
    name: string;
    values: { id: string; value: string }[];
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
    params,
    searchParams
}) => {
    const products = await getProducts({
        categoryId: params.categoryId,
        ...searchParams
    });
    const subcategoriesData = await getSubcategories(params.categoryId);
    const subcategories: Subcategory[] = Array.isArray(subcategoriesData) ? subcategoriesData : [subcategoriesData];
    const category = await getCategory(params.categoryId);

    console.log("products: ");
    console.log(products);

    return (
        <CategoryPageComponent
            category={category}
            products={products}
            subcategories={subcategories}
        />
    );
}
 
export default CategoryPage;