import { Billboard } from "@/types";

const getBillboard = async (id: string): Promise<Billboard> => {
    console.log("getBillboard() called");
    console.log("id from getBillboard():", id);

    const URL = `${process.env.NEXT_PUBLIC_API_URL}/${id}/billboards`;

    console.log("URL where i GET getBillboard():", URL);

    const res = await fetch(`${URL}`);

    const data = await res.json();

    console.log("data from getBillboard():", data);
    
    return data;
}

export default getBillboard;