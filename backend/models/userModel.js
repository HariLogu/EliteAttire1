import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}},
},{minimize:false})//minimize false means since the def val={},if we create a model it wont updated if we dont use minimize

const userModel=mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;