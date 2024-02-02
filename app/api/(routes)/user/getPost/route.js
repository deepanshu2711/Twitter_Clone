import Post from "@/models/postModel";
import { ConnectDB } from "@/utils/MongoDb"

export const POST =async(request) =>{
    try {
        await ConnectDB();
        const{postId} = await request.json();
        const res = await Post.findOne({_id : postId});
        return new Response(JSON.stringify({res},{status:200}));
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message:"failed"}),{status:500});
    }
}