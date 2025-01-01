import { body, param } from "express-validator";
import express from 'express'
import categoriesSchema from "./reviews.schema";
import validatorMiddelware from "../middelwaresErrors/validatormiddelware";
import reviewsSchema from "./reviews.schema";
import { error } from "console";
class ReviewsValidation{
//  i witll replace this message to =this=====>to translate error to other message
// withMessage('category ..name is required')====>withMessage((req:Request)=>req.__'validation_field')
 createOne=[
    body('comment').notEmpty().withMessage((val,{req})=>`${req.__('validation_field')}`)
    .isLength({min:2,max:150}).withMessage((val,{req})=>`${req.__('validation_length_medium')}`),
    body('rate').notEmpty().withMessage((val,{req})=>`${req.__('validation_field')}`)
    .isFloat({min:1 , max:5}).withMessage((val,{req})=>`${req.__('validation_value')}`),
    body('user').notEmpty().withMessage((val,{req})=>`${req.__('validation_field')}`)
    .isMongoId().withMessage((val,{req})=>`${req.__('mongo_id')}`),

    body('product').notEmpty().withMessage((val,{req})=>`${req.__('validation_field')}`)
    .isMongoId().withMessage((val,{req})=>`${req.__('mongo_id')}`)
    // .custom(async(val:string,{req})=>{
    //     const review=await reviewsSchema.findOne({user:req.user._id,product:val})
    //     if(review) throw new Error(`you already create review before`)
    //         return true;
    // })


    ,validatorMiddelware];
    UpdateOne=[
        param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
        .custom(async (val, {req}) => {
            const review = await reviewsSchema.findById(val);
            if (review?.user._id!.toString() !== req.user._id.toString()) throw new Error(`you can't update this review`);
            return true;
        }),
        // param('id').isMongoId().withMessage((val,{req})=>`${req.__('invalid_id')}`)
        // .custom(async(val:string,{req})=>{
        //     const review=await reviewsSchema.findById(val)
        //     if(review?.user!.toString()!==req.user._id.toString())  throw new Error(`you can't update this review`)
        //     return true
        // }),
        body('comment').optional()
        .notEmpty().withMessage((val,{req})=>`${req.__('validation_field')}`)
        .isLength({min:2,max:150}).withMessage((val,{req})=>`${req.__('validation_length_medium')}`)
,
        body('rate').optional()
        .isFloat({min:1 , max:5}).withMessage((val,{req})=>`${req.__('validation_value')}`)
        // ,body('name').optional()
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
        // param('id')
        // .isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
        // .custom(async (val, {req}) => {
        //     if (req.user.role === 'user') {
        //         const review = await reviewsSchema.findById(val);
        //         if (review?.user._id!.toString() !== req.user._id.toString()) throw new Error(`you can't delete this review`);
        //     }
        //     return true;
        // }),
        param('id').isMongoId().withMessage((val,{req})=>`${req.__('mongo_id')}`)
        .custom(async(val,{req})=>{
            if(req.user.role==='user'){
            const review=await reviewsSchema.findById(val)
            if (review?.user._id!.toString() !== req.user._id.toString()) throw new Error(`you can't delete this review`);
            // if(!['admin','employess'].includes(req.user.role))  throw new Error(`you can't delete this review`)

            }
            return true
        })
        // ,body('name').optional()
        // .isLength({min:2,max:50}).withMessage('invalid length')
        // .custom(async(val:string,{req})=>{
        //     const category=await categoriesSchema.findOne({name:val});
        //     if (category && category._id!.toString()!=req.params?.id.toString()) throw new Error('category is already in use');
        //     return true;
        // })
        ,validatorMiddelware];
}


const reviewsValidation=new ReviewsValidation();
export default reviewsValidation