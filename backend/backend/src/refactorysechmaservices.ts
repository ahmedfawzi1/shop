

import express from 'express'
import { Request,Response,NextFunction } from "express";
import ApiErrors from './utilsuses/ApiErrors';
import asyncHandler from "express-async-handler";
import mongoose, { modelNames, mongo, Schema } from "mongoose";
import { Document } from "mongoose";
import Features from './utilsuses/features';
import sanitization from './utilsuses/santization';
class RefactorSchemaService{
   getAll = <modelType>(model: mongoose.Model<any>, modelName?: string) =>
      asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
          let filterData: any = {};
          if (req.filterData) filterData = req.filterData;
          const documentsCount = await model.find(filterData).countDocuments();
          const features = new Features(model.find(filterData), req.query).filter().sort().limitFields().search(modelName!).pagination(documentsCount);
          const {moongoseQuery, paginationResult} = features;
          const documents: modelType[] = await moongoseQuery;
          res.status(200).json({pagination: paginationResult, length: documents.length, data: documents});
      });
   createOne=<modelType>(model:mongoose.Model<any>)=>asyncHandler(async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
      const Document: modelType= await model.create(req.body);
      res.status(201).json({data:Document})
   });

    getOne=
    <modelType>(model: mongoose.Model<any>, modelName?: string, populationOptions?: string) =>
      asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
          let query: any = model.findById(req.params.id);
          if (populationOptions) query = query.populate(populationOptions);
          let document: any = await query;
          if (!document) return next(new ApiErrors(`${req.__('not_found')}`, 404));
          if (modelName === 'users') document = sanitization.User(document)
          res.status(200).json({data: document});
      })
   // <modelType>(model:mongoose.Model<any>,modelName?:string,populationObj?:string)=>
   //    asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
   //    let query: any= await model.findById(req.params.id);
   //    if(populationObj) query=query.populate(populationObj)
   //    let Document: any= await query;
   //    if(!Document) return next(new ApiErrors(`${req.__('not_found')}`,404));
   //    if (modelName === 'users') Document = sanitization.User(Document)

   //    res.status(200).json({data:Document})
   // });

   updateOne=<modelType>(model:mongoose.Model<any>)=>asyncHandler(async(req:express.Request,res:express.Response,next:express.NextFunction):Promise<void>=>{
      const Document: modelType| null= await model.findOneAndUpdate({_id:req.params.id},req.body,{new:true});
      if(!Document) return next(new ApiErrors(`${req.__('not_found')} `,404));
      res.status(201).json({data:Document})
   });
   deleteOne=<modelType>(model:mongoose.Model<any>)=>asyncHandler(async(req:express.Request,res:express.Response,next:express.NextFunction)=>{

      const Document:modelType|null=await model.findByIdAndDelete(req.params.id);
      if(!Document) return next(new ApiErrors(`${req.__('not_found')} `,404));
      res.status(204).json()
   });
}
 const refactorSchemaService =new RefactorSchemaService() ;
export default refactorSchemaService;

