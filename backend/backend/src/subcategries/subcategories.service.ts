import { subcategoriesInterface } from "./subcategories.interface";
import { Request,Response,NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { Schema } from "mongoose";
import subcategoriesSchema from "./subcategories.schema";
import refactorSchemaService from "../refactorysechmaservices";
 
class SubcategoriesService{
    setCategoryId(req:Request,res:Response,next:NextFunction){
        if(req.params.categoryId&& !req.body.category) req.body.category=req.params.categoryId
        next();
    }
    filterDataSubcategory(req:Request,res:Response,next:NextFunction){
        const filterData:any={};
        if(req.params.categoryId){filterData.category=req.params.categoryId
            req.filterData=filterData;
         }
         next();
    }
    getAll=refactorSchemaService.getAll<subcategoriesInterface>(subcategoriesSchema);
    createOne=refactorSchemaService.createOne<subcategoriesInterface>(subcategoriesSchema);
    getOne=refactorSchemaService.getOne<subcategoriesInterface>(subcategoriesSchema);
    updateOne=refactorSchemaService.updateOne<subcategoriesInterface>(subcategoriesSchema);
    deleteOne=refactorSchemaService.deleteOne<subcategoriesInterface>(subcategoriesSchema);

    // setCategoryId(req:Request,res:Response,next:NextFunction){
    //     if(req.params.categoryId && !req.body.category){req.body.category=req.params.categoryId}
    //     next()

    // }
    // filterSubCategory(req:Request,res:Response,next:NextFunction){
    //     const filterData:any={};
    //     if(req.params.categoryId){
    //         filterData.category=req.params.categoryId;
    //     }
    //     req.filterData=filterData;
    //     next();
    // }
//     getAll=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
//         // let filterData:any={};
//         // if(req.filterData) filterData=req.filterData
//          const subcategories:subcategoriesInterface[]=await subcategoriesSchema.find(filterData);
//          res.status(200).json({data:subcategories});
//         // let filterData:any={};

//         // if(req.filterData){
//         //     filterData=req.filterData;
//         // }
//         // const subcategories:subcategoriesInterface[]=await subcategoriesSchema.find(req.filterData);
//         // res.status(200).json({data:subcategories});
//     });

//     getOne=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
//         const subcategories:subcategoriesInterface|null=await subcategoriesSchema.findById(req.params.id);
//         res.status(200).json({data:subcategories});

//     });

//     // createOne=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
//     //     if(req.params.categoryId && !req.body.category){req.body.category=req.params.categoryId}
//     //     const subcategories:subcategoriesInterface=await subcategoriesSchema.create(req.body);
//     //     res.status(201).json({data:subcategories});

//     // });
//     createOne=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        
//     // if(req.params.categoryId && !req.body.category) req.body.category=req.params.categoryId
//     const subcategories:subcategoriesInterface=await subcategoriesSchema.create(req.body);
//     res.status(201).json({data:subcategories});

//     });

//     // updateOne=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
//     //     const subcategories:subcategoriesInterface|null=await subcategoriesSchema.findByIdAndUpdate(req.params.id,req.body,{new:true});
//     //     res.status(201).json({data:subcategories});

//     // });
//     updateOne=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
//         const subcategories:subcategoriesInterface|null=await subcategoriesSchema.findByIdAndUpdate(req.params.id,{new:true});
//         res.status(201).json({data:subcategories});

//     });
//     deleteOne=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
//         const subcategories:subcategoriesInterface|null= await subcategoriesSchema.findByIdAndDelete(req.params.id);
//         res.status(204).json();
//     })
}

const subcategoriesService=new SubcategoriesService();
export default subcategoriesService;