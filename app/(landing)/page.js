import InputSection from "@/components/InputSection";
import Post from "@/components/Post";
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
    <div className="p-4">
      <InputSection />

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
  );
}
