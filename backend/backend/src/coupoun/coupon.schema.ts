import mongoose from "mongoose";
import { coupon } from "./coupon.interface";
const CouponSchema=new mongoose.Schema<coupon>({
    name:{type:String},
    discount:{type:Number},
    expireTime:{type:Date}
},{timestamps:true});

export default mongoose.model<coupon>('coupon',CouponSchema)