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
    },
    name:{
        type:String,
        required:true
    },
    username:{
        type:String
    },
    profilePic:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
    comment:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

const Post = mongoose.models.Post || mongoose.model("Post",postSchema);

export default Post