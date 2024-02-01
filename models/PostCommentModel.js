import mongoose, { mongo } from "mongoose";

const commentSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    profilePic:{
        type:String
    }
},{
    timestamps:true
})

const Comment =  mongoose.models.Comment || mongoose.model("Comment",commentSchema); 

export default Comment;