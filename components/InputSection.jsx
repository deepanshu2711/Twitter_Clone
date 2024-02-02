"use client"
import {  ImageIcon, SmileIcon, Terminal, X } from "lucide-react";    
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';            
import { Button } from "./ui/button";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { app } from "@/utils/Firebase";
import { useUser } from "@clerk/nextjs";





const InputSection = () => {
    const { userId } = useAuth();
    const {user} = useUser();    
    const fileInputRef = useRef(null);
    const[posting,setPosting] = useState(false);
    const[file,setFile] = useState(undefined);
    const[preview,setPreview] = useState(undefined);
    
    const [Formdata,setformData] = useState({
        userId :userId,
        input:"",
        imageUrl:"",
    });

    const handleFileClink =(e) =>{
    
    fileInputRef.current.value = null; // Reset input value to trigger onChange
    fileInputRef.current.click();
    }
   

    const handleChange=(e) =>{
        
        setformData({
            ...Formdata,
            [e.target.name]:e.target.value
        })
        
    }


    const handleFileUpload = async () => {
        try {
            setPosting(true)
            if (file) {
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
                            setformData({
                                ...Formdata,
                                imageUrl: downloadURL
                            });
                            
                        } catch (error) {
                            console.error("Error getting download URL:", error);
                        }
                    }
                );
            } else {
                sendPost();
            }
            
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };


    useEffect(() => {
        if (Formdata.imageUrl !== "") {
            sendPost();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Formdata.imageUrl]);
    
    const handlePostSubmission = () => {
        preview && URL.revokeObjectURL(preview);
        setPreview(undefined);
        setFile(undefined);
        setformData({
            userId: userId,
            input: "",
            imageUrl: "",
        });

    };
    
    const sendPost = async () => {
        try {
            console.log(Formdata);
    
            await fetch("/api/user/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Formdata)
            }, {
                cache: "no-store"
            });
            window.location.reload();
    
            handlePostSubmission();
            setPosting(false);
        } catch (error) {
            console.log(error);
            setPosting(false);
        }
    };
    
    

    
    return ( 
        <>
        {
            userId &&(
                <div className="flex w-full gap-4 md:gap-10 border-b border-gray-800 p-4">
            <div >
                <UserButton  afterSignOutUrl="/"/>
            </div>
            <div className="w-full flex flex-col">
                <div className="w-full ">
                    <textarea value={Formdata.input} name="input" onChange={handleChange} rows={2} className="bg-transparent text-white min-w-full focus-within:outline-none" placeholder="What is happening ?!" />
                </div>
                <div>
                    {
                        file && (
                            <div >
                                {posting ? null :<X   onClick={() => setFile(undefined)} className= "cursor-pointer text-white border rounded-full absolute ml-72 mt-2 bg-black " /> }
                                <Image  src={preview} alt="selectedImage" width={315} height={300} />
                            </div>
                        )
                    }
                </div>
                <div className="flex justify-between items-center mb-4 mt-6 border-t border-y-gray-800">
                    <div className="text-blue-500 flex gap-3">
                    <input onChange={(e) => {
                        setFile(e.target.files[0])
                        setPreview(URL.createObjectURL(e.target.files[0]))
                    }} type="file" name="imgUrl" hidden ref={fileInputRef}  />
                    <ImageIcon className="cursor-pointer" onClick={handleFileClink} />
                    <SmileIcon className="cursor-pointer" />

                    </div>
                    {/* <Button onClick={handleFileUpload} className ="rounded-full p-5 bg-blue-500 mt-4" disabled={!file}>Upload Image</Button> */}
                    <Button onClick={handleFileUpload} className ="rounded-full p-5 bg-blue-500 mt-4" disabled={!Formdata.input || posting}>Post</Button>
                </div>
            </div>
        </div>
            )
        }
            
        </>
     );
}
 
export default InputSection;