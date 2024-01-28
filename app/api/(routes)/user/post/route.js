import Post from "@/models/postModel";
import { ConnectDB } from "@/utils/MongoDb"
import { currentUser, auth } from "@clerk/nextjs";


export const POST = async (request) => {
    const user = await currentUser();
    const name = user.firstName
    const username = user?.username
    try {
        await ConnectDB();
        const{userId,input,imageUrl} = await request.json();
        console.log(userId,input,imageUrl,name,username);
        if (!userId || !input) {
            throw new Error("userId and input are required.");
        }
        await Post.create({userId,input,imageUrl,name});
        return new Response(JSON.stringify({message:"success"}),{status:200});
    } catch (error) {
        return new Response(JSON.stringify({message:error}),{status:500});
    }
}