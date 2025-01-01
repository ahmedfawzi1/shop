import mongoose from "mongoose";
import { productInterface } from "./product.interface";

const productSchema=new mongoose.Schema<productInterface>({

    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategories' },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    priceAfterDiscount: { type: Number },
    quantity: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    rateAvg: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    cover: String,
    image: [String],

},{toJSON:{virtuals:true},toObject:{virtuals:true},timestamps:true});
productSchema.virtual('reviews', {localField: '_id', foreignField: 'product', ref: 'reviews'})

productSchema.virtual('reviews',{localField:'_id',foreignField:'product',ref:'reviews'})
const imagesUrl=(document:productInterface)=>{
    if(document.cover) document.cover=`${process.env.BASE_URL}/images/products/${document.cover}`
    if(document.image) document.image=document.image.map(img=>`${process.env.BASE_URL}/images/products/${img}`)
}
productSchema
.post('init',imagesUrl)
.post('save',imagesUrl)


productSchema.pre<productInterface>(/^find/, function (next) {
    this.populate({path: 'subcategory', select: 'name image'});
    next();
})

export default mongoose.model<productInterface>('product',productSchema)



