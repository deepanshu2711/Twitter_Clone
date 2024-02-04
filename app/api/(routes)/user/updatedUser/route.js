import EditUser from "@/models/EditUserModel";
import { ConnectDB } from "@/utils/MongoDb";


export const POST = async(request) =>{
    try {
        await ConnectDB();
        const {userId,bio,profile_bg} = await request.json();
        const user = await EditUser.updateOne({userId},{profile_bg,bio},{upsert:true});
        const updatedUser = await EditUser.findOne({userId});
        return new Response(JSON.stringify({updatedUser}),{status:200});
    } catch (error) {
        return new Response(JSON.stringify({message:"failed"}),{status:500});
    }
}