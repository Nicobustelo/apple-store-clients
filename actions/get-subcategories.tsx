import { Subcategory } from "@/types";


const getSubcategory = async (storeId: string, id: string): Promise<Subcategory> => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/${storeId}/subcategories`;

    const res = await fetch(`${URL}/${id}`);

    const data = res.json();

    return data;
}

export default getSubcategory;