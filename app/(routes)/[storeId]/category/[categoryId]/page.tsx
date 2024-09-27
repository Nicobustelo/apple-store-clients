import getCategory from "@/actions/get-category";
import getSubcategories from "@/actions/get-subcategories";
import getProducts from "@/actions/get-products";
import CategoryPageComponent from "./CategoryPageComponent";

export const revalidate = 0;

interface CategoryPageProps {
    params: {
        storeId: string;
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
        ...searchParams,
        storeId: params.storeId
    });
    const subcategoriesData = await getSubcategories(params.storeId ,params.categoryId);
    const subcategories: Subcategory[] = Array.isArray(subcategoriesData) ? subcategoriesData : [subcategoriesData];
    const category = await getCategory(params.storeId, params.categoryId);

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