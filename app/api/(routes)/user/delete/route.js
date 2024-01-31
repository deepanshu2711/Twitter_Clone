import Post from "@/models/postModel";
import { ConnectDB } from "@/utils/MongoDb";

export const DELETE = async(request)=>{
    const{postId,userId} = await request.json();
    await ConnectDB();
    try {
        const deletedPost = await Post.deleteOne({ _id: postId, userId: userId });
        return new Response(JSON.stringify({deletedPost}),{status:200});
    } catch (error) {
        return new Response(JSON.stringify({message:"failed to delete post"}),{status:500});}
}

