import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (id: string): Promise<Billboard> => {
   console.log("getBillboard() called");
    console.log("id from getBillboard():", id);

    const res = await fetch(`${URL}/${id}`);

    const data = await res.json();

    console.log("data from getBillboard():", data);
    
    return data;
}

export default getBillboard;