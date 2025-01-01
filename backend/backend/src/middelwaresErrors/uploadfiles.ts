import sharp from "sharp";
import multer, { Field } from "multer";
import ApiErrors from "../utilsuses/ApiErrors";
import { Request } from "express";
import express from 'express'

export interface Fields{
    name:string;
    maxCount:number;
}

const uploadOptions= (fileTypes:string[]):multer.Multer=>{
    const multerStorage:multer.StorageEngine=multer.memoryStorage();
    const multerFilter=function(req:Request,file:Express.Multer.File,cb:multer.FileFilterCallback){
    const isValidType:boolean=fileTypes.some((type)=>file.mimetype.startsWith(type));
    if(isValidType){
        cb(null,true);
    }
    else{
        cb(new ApiErrors('the file is not allowed',400))
    }

}
return multer({storage:multerStorage, fileFilter:multerFilter})

}

export const uploadSingleFiles=(fileTypes:string[],fieldNames:string)=> uploadOptions(fileTypes).single(fieldNames);

export const uploadMultiFiles=(fileTypes:string[],fields:Fields[])=>uploadOptions(fileTypes).fields(fields)


// const upload=multer({storage:storage})
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/images/products');
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         const fileName: string = `product-${Date.now()}-cover.${ext}`;
//         cb(null, fileName);
//     }
// })
// const storage=multer.memoryStorage();
// const upload=multer({storage:storage})
// export default upload;