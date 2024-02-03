"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Post from "@/components/Post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const Profile = () => {
    const router = useRouter();
    const[activePosts,setActivePosts] = useState(true);
    const[activeReplies,setActiveReplies] = useState(false);
    const {user} = useUser();
    const[userPostData,setUserPostData] = useState([]);
    const [userRepliesData,setUserRepliesData] = useState([]);


    useEffect(()=>{
        const getUserPosts =async()=>{
            const res = await fetch("/api/user/userPosts",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({userId:user?.id}),
            });
            const data = await res.json();
            console.log(data.responseData.posts)
            console.log(data.responseData.comments)
            setUserPostData(data.responseData.posts);
            setUserRepliesData(data.responseData.comments)
        }
        getUserPosts();
    },[user?.id])

    return ( 
        <div className="flex justify-start min-h-screen sm:ml-24 md:ml-60 lg:ml-60 mr-0 w-full">
            <div className="w-full border border-gray-800 p-4">
                {/* header */}
                <div>
                    <div className="flex gap-8 items-center">
                        <div className="text-white font-bold" onClick={() => router.push("/")}>
                            <ArrowLeft />
                        </div>
                        <div className="flex flex-col ">
                            <p className="text-white font-medium  md:text-lg lg:text-xl">{user?.firstName}</p>
                            <p className="text-muted-foreground text-sm">{userPostData.length} Posts</p>
                        </div>
                    </div>
                </div>
                {/* Profile-BG */}
                <div className="w-full">
                    <Image src={"/profile_bg.jpg"} className="w-full h-[350px]" width={500} height={500} alt="profile background" />
                </div>
                {/* Profile Pic */}
                <div className="w-full flex justify-between p-2">
                    <Image src={"/profile.jpg"} className="rounded-full mt-[-80px] border-4 border-black" height={150} width={150} alt="profile pic" />
                    <Button className="rounded-full mt-5 border bg-transparent" >Edit Profile</Button>
                </div>
                {/* Profile Details */}
                <div>
                    <div className="flex flex-col ml-4">
                        <h2 className="text-white font-semibold text-xl">{user?.firstName} {user?.lastName}</h2>
                    </div>
                </div>
                {/* posts and Replies */}
                <div className="mt-8 border-b">
                    <div className="text-muted-foreground font-semibold flex items-center justify-around mb-4">
                        <p className={`cursor-pointer hover:text-white ${activePosts ? "text-white border-b-4 border-blue-500" : ""} `} onClick={() => {setActivePosts(true); setActiveReplies(false);}}>
                        Posts
                        </p>
                        <p className={`cursor-pointer hover:text-white ${activeReplies ? "text-white border-b-4 border-blue-500" : ""} `} onClick={() => {setActiveReplies(true); setActivePosts(false);}}>
                        Replies
                        </p>
                    </div>
                </div>
                {/* Posts */}
                <div className="p-2">
                {
                    userPostData && activePosts && (
                        userPostData.map((post) =>(
                            <div key={post._id}>
                                <Post
                                name={post.name}
                                avatar={post.profilePic}
                                img={post.imageUrl}
                                text={post.input}
                                timestamp={post.createdAt}
                                postId ={post._id}
                                likesArray={post.likes}
                                userid={post.userId}
                                comments={post.comment}
                                 />
                            </div>
                        ))
                    )
                }
                </div>
                {/* Replies */}
                <div className="text-white p-4 flex flex-col gap-6  ">
                    {
                        userRepliesData && activeReplies &&(
                            userRepliesData.map((reply) =>(
                                <div key={reply._id} className="flex gap-4 border-b border-gray-800">
                                        <div>
                                            <Avatar className="md:ml-0 cursor-pointer">
                                            <AvatarImage src={reply.profilePic} />
                                            <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="flex flex-col  w-full mb-4">
                                            <div className="flex items-center justify-between w-full ">
                                                <div className="flex text-muted-foreground gap-2">
                                                    <p className="hover:text-white cursor-pointer">{reply.name}</p>
                                                    <p>20-10-2024</p>
                                                </div>
                                                <div>
                                                    <MoreHorizontal />
                                                </div>
                                            </div>


                                            <div>
                                                <p>{reply.comment}</p>
                                            </div>
                                        </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
     );
}
 
export default Profile;