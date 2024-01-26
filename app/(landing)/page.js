import Header from "@/components/Header";
import InputSection from "@/components/InputSection";
import Post from "@/components/Post";
import SideBar from "@/components/SideBar";
import Widgets from "@/components/Widgets";
import Image from "next/image";



const posts =[
  {
    id:1,
    name:"deepanshu",
    username:"deepanshu603",
    avatar:"/1.png",
    img:"/owl.jpg",
    text:"AI Owl",
    timestamp:"2h",
  },
  {
    id:2,
    name:"deepanshu",
    username:"deepanshu603",
    avatar:"/1.png",
    img:"/tiger.jpg",
    text:"Girl with beast",
    timestamp:"4h",
  },

]

export default function Home() {
  

  
  return (
    <div className="">
      
      <div className={`flex max-w-7xl mx-auto min-h-screen`}>
      <SideBar />
      <div className="w-full   border border-gray-800 sm:ml-24 md:ml-60">
      <Header />
      <InputSection />
      <div className="p-4">
      

      {/* Posts */}

      {
        posts.map((post) => (
          <Post
            key={post.id}
            name={post.name}
            username={post.username}
            avatar={post.avatar}
            img={post.img}
            text={post.text}
            timestamp={post.timestamp}
          />
        ))
      }
      
      </div>
      </div>
      {/* 3rd Section */}
      <div className="hidden lg:inline-flex max-w-96">
      <Widgets />
      </div>
      </div>
    </div>
  );
}
