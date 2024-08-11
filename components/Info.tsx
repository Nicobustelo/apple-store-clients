"use client"

import { ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import Currency from "@/components/ui/Currency";
import Button from "@/components/ui/Button";

interface InfoProps {
    data: Product;
}

interface SubcategoryValue {
    id: string;
    name: string;
    values: { id: string; value: string }[];
}

const Info: React.FC<InfoProps> = ({
    data
}) => {
    const subcategories: SubcategoryValue[] = JSON.parse(data.subcategoryValueIds.toString());

    return ( 
        <div>
            <h1 className="text-3xl font-bold text-gray-900">
                {data.name}
            </h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price} />
                </p>
            </div>
            <hr className="my-4"/>
            <div className="flex flex-col gap-y-6">
                {subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="flex items-center gap-x-4">
                        <h3 className="font-semibold text-black">
                            {subcategory.name}:
                        </h3>
                        <div>
                            {subcategory.values.map((value) => value.value).join(", ")}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <Button className="flex items-center gap-x-2">
                    Comprar
                    <ShoppingCart />
                </Button>
            </div>
        </div>
     );
}
 
export default Info;