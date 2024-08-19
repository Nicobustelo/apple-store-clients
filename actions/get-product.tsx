import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product> => {
    console.log("getProduct() called");
    console.log("id from getProduct():", id);
    console.log("URL from getProduct():", `${URL}/${id}`);

    const res = await fetch(`${URL}/${id}`);

    // if (!res.ok) {
    //     throw new Error("Failed to fetch product");
    // }

    const data = await res.json();

    console.log("data from getProduct():", data);
    
    return data;
}

export default getProduct;