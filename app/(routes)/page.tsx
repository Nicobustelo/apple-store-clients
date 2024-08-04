import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/Billboard";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/Container";

// Disables cache, so every change in categories will be reflected immediately 
export const revalidate = 0;

const HomePage = async () => {
    const products = await getProducts({ isFeatured: true });
    const billboard = await getBillboard("67f40afa-0aa4-4d8c-ac84-0070e1b73ff9")

    return ( 
        <div>
            <Container>
                <div className="space-y-10 pb-10">
                    <Billboard data={billboard} />
                    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                        <ProductList title="Featured Products" items={products} />
                    </div>
                </div>
            </Container>
        </div>
     )
}
 
export default HomePage;