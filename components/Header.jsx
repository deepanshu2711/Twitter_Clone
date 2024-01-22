import { SparkleIcon, Sparkles } from "lucide-react";

const Header = () => {
    return ( 
        <div className="text-white border-b px-3 py-2 sticky top-0 z-50 border-gray-800 flex justify-between items-center mt-4 bg-black">
            <div className="text-lg sm:text-xl md:text-2xl font-bold cursor-pointer">Home</div>
            <div className="hover:bg-slate-900 cursor-pointer p-3 rounded-full"><Sparkles /></div>
        </div>
     );
}
 
export default Header;