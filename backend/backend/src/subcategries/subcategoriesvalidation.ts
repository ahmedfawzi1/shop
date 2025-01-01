import { body, param } from "express-validator";
import express from 'express'
import subcategorieSchema from "./subcategories.schema";
import validatorMiddelware from "../middelwaresErrors/validatormiddelware";
import categoriesSchema from "../category/categories.schema";
class SubCategoriesValidation{

 createOne=[body('name').notEmpty().withMessage((val,{req})=>`${req.__('validation_field')}`)
    .isLength({min:2,max:50}).withMessage((val,{req})=>`${req.__('validation_length_short')}`),
    body('category')
    .notEmpty().withMessage((val,{req})=>`${req.__('validation_field')}`)
    .isMongoId().withMessage((val,{req})=>`${req.__('mongo_id')}`)
    .custom(async(val:string,{req})=>{
        const category=await categoriesSchema.findById(val);
        if(!category) throw new Error(`category with id ${val}${req.__('not_found')}`);
        return true
    })
    // .custom(async(val:string)=>{
    //     const category=await subcategorieSchema.findOne({name:val});
    //     if (category) throw new Error('category is already in use');
    //     return true;
    // })
    ,validatorMiddelware];
    UpdateOne=[
        param('id').isMongoId().withMessage((val,{req})=>`${req.__('mongo_id')}`)
        ,body('name').optional().isMongoId().withMessage((req:express.Request)=>`${req.__('mongo_id')}`)

        // .isLength({min:2,max:50}).withMessage('invalid length')
        // .custom(async(val:string,{req})=>{
        //     const category=await categoriesSchema.findOne({name:val});
        //     if (category && category._id!.toString()!=req.params?.id.toString()) throw new Error('category is already in use');
        //     return true;
        // })
        ,validatorMiddelware];

    getOne=[
        param('id').isMongoId().withMessage((val,{req})=>`${req.__('mongo_id')}`)
        // ,body('name').optional()
        // .isLength({min:2,max:50}).withMessage('invalid length')
        // .custom(async(val:string,{req})=>{
        //     const category=await categoriesSchema.findOne({name:val});
        //     if (category && category._id!.toString()!=req.params?.id.toString()) throw new Error('category is already in use');
        //     return true;})
        ,validatorMiddelware];

    deleteOne=[
        param('id').isMongoId().withMessage((val,{req})=>`${req.__('mongo_id')}`)
        // ,body('name').optional()
        // .isLength({min:2,max:50}).withMessage('invalid length')
        // .custom(async(val:string,{req})=>{
        //     const category=await categoriesSchema.findOne({name:val});
        //     if (category && category._id!.toString()!=req.params?.id.toString()) throw new Error('category is already in use');
        //     return true;
        // })
        ,validatorMiddelware];
}


const subcategoriesValidation=new SubCategoriesValidation();
export default subcategoriesValidation