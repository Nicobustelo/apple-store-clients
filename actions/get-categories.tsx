import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
    console.log("getCategories() called");

    const res = await fetch(URL);

    const data = await res.json();
    
    console.log("getCategories() data:");
    console.log(data);

    return data;
}

export default getCategories;