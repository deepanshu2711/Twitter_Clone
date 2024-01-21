import { ImageIcon, SmileIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const InputSection = () => {
    return ( 
        <div className="flex w-full gap-10 border-b border-gray-800">
            <div>
                <Avatar className="md:ml-0 cursor-pointer">
                <AvatarImage src="/1.png" />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar>
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
     );
}
 
export default InputSection;