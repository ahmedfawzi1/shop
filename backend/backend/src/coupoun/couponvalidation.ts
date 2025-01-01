import { body, param } from "express-validator";
import express from 'express'
import couponSchema from "./coupon.schema";
import validatorMiddelware from "../middelwaresErrors/validatormiddelware";
class CouponValidation{
//  i witll replace this message to =this=====>to translate error to other message
// withMessage('category ..name is required')====>withMessage((req:Request)=>req.__'validation_field')
 createOne=[
    body('name')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short')),
        body('discount')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isFloat({min: 1, max: 100}).withMessage((val, {req}) => req.__('validation_value')),
        body('expireTime')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isDate().withMessage((val, {req}) => req.__('validation_value'))

    ,validatorMiddelware];
    UpdateOne=[
        param('id').isMongoId().withMessage((val,{req})=>`${req.__('mongo_id')}`),
        body('name').optional()
        .isLength({min:2,max:50}).withMessage((val,{req})=>`${req.__('validation_length_short')}`),
        body('discount').optional()
        .isFloat({min:1, max:100}).withMessage((val,{req})=>`${req.__('validation_value')}`),
        body('expireTime').notEmpty().optional()
        .isDate().withMessage((val,{req})=>`${req.__('validation_length_short')}`)
    
    

        
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


const couponValidation=new CouponValidation();
export default couponValidation