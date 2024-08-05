import { Model } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/models`;

const getModels = async (): Promise<Model[]> => {
    const res = await fetch(URL);

    const data = res.json();
    
    return data;
}

export default getModels;