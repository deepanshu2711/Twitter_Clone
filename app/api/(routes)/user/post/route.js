import Post from "@/models/postModel";
import { ConnectDB } from "@/utils/MongoDb"

export const POST = async (request) => {
    try {
        await ConnectDB();
        const{userId,input,imageUrl} = await request.json();
        console.log(userId,input,imageUrl);
        if (!userId || !input) {
            throw new Error("userId and input are required.");
        }
        Post.create({userId,input,imageUrl});
        return new Response(JSON.stringify({message:"success"}),{status:200});
    } catch (error) {
        return new Response(JSON.stringify({message:error}),{status:500});
    }
}