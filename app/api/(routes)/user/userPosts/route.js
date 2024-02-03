import Comment from "@/models/PostCommentModel";
import Post from "@/models/postModel";
import { ConnectDB } from "@/utils/MongoDb"

export const POST = async(request) =>{
    try {
        await ConnectDB();
        const{userId} = await request.json();
        const posts = await Post.find({userId}).sort({createdAt:-1});
        const comments = await Comment.find({userId}).sort({createdAt:-1});
        const responseData = {
            posts: posts,
            comments: comments
        };
        return new Response(JSON.stringify({responseData}),{status:200});
    } catch (error) {
        return new Response(JSON.stringify({message:"failed to get posts"}),{status:500});  
    }
}