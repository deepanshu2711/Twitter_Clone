"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Post from "@/components/Post";
import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IoCameraReverseOutline } from "react-icons/io5";
import { app } from "@/utils/Firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";





const Profile = () => {
    const[activePosts,setActivePosts] = useState(true);
    const[activeReplies,setActiveReplies] = useState(false);
    const {user} = useUser();
    const fileInputRef = useRef(null);
    const[userPostData,setUserPostData] = useState([]);
    const [userRepliesData,setUserRepliesData] = useState([]);
    const[isMounted,setIsMounted] = useState(false);
    const[bio,setbio] = useState("");
    const[file,setFile] = useState(undefined);
    const[profile_bg,setprofile_bg] = useState("");
    const[updatedUserData,setUpdatedUserData] = useState();
    const[preview,setPreview] = useState();
    const[updating,setupdating] = useState(false);


    const handleFileClick =(e) =>{
        fileInputRef.current.value = null; // Reset input value to trigger onChange
        fileInputRef.current.click();
    }


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
        const getUpdatedUser = async() =>{
            const res = await fetch("/api/user/getUser",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({userId:user?.id,bio:bio,profile_bg:profile_bg}),
            })
            const data = await res.json();
            console.log(data.userData)
            setUpdatedUserData(data.userData);
           } 
        getUpdatedUser();
        getUserPosts();
        setIsMounted(true)
    },[bio, profile_bg, user?.id])
    

    const updateUser = async() =>{
        try {
            setupdating(true);
            console.log(bio,profile_bg)
            const res = await fetch("/api/user/updatedUser",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({userId:user?.id,bio:bio,profile_bg:profile_bg}),
            })
            const data = await res.json();
            console.log(data)
            setUpdatedUserData(data.updatedUser);
            setupdating(false);
        } catch (error) {
            console.log(error)
            setupdating(false);
        }
    }

    
    const handleFileUpload =async() =>{
        try {
            if (file) {
                setupdating(true);
                const storage = getStorage(app);
                const fileName = new Date().getTime() + file.name;
                const storageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on(
                    'state_changed',
                    async (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        console.log(error);
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            console.log('File available at', downloadURL);
                            setprofile_bg(downloadURL);
                            
                        } catch (error) {
                            console.error("Error getting download URL:", error);
                        }
                    }
                );
            } 
            else{
                updateUser();
            }
            
        } catch (error) {
            console.error("Error uploading file:", error);
            setupdating(false);
        }
    }
    useEffect(() => {
        if (profile_bg !== "") {
            updateUser();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile_bg])
    return (
        <div className={`flex justify-start min-h-screen sm:ml-24 md:ml-60 lg:ml-60 mr-0 w-full ${updating && "opacity-30"}`}>
            <div className="w-full border border-gray-800 p-4">
                {/* header */}
                <div>
                    <div className="flex gap-8 items-center">
                        <div className="text-white font-bold cursor-pointer" onClick={() => window.history.back()}>
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
                    <Image src={updatedUserData?.profile_bg || "/gray_bg.jpg"} className="w-full h-[350px]" width={500} height={500} alt="profile background" />
                </div>
                {/* Profile Pic */}
                <div className="w-full flex justify-between p-2">
                    {/* <Image src={user?.imageUrl} className="cursor-pointer rounded-full mt-[-80px] border-4 border-black" height={150} width={150} alt="profile pic" /> */}
                    <div className="mt-[-70px] ">
                    <UserButton 
                    appearance={{
                        elements:{
                            avatarBox :{
                                width: 150,
                                height: 150,
                                border: "4px solid black",
                                "&:hover":{
                                    border: "4px solid gray"
                                }
                            }
                        }
                    }}
                    />
                    </div>
                    {
                        isMounted && (
                    <Dialog>
                    <DialogTrigger>
                    <div className="bg-transparent border rounded-full text-muted-foreground font-semibold px-2 py-1 hover:text-white hover:border-white">Edit Profile</div>
                    </DialogTrigger>
                    <DialogContent className="bg-black">
                    <DialogHeader>
                    <DialogTitle>
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-white flex gap-4 items-center">
                                <p>Edit Profile</p>
                            </div>
                            <div>
                                <Button className="bg-white text-black rounded-full hover:text-white hover:border" onClick={handleFileUpload}>Save</Button>
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                            <div>
                                <div className="text-white relative">
                                    {
                                        preview ? (<Image src={preview} className="w-full h-52 opacity-55" height={300} width={300} alt="profilebg" />) :(
                                    <Image src={updatedUserData?.profile_bg || "/gray_bg.jpg"} className="w-full h-52 opacity-55" height={300} width={300} alt="profilebg" />

                                        ) 
                                    }
                                    <input onChange={(e) => {
                                        setFile(e.target.files[0]);
                                        setPreview(URL.createObjectURL(e.target.files[0]));
                                    }} type="file" ref={fileInputRef} hidden />
                                    <IoCameraReverseOutline onClick={handleFileClick}  className="w-10 h-10 cursor-pointer absolute top-0 right-0 m-4" />
                                    <Image src={user?.imageUrl} height={100} width={100} alt="userimage" className="rounded-full mt-[-50px] absolute bottom-[-20px] left-0" />
                                </div>
                                <div className="border mt-8 p-2">
                                    <p  className="text-xs">BIO</p>
                                    <textarea onChange={(e) => setbio(e.target.value)} className="bg-transparent w-full focus-within:outline-none text-white" />
                                </div>
                            </div>
                    </DialogDescription>
                    </DialogHeader>
                    </DialogContent>
                    </Dialog>
                        )
                    }
                    
                </div>
                {/* Profile Details */}
                <div>
                    <div className="flex flex-col ml-4">
                        <h2 className="text-white font-semibold text-xl">{user?.firstName} {user?.lastName}</h2>
                        <p className="text-white">{updatedUserData?.bio}</p>
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