import qs from "query-string";
import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    categoryId?: string;
    // modelId?: string;
    // memoryId?: string;
    isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            // modelId: query.modelId,
            // memoryId: query.memoryId,
            categoryId: query.categoryId,
            isFeatured: query.isFeatured,
        }
    })

    const res = await fetch(url);

    const data = res.json();
    
    return data;
}

export default getProducts;