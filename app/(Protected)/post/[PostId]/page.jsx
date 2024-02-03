"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, BarChart2Icon, HeartIcon, MessageCircle, MoreHorizontal, Podcast, ShareIcon} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const FullPost = () => {
    const pathname = usePathname();
    const postId = pathname.split("/")[2];
    const[postData,setPostData] = useState()
    const[postComments ,setPostComments] = useState([]);
    const {user} = useUser();


    useEffect(()=>{
        async function getPostData(){
            try {
                const res = await fetch("/api/user/getPost",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({postId:postId})
                });
                const data = await res.json();
                setPostData(data.res);
                console.log(data.res)
                
                const res1 = await fetch("/api/user/getComments",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({postId:postId})
                });
                const data1 = await res1.json();
                console.log(data1.res1)
                setPostComments(data1.res1);
            } catch (error) {
                console.log(error)
            }
        }
        getPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return ( 
        <div className="flex justify-start min-h-screen sm:ml-24 md:ml-60 lg:ml-60 mr-0 w-full">
            <div className="w-full border border-gray-800 p-4">
                <div className="flex flex-col">
                        {/* head part */}
                    <div>
                        <div className="text-white flex gap-4 items-center">
                            <ArrowLeft className="cursor-pointer" onClick={() => window.history.back()} />
                            <h2 className="font-bold text-lg">Post</h2>
                        </div>
                    </div>
                        {/* Content */}
                    <div className="mt-4">
                        <div className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-2">
                                <Avatar className="md:ml-0 cursor-pointer">
                                <AvatarImage src={postData?.profilePic} />
                                <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                
                                <p className="text-white font-bold">Deepanshu</p>
                            </div>
                            <div className="text-white cursor-pointer">
                                {
                                    user && (
                                        postData?.userId === user.id && (
                                            <MoreHorizontal />
                                        )
                                    )
                                }
                            </div>
                        </div>
                        <div className="p-3 flex flex-col gap-2 border-b border-gray-800">
                            <p className="text-white">{postData?.input}</p>
                            <p className="text-muted-foreground">10-12-2024</p>
                        </div>
                        <div className="w-full p-4">
                            {
                                postData?.imageUrl && (
                                    <Image className="w-full" src={postData?.imageUrl} width={500} height={500} alt="post image"/>
                                )
                            }
                        </div>
                        {/* Icons */}
                        <div className=" mt-2 p-1 border-b border-gray-800">
                            <div className="mb-2 flex items-center justify-between text-muted-foreground">
                            <div className="flex gap-2">
                            <MessageCircle />
                            <p>{postData?.comment}</p>
                            </div>
                            <HeartIcon />
                            <ShareIcon className="cursor-pointer"/>   
                            <BarChart2Icon className="cursor-pointer"/>  
                            </div>
                        </div>
                        {/* Comments */}
                    <div className="text-white p-4 ">
                        {
                            postComments && (
                                postComments.map((comment) =>(
                                    <div key={comment._id} className="flex gap-4 mt-8 border-b border-gray-800">
                                        <div>
                                            <Avatar className="md:ml-0 cursor-pointer">
                                            <AvatarImage src={comment.profilePic} />
                                            <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="flex flex-col  w-full mb-4">
                                            <div className="flex items-center justify-between w-full ">
                                                <div className="flex text-muted-foreground gap-2">
                                                    <p className="hover:text-white cursor-pointer">{comment.name}</p>
                                                    <p>20-10-2024</p>
                                                </div>
                                                <div>
                                                    <MoreHorizontal />
                                                </div>
                                            </div>


                                            <div>
                                                <p>{comment.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
     );
}
 
export default FullPost;