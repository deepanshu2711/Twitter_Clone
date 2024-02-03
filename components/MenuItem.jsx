"use client"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
const MenuItem = ({icon:Icon,lable,href}) => {
    const pathname = usePathname();
    const router = useRouter();
    return ( 
        <div onClick={() => router.push(href)} className={` font-bold text-xl mt-1 flex gap-5 text-white w-full items-center  px-4 hover:bg-slate-900 p-3
        rounded-full cursor-pointer ${pathname===href && "bg-slate-900 font-extrabold"}
        `}>
            <Icon />
            <p className="hidden md:inline-flex">{lable}</p>
        </div>
     );
}
 
export default MenuItem;