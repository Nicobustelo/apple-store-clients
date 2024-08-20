import Link from "next/link";

import Container from "@/components/ui/Container";
import MainNav from "@/components/MainNav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/NavbarActions";

// Disables cache, so every change in categories will be reflected immediately 
export const revalidate = 0;

const Navbar = async () => {
    const categories = await getCategories().then(categories => {
        console.log(categories);
        return categories;
    }).catch(error => {
        console.error('Error fetching categories:', error);
        return [];
    });
    
    return ( 
        <div className="border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                    <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                        <p className="font-bold text-xl">Molina Store</p>
                    </Link>
                    <MainNav data={categories} />
                    <NavbarActions />
                </div>
            </Container>
        </div>
     );
}
 
export default Navbar;