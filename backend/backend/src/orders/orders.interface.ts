import { Document } from "mongoose";
import { CartItems } from "../carts/cart.interface";
import { UserInterface } from "../user/user.interface";
import { Address } from "../user/user.interface";
export interface OrdersInterface extends Document{
    items:CartItems;
    totalPrice:number
    taxPrice:number;
    itemsPrice:number;
    isPaid:boolean;
    paidAt:Date;
    isDelievered:boolean;
    deliveredAt:Date;
    paymentMethod:'cash' | 'card'
    user:UserInterface;
    address:Address;
}

