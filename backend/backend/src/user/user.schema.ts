import mongoose, { Schema } from "mongoose";
import { UserInterface } from "./user.interface";
import bcrypt from 'bcrypt'
const UserSchema=new mongoose.Schema<UserInterface>({
    username:{type:String,required:true,unique:true},
    name:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type:String,enum:['admin','employee','user'],default:'user'},
    active:{type:Boolean , default:true},
    googlId:String,
    hasPassword:{type:Boolean , default:true},
    wishlist:[{type:mongoose.Schema.Types.ObjectId, ref:'product'}],
    address:[{
        address:String,
        city:String,
        state:String,
        zip:String
    }],
    passwordChangedAt:Date ,
    passwordResetCode:String ,
    passwordResetCodeExpores:Date,
    passwordCodeVerify:Boolean,
    image : {type:String, default:'user-Avatar-Profile-PNG-Images.png'}
},{timestamps:true});

const imagesUrl=(document:UserInterface)=>{
    if(document.image && document.image.startsWith(`user`)) document.image=`${process.env.BASE_URL}/images/user/${document.image}`
}
UserSchema
.post('init',imagesUrl)
.post('save',imagesUrl);

UserSchema.pre<UserInterface>('save',async function(next){
    if(!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password,13)
    next();
})
export default mongoose.model<UserInterface>('users',UserSchema)
