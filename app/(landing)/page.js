"use client"
import Header from "@/components/Header";
import InputSection from "@/components/InputSection";
import Post from "@/components/Post";
import { useEffect, useState } from "react";



export default function Home() {
  
  const[postsData,setPostsData] = useState([]);

  useEffect(()=>{
    const getPosts = async()=>{
      const res = await fetch("/api/user/getPosts",{cache:"no-store"});
      const data = await res.json();
      setPostsData(data.posts);

    }
    getPosts();
  },[])
  console.log(postsData)

  
  return (
    <div className="md:mr-60 lg:mr-60 w-full">
      
      <div className="w-full border border-gray-800 sm:ml-24 md:ml-60">
      <Header />
      <InputSection />
      <div className="p-4">
      

      {/* Posts */}

      {
        postsData.map((post) => (
          <Post
            key={post._id}
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
        ))
      }
      
      </div>
      </div>
      {/* 3rd Section */}
      
      
    </div>
  );
}
