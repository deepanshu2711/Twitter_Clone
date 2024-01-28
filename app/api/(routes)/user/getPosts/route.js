import Post from "@/models/postModel";
import { ConnectDB } from "@/utils/MongoDb";

export const GET = async(request) =>{
    try {
        await ConnectDB();
        const posts = await Post.find({}).sort({timestamp:-1});
        return new Response(JSON.stringify({posts}),{status:200});
    } catch (error) {
        return new Response(JSON.stringify({message:"failed to get posts"}),{status:500});
    }
}