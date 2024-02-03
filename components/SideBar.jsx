"use client"
import {Bell, Bookmark, Clipboard, Hash, HomeIcon, InboxIcon, MoreHorizontal, UserIcon } from "lucide-react";
import Image from "next/image";
import MenuItem from "./MenuItem";
import { Button } from "./ui/button";
import { SignInButton, UserButton,useAuth } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


const menuItems = [
    {
        icon:Bell,
        lable:"Notification",
    },
    {
        icon:InboxIcon,
        lable:"Messages"
    },
    {
        icon:Bookmark,
        lable:"Bookmark"
    },
    {
        icon: Clipboard,
        lable:"Lists"
    },
    {
        icon:UserIcon,
        lable:"Profile",
        href:"/profile"
    },
    {
        icon:MoreHorizontal,
        lable:"More"
    }
]

const SideBar = () => {
    const{user} = useUser()
    const{userId} = useAuth()
    const router = useRouter()
    
    
    
    
    return ( 
        <div className={`h-screen w-auto md:w-60 p-4 fixed   hidden sm:flex sm:flex-col `}>
            <div className="cursor-pointer">
                {/* Logo */}
                <Image src={"/x.webp"} width={50} height={50} alt="logo" />
            </div>
            <div onClick={() =>{router.push("/")}}>
            <MenuItem icon={HomeIcon} lable="Home" href={"/"}  />
            </div>
            <MenuItem icon={Hash} lable="Explore"/>
            {
                userId&&(
                    <div className="flex flex-col ">
                {/* Menu Items */}
                {
                    menuItems.map((item) => (
                        <MenuItem key={item.lable} icon={item.icon} lable={item.lable} href={item.href} />
                    ))
                }

            </div>
                )
            }
            
            <div>
                {/* Button */}

                <Button className="text-lg w-auto md:w-full mt-4 rounded-2xl bg-blue-500">
                { userId ? <p>Post</p> : <SignInButton />}
                </Button>
            </div>
            {
                userId &&(
                    <div className="flex mt-10 p-3 items-center hover:bg-slate-900 rounded-full cursor-pointer">
                {/* Mini Profile */}
                {/* <Avatar className="md:ml-0">
                <AvatarImage src="/1.png" />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar> */}
                <div>
                <UserButton  afterSignOutUrl="/"/>

                </div>
                <div className=" text-white md:flex md:flex-col ml-4 hidden ">
                    <p className="font-semibold">{user &&(user.firstName)}</p>
                    <p className="text-xs text-muted-foreground">{user &&(user.username)}</p>
                </div>
                <MoreHorizontal className="text-white ml-4 hidden md:inline-flex"/>
            </div>
                )
            }
           
        </div>
     );
}
 
export default SideBar;