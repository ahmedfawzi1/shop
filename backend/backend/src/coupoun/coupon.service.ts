import {Request,Response,NextFunction, RequestHandler} from "express";
import { coupon } from "./coupon.interface";
import asyncHandler from "express-async-handler";
import refactorSchemaService from "../refactorysechmaservices";
import couponSchema from "./coupon.schema";
class CouponService{
// handel service for all schemas
   getAll=refactorSchemaService.getAll<coupon>(couponSchema);
   createOne=refactorSchemaService.createOne<coupon>(couponSchema);
   getOne=refactorSchemaService.getOne<coupon>(couponSchema);
   updateOne=refactorSchemaService.updateOne<coupon>(couponSchema)
   deleteOne=refactorSchemaService.deleteOne<coupon>(couponSchema);
   //  getAll=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
   //      const categories:Categories[]=await categoriesSchema.find();
   //      res.status(200).json({data:categories});

   //  })
   //  // async createOne(req:Request,res:Response,next:NextFunction){
   //  //     const categories: Categories=await categoriesSchema.create(req.body);
   //  //     res.status(201).json({data:categories});
   //  //  }
   //  createOne=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
   //      const categories: Categories= await categoriesSchema.create(req.body);
   //      res.status(201).json({data:categories})
   //   });

   //   getOne=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
   //      const categories: Categories | null= await categoriesSchema.findById(req.params.id);
   //      res.status(201).json({data:categories})
   //   });

   //   updateOne=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
   //      const categories: Categories| null= await categoriesSchema.findByIdAndUpdate(req.params.id,req.body,{new:true});
   //      res.status(200).json({data:categories})
   //   });
   //   deleteOne=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
   //      const categories:Categories|null=await categoriesSchema.findByIdAndDelete(req.params.id);
   //      res.status(204).json()
   //   });
    };
const couponService =new CouponService() ;
export default couponService;
