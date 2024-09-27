import qs from "query-string";
import { Product } from "@/types";

interface Query {
    categoryId?: string;
    isFeatured?: boolean;
    storeId: string;
}

const getProducts = async (query: Query): Promise<Product[]> => {
    
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/${query.storeId}/products`;

    console.log("URL where i GET products:", URL);

    const url = qs.stringifyUrl({
        url: URL,
        query: {
            categoryId: query.categoryId,
            isFeatured: query.isFeatured
        }
    })

    console.log("URL where i GET productsa after filters:", URL);

    console.log("getProducts() called");
    console.log("url from getProducts:", url);

    const res = await fetch(url);

    const data = await res.json();

    console.log("getProducts() data:");
    
    return data;
}

export default getProducts;