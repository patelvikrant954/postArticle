import mongoose from "mongoose";
const articleSchema= new mongoose.Schema({
    user_id: {
        type: mongoose.ObjectId,
        ref: "user",
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const articleModel= new mongoose.model("article",articleSchema)
export default articleModel;