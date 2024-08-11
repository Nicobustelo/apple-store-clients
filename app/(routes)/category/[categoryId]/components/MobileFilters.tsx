"use client"

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Dialog } from "@headlessui/react";

import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";

import Filter from "./Filter";

interface Subcategory {
    id: string;
    name: string;
    values: { id: string; value: string }[];
}

interface MobileFiltersProps {
    subcategories: Subcategory[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
    subcategories
}) => {
    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return ( 
        <>
            <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
                Filtros
                <Plus size={20} />
            </Button>

            <Dialog open={open} as="div" className="relative z-40 lg:hidden" onClose={onClose}>
                {/* Background */}
                <div className="fixed inset-0 bg-black bg-opacity-25" />

                {/* Dialog Position */}
                <div className="fixed inset-0 z-40 flex">
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                        {/* Close Button */}
                        <div className="flex items-center justify-end px-4">
                            <IconButton icon={<X size={15}/>} onClick={onClose}/>
                        </div>

                        {/* Render  Filters */}
                        <div className="p-4">
                            {subcategories.map((subcategory) => (
                                <Filter 
                                    key={subcategory.id}
                                    valueKey={subcategory.id}
                                    name={subcategory.name}
                                    data={subcategory.values}
                                />
                            ))}
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
     );
}
 
export default MobileFilters;