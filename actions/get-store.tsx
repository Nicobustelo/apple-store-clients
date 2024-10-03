import { Store } from "@/types";

const getStore = async (storeId: string): Promise<Store | null> => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/stores/${storeId}`;

    const res = await fetch(URL);

    const data = res.json();

    return data;
}

export default getStore;