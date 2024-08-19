import qs from "query-string";
import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    categoryId?: string;
    isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            categoryId: query.categoryId,
            isFeatured: query.isFeatured,
        }
    })

    console.log("getProducts() called");
    console.log("url from getProducts:", url);

    const res = await fetch(url);

    const data = await res.json();

    console.log("getProducts() data:");
    
    return data;
}

export default getProducts;