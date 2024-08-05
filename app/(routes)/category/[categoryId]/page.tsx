import getCategory from "@/actions/get-category";
import getModels from "@/actions/get-models";
import getMemories from "@/actions/get-memories";
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
        modelId: string,
        memoryId: string,
    }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
    params,
    searchParams
}) => {
    const products = await getProducts({
        categoryId: params.categoryId,
        modelId: searchParams.modelId,
        memoryId: searchParams.memoryId
    })
    const models = await getModels();
    const memories = await getMemories();
    const category = await getCategory(params.categoryId);

    return ( 
        <div className="bg-white">
            <Container>
                <Billboard 
                    data={category.billboard}
                />
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <MobileFilters models={models} memories={memories}/>
                        <div className="hidden lg:block">
                            <Filter 
                                valueKey="modelId"
                                name="Model"
                                data={models}
                            />
                            <Filter 
                                valueKey="memoryId"
                                name="Memory"
                                data={memories}
                            />
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