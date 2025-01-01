import mongoose from "mongoose";
import { Reviews } from "./reviews.interface";
import path from "path";
import productSchema from "../product/product.schema";
const ReviewsSchema=new mongoose.Schema<Reviews>({
    comment:{type:String},
    rate:{type:Number},
    user:{type:mongoose.Schema.Types.ObjectId, ref:"users"},
    product:{type:mongoose.Schema.Types.ObjectId, ref:"product"}  
},{timestamps:true});
ReviewsSchema.statics.calcRating=async function(productId){
    // [بدور علي الريت الخاص بكل ريفيو علي المنتج]
    const result:any=await this.aggregate([
        {$match:{product:productId}},
        {$group:{_id:'product',avgrating:{$avg:'$rate'},ratingquantity:{$sum:1}}}
    ])
    if(result.length>0){
        await productSchema.findByIdAndUpdate(productId,{
            rateAvg:result[0].avgrating,
            rate:result[0].ratingquantity
})
    }
    else{
        await productSchema.findByIdAndUpdate(productId,{rateAvg:0, rate:0})
    }
    console.log(result)
}
ReviewsSchema.post<Reviews>('save',async function() {
    await (this.constructor as any).calcRating(this.product)
})
ReviewsSchema.post<Reviews>('findOneAndUpdate',async function(doc:Reviews) {
    await (doc.constructor as any).calcRating(doc.product)
    // if(doc.product){
    //     await (doc.constructor as any).calcRating(this.product)
    // }
})
ReviewsSchema.post<Reviews>('findOneAndDelete',async function(doc:Reviews) {
    await (doc.constructor as any).calcRating(doc.product)
    // if(doc.product){
    //     await (doc.constructor as any).calcRating(this.product)
    // }
})
// ReviewsSchema.virtual('reviews',{ref:'reviews'})
ReviewsSchema.pre<Reviews>(/^find/,async function(next){
    this.populate({path:'user', select:'name image'})   
    next();
})
export default mongoose.model<Reviews>('reviews',ReviewsSchema)
