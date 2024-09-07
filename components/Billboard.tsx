import {Billboard as BillboardType} from "@/types";

interface BillboardProps {
    data: BillboardType;
}

const Billboard:React.FC<BillboardProps> = ({
    data
}) => {
    return ( 
        <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
            <div
                className="rounded-xl relative aspect-video md:aspect-[3.5/1] overflow-hidden bg-cover bg-center h-full w-auto"
                style={{backgroundImage: `url(${data?.imageUrl})`}}
            >
                <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                    <div className="relative px-0 py-2 sm:px-2 sm:py-4 lg:px-8 lg:py-6 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-lg shadow-black shadow-2xl">
                        <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs ">
                            {data.label}
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Billboard;