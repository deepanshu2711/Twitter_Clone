const MenuItem = ({icon:Icon,lable}) => {
    return ( 
        <div className=" font-bold text-xl mt-1 flex gap-5 text-white w-full items-center  px-4 hover:bg-slate-900 p-3
        rounded-full cursor-pointer
        ">
            <Icon />
            <p className="hidden md:inline-flex">{lable}</p>
        </div>
     );
}
 
export default MenuItem;