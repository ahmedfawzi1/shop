import { Document } from "mongoose";
import { UserInterface } from "../user/user.interface";
import { productInterface } from "../product/product.interface";
export interface Reviews extends Document{
   readonly comment:string;
   readonly rate:number;
   readonly user:UserInterface;
   readonly product:productInterface;



};

