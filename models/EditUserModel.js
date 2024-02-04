import mongoose from "mongoose";

const EditUserModel = mongoose.Schema({
    profile_bg:{
        type:String
    },
    bio:{
        type:String,
        default:"Edit your bio from edit profile section"
    },
    userId:{
        type:String
    }
})

const EditUser = mongoose.models.EditUser || mongoose.model("EditUser",EditUserModel);
export default EditUser;