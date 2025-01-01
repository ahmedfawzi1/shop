import mongoose from "mongoose";
import { Categories } from "./categories.interface";
const CategoriesSchema=new mongoose.Schema<Categories>({
    name:{type:String,required:true,unique:true,trim:true},
    image : String
},{timestamps:true});

export default mongoose.model<Categories>('categories',CategoriesSchema)