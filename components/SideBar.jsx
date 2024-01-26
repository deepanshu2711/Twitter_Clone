"use client"
import {Bell, Bookmark, Clipboard, Hash, HomeIcon, InboxIcon, MoreHorizontal, UserIcon } from "lucide-react";
import Image from "next/image";
import MenuItem from "./MenuItem";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";



const menuItems = [
    {
        icon:HomeIcon,
        lable:"Home"
    },
    {
        icon:Hash,
        lable:"Explore"
    },
    {
        icon:Bell,
        lable:"Notification"
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
        lable:"Profile"
    },
    {
        icon:MoreHorizontal,
        lable:"More"
    }
]

const SideBar = () => {
    
    return ( 
        <div className={`h-screen w-auto md:w-60 p-4 fixed   hidden sm:flex sm:flex-col `}>
            <div className="cursor-pointer">
                {/* Logo */}
                <Image src={"/x.webp"} width={50} height={50} alt="logo" />
            </div>
            <div className="flex flex-col ">
                {/* Menu Items */}
                {
                    menuItems.map((item) => (
                        <MenuItem key={item.lable} icon={item.icon} lable={item.lable} />
                    ))
                }

            </div>
            <div>
                {/* Button */}
                <Button className="text-lg w-auto md:w-full mt-4 rounded-2xl bg-blue-500">Post</Button>
            </div>
            <div className="flex mt-10 p-3 items-center hover:bg-slate-900 rounded-full cursor-pointer">
                {/* Mini Profile */}
                <Avatar className="md:ml-0">
                <AvatarImage src="/1.png" />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className=" text-white md:flex md:flex-col ml-4 hidden ">
                    <p className="font-semibold">Deepanshu</p>
                    <p className="text-xs text-muted-foreground">@deepanshu603</p>
                </div>
                <MoreHorizontal className="text-white ml-4 hidden md:inline-flex"/>
            </div>
        </div>
     );
}
 
export default SideBar;