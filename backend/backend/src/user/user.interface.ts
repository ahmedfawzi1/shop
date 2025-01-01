import { Schema,Document } from "mongoose";
export interface UserInterface extends Document{
   readonly username:string
   readonly name:string
   readonly email:string
            password:string
   readonly role:UserRole
   readonly active:boolean
            googlId:string
   readonly hasPassword:boolean
            wishlist:Schema.Types.ObjectId[]
            address:Address[]
   readonly passwordChangedAt:Date | number
   readonly passwordResetCode:string | undefined
            passwordCodeVerify:boolean
   readonly passwordResetCodeExpores:Date | number | undefined
            image:string;
};

// type Role='admin'|'employee'|'user'
type UserRole='admin'|'employee'|'user'

export interface Address {
   street: string
   city: string
   state: string
   zip: string
}
