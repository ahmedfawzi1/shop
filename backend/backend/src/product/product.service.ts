import { Request,Response,NextFunction } from "express";
import productSchema from "./product.schema";
import refactorSchemaService from "../refactorysechmaservices";
import { productInterface } from "./product.interface";
import { uploadSingleFiles,uploadMultiFiles } from "../middelwaresErrors/uploadfiles";

import sharp from "sharp";
 
class ProductService{
    // uploadImages = uploadSingleFiles(['image'], 'cover')
    uploadImages = uploadMultiFiles(['image'], [{name: 'cover', maxCount: 1}, {name: 'image', maxCount: 5}])
    saveImage=async(req:Request,res:Response,next:NextFunction)=>{
        if(req.files){
        if(req.files.cover){
        const fileName: string = `product-${Date.now()}-cover.webp`;
        await sharp(req.files.cover[0].buffer)
            .resize(1000,1000)
            .webp({quality:90})
            .toFile(`uploads/images/products/${fileName}`);
            req.body.cover=fileName;
        }
        if(req.files.image){
            req.body.image=[]
            await Promise.all(req.files.image.map(async(img:any,index:number)=>{
                const fileName: string = `product-${Date.now()}-image-N${index}-image.webp`;
                await sharp(img.buffer)
                .resize(1000,1000)
                .webp({quality:90})
                .toFile(`uploads/images/products/${fileName}`);
                req.body.image.push(fileName)
            }))
        }
    }
        next();

        }
        
    // saveImage=async(req:Request,res:Response,next:NextFunction)=>{
    //     if(req.file){
    //     const fileName: string = `product-${Date.now()}-cover.webp`;
    //     await sharp(req.file.buffer)
    //         .resize(1000,1000)
    //         .webp({quality:90})
    //         .toFile(`uploads/images/products/${fileName}`);
    //     req.body.cover=fileName;
    //     }
    //     next();

    //     }
 

    getAll=refactorSchemaService.getAll<productInterface>(productSchema,'product');
    createOne=refactorSchemaService.createOne<productInterface>(productSchema);
    getOne=refactorSchemaService.getOne<productInterface>(productSchema,'product','reviews');
    updateOne=refactorSchemaService.updateOne<productInterface>(productSchema);
    deleteOne=refactorSchemaService.deleteOne<productInterface>(productSchema);

    // saveImage=async(req:Request,res:Response,next:NextFunction)=>{

    // }
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

const productService=new ProductService();
export default productService;