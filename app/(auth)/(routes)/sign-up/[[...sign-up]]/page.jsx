import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
 
export default function Page() {
  return  (
    <div className="flex justify-center gap-32  items-center h-screen w-screen">
    <div className="hidden lg:inline-flex">
      <Image src={"/XLogo3.jpg"} width={400} height={400} alt="xlogo" />
    </div>
    <div className="flex flex-col">
    <div className="flex- flex-col mr-4">
    <h1 className="text-white font-extrabold text-center text-3xl md:text-4xl lg:text-6xl mb-4">Happening now</h1>
    <h3 className="text-white  mb-4 text-center text-lg md:text-xl font-bold  lg:text-3xl">Join today.</h3>
    </div>
    <div className="">
    <SignUp  />
    </div>
    </div>
    </div>
  );
  
}