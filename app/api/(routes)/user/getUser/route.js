import EditUser from "@/models/EditUserModel";
import { ConnectDB } from "@/utils/MongoDb"

export const POST = async(request) =>{
    try {
        await ConnectDB();
        
        const { userId,profile_bg,bio} = await request.json();
        const userData = await EditUser.findOne({userId});
        
        return new Response(JSON.stringify({userData}),{status:200});
    } catch (error) {
        return new Response(JSON.stringify({message:"failed"}),{status:500});
    }
}