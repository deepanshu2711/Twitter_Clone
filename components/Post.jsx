import { BarChart2Icon, CloudCog, CloudIcon, HeartIcon, LucideTextSelection, MessageCircle, MoreHorizontal, ReplyIcon, ShareIcon, Text, TextSelectIcon, TrashIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";

const Post = ({name,avatar,img,text,timestamp}) => {
    const time = new Date(timestamp);
    return ( 
        <div className="text-white flex gap-4 md:gap-10 w-full mt-2 mb-4 border-b border-gray-800">
            <div>
                <Avatar className="md:ml-0 cursor-pointer">
                <AvatarImage src={avatar} />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">   
                        {/* Name and username */}
                        <p className="font-bold hover:underline cursor-pointer">{name}</p>
                        {/* <p className="text-muted-foreground cursor-pointer">@{username}</p> */}
                        <p className="text-muted-foreground">{time.toISOString().slice(0, 10)}</p>
                    </div>
                    <div>
                        {/* Icon */}
                        <MoreHorizontal className="cursor-pointer" />
                    </div>
                </div>
                <div className="mt-2 mb-2 text-sm md:text-base">
                    {/* Text */}
                    <p>{text}</p>
                </div>
                <div className="">
                    {/* Post Image */}
                    {
                        img &&(
                            <Image className="rounded-2xl w-full max-h-[500px] object-cover"  src={img} width={300} height={300}   alt="postimage" />
                        )
                    }
                    
                </div>
                <div className="flex mt-8 items-center justify-between mb-4">
                {/* Icons */}
                    <MessageCircle className="cursor-pointer hover:text-blue-500" />
                    <TrashIcon className="cursor-pointer"/>
                    <HeartIcon className="cursor-pointer hover:text-red-500"/>
                    <ShareIcon className="cursor-pointer"/>   
                    <BarChart2Icon className="cursor-pointer"/>            
                </div>
            </div>
        </div>
     );
}
 
export default Post;