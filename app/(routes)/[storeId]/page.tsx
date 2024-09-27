import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/Billboard";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/Container";

// Disables cache, so every change in categories will be reflected immediately 
export const revalidate = 0;

interface HomePageProps {
    params: {
        storeId: string;
    }
}

const HomePage:React.FC<HomePageProps> = async ({
    params
}) => {
    const storeId = params.storeId;

    const products = await getProducts({ isFeatured: true, storeId }).then(products => {
        console.log(products);
        return products;
    }).catch(error => {
        console.error('Error fetching products:', error);
        return [];
    });
    const billboard = await getBillboard(params.storeId).then(billboard => {
        console.log(billboard);
        return billboard;
    }).catch(error => {
        console.error('Error fetching billboard:', error);
        return {
            id: "",
            label: "",
            imageUrl: "",
        }
    });

    return ( 
        <div>
            <Container>
                <div className="space-y-10 pb-10">
                    <Billboard data={billboard} />
                    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                        <ProductList title="Productos Destacados" items={products} />
                    </div>
                </div>
            </Container>
        </div>
     )
}
 
export default HomePage;