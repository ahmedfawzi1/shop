import { Document } from "mongoose";
export interface coupon extends Document{
   readonly name:string;
   readonly discount:number;
   readonly expireTime:Date;

};

