import Link from "next/link";

import Container from "@/components/ui/Container";
import MainNav from "@/components/MainNav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/NavbarActions";
import getStore from "@/actions/get-store";

// Disables cache, so every change in categories will be reflected immediately 
export const revalidate = 0;

interface NavbarProps {
    params: {
        storeId: string;
    }
}

const Navbar:React.FC<NavbarProps> = async ({
    params
}) => {
    const categories = await getCategories(params.storeId).then(categories => {
        console.log(categories);
        return categories;
    }).catch(error => {
        console.error('Error fetching categories:', error);
        return [];
    });

    const store = await getStore(params.storeId).then(store => {
        console.log(store);
        return store;
    }).catch(error => {
        console.error('Error fetching store:', error);
        return {
            name: 'Store'
        };
    });
    
    return ( 
        <div className="border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                    <Link href="/" className="ml-0 flex gap-x-2">
                        <p className="font-bold text-xl">{store?.name || 'Store'}</p>
                    </Link>
                    <MainNav data={categories} />
                    <NavbarActions />
                </div>
            </Container>
        </div>
     );
}
 
export default Navbar;