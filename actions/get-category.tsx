import { Category } from "@/types";

const getCategory = async (storeId: string, id: string): Promise<Category> => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/${storeId}/categories`;

    const res = await fetch(`${URL}/${id}`);

    const data = res.json();

    return data;
}

export default getCategory;