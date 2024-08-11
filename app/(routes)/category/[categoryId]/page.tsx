import getCategory from "@/actions/get-category";
import getSubcategories from "@/actions/get-subcategories";
import getProducts from "@/actions/get-products";
import Container from "@/components/ui/Container";
import Billboard from "@/components/Billboard";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/ProductCard";

import Filter from "./components/Filter";
import MobileFilters from "./components/MobileFilters";

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

    return ( 
        <div className="bg-white">
            <Container>
                <Billboard 
                    data={category.billboard}
                />
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <MobileFilters subcategories={subcategories} />
                        <div className="hidden lg:block">
                            {subcategories.map((subcategory) => (
                                <Filter 
                                    key={subcategory.id}
                                    valueKey={subcategory.id}
                                    name={subcategory.name}
                                    data={subcategory.values}
                                />
                            ))}
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((item) => (
                                    <ProductCard 
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
     );
}
 
export default CategoryPage;