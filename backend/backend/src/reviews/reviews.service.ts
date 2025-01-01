import {Request,Response,NextFunction, RequestHandler} from "express";
import { Reviews } from "./reviews.interface";
import ReviewsSchema from "./reviews.schema";
import asyncHandler from "express-async-handler";
import refactorSchemaService from "../refactorysechmaservices";
class ReviewsService{
// handel service for all schemas
setUserId=(req:Request,res:Response,next:NextFunction)=>{
    req.body.user=req.user._id
    req.body.product=req.params?.productId
    next();

}
filterReviews=(req:Request,res:Response,next:NextFunction)=>{
    const filterData:any={}
    if(req.params.productId) filterData.product=req.params.productId
    // else filterData.user=req.user._id
    if(!req.params.productId && req.user&& req.user.role==='user') filterData.user=req.user._id

    req.filterData=filterData
    next();

}
   getAll=refactorSchemaService.getAll<Reviews>(ReviewsSchema);
   createOne=refactorSchemaService.createOne<Reviews>(ReviewsSchema);
   getOne=refactorSchemaService.getOne<Reviews>(ReviewsSchema);
   updateOne=refactorSchemaService.updateOne<Reviews>(ReviewsSchema)
   deleteOne=refactorSchemaService.deleteOne<Reviews>(ReviewsSchema);
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
const reviewsService =new ReviewsService() ;
export default reviewsService;
