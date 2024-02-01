"use client"
import { BarChart2Icon, HeartIcon, MessageCircle, MoreHorizontal, ShareIcon, TrashIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";


const Post = ({name,avatar,img,text,timestamp,postId,likesArray,userid,comments}) => {
    const time = new Date(timestamp);
    const[UniqueLikesArray,setUniqueLikesArray] = useState([]);
    const[liked,setLiked] = useState(false);
    const {user} = useUser();
    const router = useRouter();
    const[dataLike,setDataLike] = useState(likesArray);
    const[comment,setComment] = useState(false);

    useEffect(() => {
        // Remove duplicate values from likesArray using Set
        const uniqueLikesArray = [...new Set(likesArray)];
        // Update state with uniqueLikesArray
        setUniqueLikesArray(uniqueLikesArray);
    }, [likesArray]);
    

    useEffect(() => {
        handleLike()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [liked]);
    

    async function handleLike(){
         console.log(liked);
        try {
            const res = await fetch("api/user/like",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({userId:user && user.id,postId:postId,like:liked})
            },{
                cache:"no-store"
            })
            const data = await res.json();
            setDataLike(data.post.likes)

        } catch (error) {
            console.log(error)
        }
    }

    async function handleDelete() {
        try {
            const res = await fetch("/api/user/delete",{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({userId:user.id,postId:postId})
            })
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }


    async function handleCommentClick(){
        try {
            await fetch("/api/user/comment",{
                method:"POST",
                heafers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({userId:user&&user.id,postId:postId,comment:comment,name:user && user.firstName,profilePic:user && user.imageUrl})
            })
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    

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
                        {
                            user && user.id === userid && (
                                <DropdownMenu className="cursor-pointer bg-black">
                                <DropdownMenuTrigger>
                                <MoreHorizontal className="cursor-pointer" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-black">
                                <DropdownMenuLabel className="text-white text-muted">My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="hover:bg-slate-900 text-muted">
                                <div onClick={handleDelete} className="flex justify-between w-full font-bold cursor-pointer items-center  text-red-600">
                                <p className="">Delete</p>
                                <TrashIcon className="" />
                                </div>
                                </DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            )
                        }
                        
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
                    <div className="flex gap-2 items-center">
                    <Dialog>
                    <DialogTrigger>
                    <MessageCircle  className="cursor-pointer hover:text-blue-500" />
                    </DialogTrigger>
                    <DialogContent className="bg-black">
                    <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                            <Avatar className="md:ml-0 cursor-pointer">
                            <AvatarImage src={avatar} />
                            <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            </div>
                            <div className="text-white text-sm ml-4 flex flex-col">
                                <div className="text-muted-foreground flex gap-2 text-sm">
                                    <p>{name}</p>
                                    <p>{time.toISOString().slice(0, 10)}</p>
                                </div>
                                <p>{text}</p>
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                    <div className="mt-8 flex items-start justify-between gap-8">
                        <div>
                        <Avatar className="md:ml-0 cursor-pointer">
                            <AvatarImage src={user && (user.imageUrl)} />
                            <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="w-full">
                           <p className="text-muted-foreground text-sm mb-1">Replying to {user && user.firstName}</p>
                            <textarea onChange={(e) =>setComment(e.target.value)}  name="comment"  rows={4} className="bg-transparent text-white min-w-full focus-within:outline-none" placeholder="Post yout reply" />
                        </div>
                        
                    </div>
                        <div className="w-full flex items-center justify-end">
                            <Button disabled={!comment} onClick={handleCommentClick} className="rounded-full p-5 bg-blue-500 mt-4">Reply</Button>
                        </div>
                    </DialogDescription>
                    </DialogHeader>
                    </DialogContent>
                    </Dialog>
                    <p>{comments}</p>
                    </div>
                    <TrashIcon className="cursor-pointer"/>
                    <div className={`flex gap-2 ${user && UniqueLikesArray.find((id) => id === user.id) ? "text-red-500" : "" }`}>
                    <HeartIcon className={`cursor-pointer hover:text-red-500 `} onClick={() => setLiked(!liked)}/>
                    <p className="text-sm text-gray-500">{dataLike.length}</p>
                    </div>
                    <ShareIcon className="cursor-pointer"/>   
                    <BarChart2Icon className="cursor-pointer"/>            
                </div>
            </div>
        </div>
     );
}
 
export default Post;