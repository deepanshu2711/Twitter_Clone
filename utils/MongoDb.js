import mongoose from "mongoose";

export const ConnectDB = async() =>{
    try {
        if(mongoose.connections[0].readyState){
            return;
        }
        const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        if(conn){
            console.log("MongoDB connected");
        }else{
            console.log("MongoDB not connected");
        }
        
    } catch (error) {
        console.log(error);
    }
}