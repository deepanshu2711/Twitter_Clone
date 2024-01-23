import { SearchIcon } from "lucide-react";

const Widgets = () => {
    return ( 
        <div className="text-white mt-2 flex flex-col ml-8 mr-4 border-b-black">
            <div className="sticky top-0">
                <div className="flex bg-slate-800 p-3 mt-2 rounded-full gap-4 focus-within:border focus-within:border-blue-500">
                    <SearchIcon className="cursor-pointer" />
                    <input type="text" placeholder="Search" className="bg-transparent focus:outline-none " />
                </div>
            </div>
        </div>
     );
}
 
export default Widgets;