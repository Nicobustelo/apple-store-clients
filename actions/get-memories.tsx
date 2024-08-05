import { Memory } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/memories`;

const getMemories = async (): Promise<Memory[]> => {
    const res = await fetch(URL);

    const data = res.json();
    
    return data;
}

export default getMemories;