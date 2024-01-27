import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    input:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    }
},{
    timestamps:true
})

const Post = mongoose.models.Post || mongoose.model("Post",postSchema);

export default Post