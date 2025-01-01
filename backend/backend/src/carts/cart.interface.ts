import {Document,Schema} from "mongoose";
import { UserInterface } from "../user/user.interface";
import { productInterface } from "../product/product.interface";
export interface Carts extends Document {
    items: CartItems[];
    taxPrice:number
    totalPrice: number;
    totalPriceAfterDiscount: number | undefined;
    user: UserInterface;
}
export interface CartItems {
    _id:Schema.Types.ObjectId;
    product: productInterface;
    quantity: number;
    price: number;
}