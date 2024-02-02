import Post from "@/models/postModel";
import Comment from "@/models/PostCommentModel";
import { ConnectDB } from "@/utils/MongoDb"
import { auth } from "@clerk/nextjs";

export const POST =async(request)=>{
    const {userId:currentUserId} = auth();
    try {
        if(!currentUserId) {
            return new Response(JSON.stringify({message:"unauthorized"}),{status:401});
        }
        await ConnectDB();
        const {postId,userId,comment,name,profilePic} = await request.json();
        await Comment.create({postId,userId,comment,name,profilePic});
        const post = Post.findOne({ _id: postId });
        const updateResult = await Post.updateOne({ _id: postId }, { $inc: { comment: 1 } });
        return new Response(JSON.stringify({message:"success"}),{status:200});
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message:"failed"}),{status:500});
        
    }
}