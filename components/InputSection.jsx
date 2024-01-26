"use client"
import { ImageIcon, SmileIcon } from "lucide-react";
import { Button } from "./ui/button";
import { UserButton, useAuth } from "@clerk/nextjs";

const InputSection = () => {
    const { userId } = useAuth();
    return ( 
        <>
        {
            userId &&(
                <div className="flex w-full gap-4 md:gap-10 border-b border-gray-800 p-4">
            <div >
                {/* <Avatar className="md:ml-0 cursor-pointer">
                <AvatarImage src="/1.png" />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar> */}
                <UserButton afterSignOutUrl="/"/>
            </div>
            <div className="w-full flex flex-col">
                <div className="w-full ">
                    <textarea rows={2} className="bg-transparent text-white min-w-full focus-within:outline-none" placeholder="What is happening ?!" />
                </div>
                <div className="flex justify-between items-center mb-4 mt-6 border-t border-y-gray-800">
                    <div className="text-blue-500 flex gap-3">
                    <ImageIcon className="cursor-pointer" />
                    <SmileIcon className="cursor-pointer" />
                    </div>
                    <Button className ="rounded-full p-5 bg-blue-500 mt-4">Post</Button>
                </div>
            </div>
        </div>
            )
        }
            
        </>
     );
}
 
export default InputSection;