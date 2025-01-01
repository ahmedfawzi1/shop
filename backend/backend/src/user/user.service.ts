import {Request,Response,NextFunction, RequestHandler} from "express";
import { UserInterface } from "./user.interface";
import UserSchema from "./user.schema";
import asyncHandler from "express-async-handler";
import refactorSchemaService from "../refactorysechmaservices";
import ApiErrors from "../utilsuses/ApiErrors";
import { use } from "i18next";
import { uploadSingleFiles } from "../middelwaresErrors/uploadfiles";
import sharp from "sharp";
import userSchema from "./user.schema";
import bcrypt from 'bcrypt' 
import Jwt  from "jsonwebtoken";
import createTokens from "../utilsuses/create.tokens";
class UserService{
     setUserId=(req:Request,res:Response,next:NextFunction)=>{
        if(req.user?._id){
            req.params.id=req.user?._id.toString()
        }
        console.log(req.params._id)
        next();

    }

// handel service for all schemas
   getAll=refactorSchemaService.getAll<UserInterface>(UserSchema);
   createOne=refactorSchemaService.createOne<UserInterface>(UserSchema);
   getOne=refactorSchemaService.getOne<UserInterface>(UserSchema);
    // updateOne=refactorSchemaService.updateOne<UserInterface>(UserSchema)
    updateOne=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const user: UserInterface | null=await UserSchema.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            image:req.body.image,
            active:req.body.active},
            {new:true})
            if(!user) {
                return next(new ApiErrors(`${req.__('not_found')}`,404));
            }
            res.status(200).json({data:user})

    })
    updateLoggedUser=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const user: UserInterface | null=await UserSchema.findByIdAndUpdate(req.user?._id,{
            name:req.body.name,
            image:req.body.image,
            active:req.body.active},
            {new:true})

            res.status(200).json({data:user})

    })
    createPassword=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const user : UserInterface | null=await UserSchema.findOneAndUpdate({_id:req.user._id,hasPassword:false},{password: await bcrypt.hash(req.body.password,13)},
            {new:true})
            if(!user) {
            return next(new ApiErrors(`${req.__('not_found')}`,404));
        }
        res.status(200).json({data:user})
    })
    // كود الباسورد قبل التشفير
    // changePassword=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    //     const user: UserInterface | null=await UserSchema.findByIdAndUpdate(req.params.id,{
    //         password:req.body.password,
    //         passwordChangedAt:Date.now(),
    //         active:req.body.active},
    //         {new:true})
    //         if(!user) {
    //             return next(new ApiErrors(`${req.__('not_found')}`,404));
    //         }
    //         res.status(200).json({data:user})

  
    //     })


    // كود الباسورد بعد التشفير
    changePassword=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const user : UserInterface | null=await userSchema.findByIdAndUpdate(req.user?._id!,{
            password: bcrypt.hash(req.body.password,13),
            passwordChangedAt:Date.now(),
            active:req.body.active},
            {new:true})
            if(!user) {
            return next(new ApiErrors(`${req.__('not_found')}`,404));
        }
        res.status(200).json({data:user})
    })
    changeLoggedPassword=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const user : UserInterface | null=await userSchema.findByIdAndUpdate(req.user?._id,{
            password: bcrypt.hash(req.body.password,13),
            passwordChangedAt:Date.now(),
            active:req.body.active},
            {new:true})

            if(!user) {
            return next(new ApiErrors(`${req.__('not_found')}`,404));
        }
        const token = createTokens.accessToken(user?._id, user?.role!)

        res.status(200).json({token,data:user})
    
    })
    uplodaImages=uploadSingleFiles(['image'],'image');
    saveImage=async(req:Request,res:Response,next:NextFunction)=>{
        if(req.file){
            const fileName:string=`user-${Date.now()}-image.webp`
            await sharp(req.file.buffer)
            .resize(1000,1000)
            .webp({quality:90})
            .toFile(`uploads/images/user/${fileName}`)
            req.body.image=fileName
        }
        next();
    }
   deleteOne=refactorSchemaService.deleteOne<UserInterface>(UserSchema);
    };

    //get logged user
const userService =new UserService() ;
export default userService;
