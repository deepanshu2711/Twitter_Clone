"use client"

import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

import Link from "next/link";





const Widgets = () => {
    const[whatsHappening,setWhatsHappening] = useState([]);
    const[WhoToFollow,SetWHoToFollow] = useState([]);
    const[articleNumber,setArticalNumber] = useState(3);
    const[RandomUserNumber,setRandomUserNumber] = useState(3);
    useEffect(() => {
        async function GetWhatsHappeningData(){
            const res = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json");
            const data =  await res.json();
            setWhatsHappening(data.articles);
        }
        GetWhatsHappeningData();
        async function GetWhoToFollow(){
            const res = await fetch("https://randomuser.me/api/?results=25&inc=name,login,picture");
            const data =  await res.json();
            console.log(data.results);
            SetWHoToFollow(data.results);
        }
        GetWhoToFollow();
    }, [])

    function handleShowMore() {
        setArticalNumber(articleNumber + 3);
    }

    return ( 
        <div className="text-white mt-1 flex flex-col ml-8 mr-4 border-b-black w-full">
                {/* Search Bar */}
            <div className="sticky top-0 bg-black">
                <div className="flex bg-gray-900 mb-2 p-3 mt-2 rounded-full gap-4 focus-within:border focus-within:border-blue-500">
                    <SearchIcon className="cursor-pointer" />
                    <input type="text" placeholder="Search" className="bg-transparent focus:outline-none " />
                </div>
            </div>
            <div className=" bg-gray-900 rounded-xl mt-4 ">
                {/* Whats Happening */}

                <h2 className="text-center text-lg font-semibold p-2">Whats happening</h2>
                <div className="flex flex-col mt-2">
                {
                    whatsHappening && (
                        whatsHappening.slice(0,articleNumber).map((event) => (
                        <div className=" flex mb-4   px-2 gap-1 hover:bg-blue-500/10 py-2 rounded-lg cursor-pointer" key={event.title}>
                            <Link href={event.url}  className="flex gap-3" target="_blank">
                            <div>
                            <p className="text-sm text-muted-foreground line-clamp-2 font-medium mb-1">{event.title}</p>
                            <p className="text-xs">{event.author}</p>
                            </div>
                            <img className="rounded-lg " src={event.urlToImage} width={50} height={50} alt="whats happening image" />
                            </Link>
                        </div>
                    ))
                    )
                }
                <Button type="button" onClick={handleShowMore} varient="link" className="hover:text-blue-500">Show more</Button>
                </div>
                
                
            </div>

            <div className="mt-8 flex flex-col gap-2 bg-gray-900 rounded-xl sticky top-16">
                {/* Who To Follow */}
                {
                    WhoToFollow &&(
                        WhoToFollow.slice(0,RandomUserNumber).map((user) =>(
                            <div key={user.login.uuid} className="flex items-center justify-start gap-6 px-4 py-2 hover:bg-blue-500/10 cursor-pointer">
                            <div>
                                <img className="rounded-full" src={user.picture.large} width={50} height={50} alt="whats happening image" />
                            </div>
                            <div>
                                <p className="font-semibold hover:underline truncate">{user.name.first}</p>
                                <p className="text-sm text-muted-foreground">{user.login.username}</p>
                            </div>
                            <Button className="text-black  rounded-2xl bg-white ml-auto hover:text-white">Follow</Button>
                            </div>
                        ))
                    )
                }
                <Button varient="link" className="hover:text-blue-500" onClick={() => setRandomUserNumber(RandomUserNumber + 3)}>See more</Button>

            </div>

        </div>
     );
}
 
export default Widgets;