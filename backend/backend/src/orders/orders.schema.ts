import mongoose from "mongoose";
import { OrdersInterface } from "./orders.interface";
import { NextFunction } from "express";
const ordersSchema=new mongoose.Schema<OrdersInterface>(
    {
        items: [{
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'product'},
            quantity: {type:Number,default:1},
            price: {type:Number}
        }],
        taxPrice:{type:Number},
        totalPrice: {type:Number},
        itemsPrice: {type:Number},
        isPaid: {type:Boolean , default:false},
        paidAt: {type:Date},
        isDelievered: {type:Boolean,default:false},
        deliveredAt: {type:Date},
        paymentMethod: {type:String,enum:['cash','card'],default:'cash'},
        user:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
        address:{
            address:{type:String},
            city:{type:String},
            state:{type:String},
            zip:{type:String},
        }
    }, {timestamps: true}
);

ordersSchema.pre<OrdersInterface>(/^find/, function (next) {
    this.populate({path: 'items.product', select: 'name cover'})
    this .populate({path:'user',select:'name image'})
    next();
});
export default mongoose.model<OrdersInterface>('orders',ordersSchema)