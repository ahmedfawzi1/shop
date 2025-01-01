import { body, check, param } from "express-validator";
import bcrypt from 'bcrypt'
import express from 'express'
import validatorMiddelware from "../middelwaresErrors/validatormiddelware";
import UserSchema from "./user.schema"
import userSchema from "./user.schema";

class UserValidation{
//  i witll replace this message to =this=====>to translate error to other message
// withMessage('category ..name is required')====>withMessage((req:Request)=>req.__'validation_field')
     createOne=[
     body('username').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short'))
            .custom(async (val: string, {req}) => {
                const user = await UserSchema.findOne({username: val});
                if (user) throw new Error(`${req.__('validation_email_check')}`);
                return true;
            }),
        body('email').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isEmail().withMessage((val, {req}) => req.__('validation_value'))
            .custom(async (val: string, {req}) => {
                const user = await UserSchema.findOne({email: val});
                if (user) throw new Error(`${req.__('validation_email_check')}`);
                return true;
            }),
        body('name')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short')),
        check('role').optional()
        .custom((val:string,{req})=>{
            req.body.role='admin'
            return true;
        })
            ,
            body('password')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password')),
        body('confirmPassword')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password'))
            .custom((val: string, {req}) => {
                if (val !== req.body.password ) throw new Error(`${req.__('validation_password_match')}`);
                return true;
            }),
        validatorMiddelware
    ]
    UpdateOne=[
        param('id').isMongoId().withMessage((val,{req})=>`${req.__('mongo_id')}`),
        body('name').optional()
        .isLength({min:2,max:50}).withMessage((val,{req})=>req.__(`validation_length_short`))
        ,body('active').optional()
        .isBoolean().withMessage('active must be true or false')
        // .custom(async(val:string,{req})=>{
        //     const category=await categoriesSchema.findOne({name:val});
        //     if (category && category._id!.toString()!=req.params?.id.toString()) throw new Error('category is already in use');
        //     return true;
        // })
        ,validatorMiddelware];
    // changePassword=[
    //     param('id').isMongoId().withMessage((val,{req})=>`${req.__('mongo_id')}`),
    //     body('password').notEmpty().withMessage((val,{req})=>`${req.__('validation_field')}`)
    //     .isLength({min:2,max:50}).withMessage((val,{req})=>`${req.__('validation_length_short')}`)
    //     ,
    //     body('confirmPassword').notEmpty().withMessage((val,{req})=>`${req.__('validation_field')}`)
    //     .isLength({min:2,max:50}).withMessage((val,{req})=>`${req.__('validation_length_short')}`)
    //     .custom(async(val:string,{req})=>{
    //         if(val!==req.body.password){
    //         throw new Error(`${req.__('validation_password_match')}`)
    //         }
    //         return true;
    
    //     }),
    //     validatorMiddelware
    // ]
    changePassword=[
        body('currentPassword').notEmpty().withMessage((val,{req})=>`${req.__('validation_field')}`)
        .isLength({min:2,max:50}).withMessage((val,{req})=>`${req.__('validation_length_short')}`)
            .custom(async(val:string,{req})=>{
            const isValidPassword=await bcrypt.compare(val,req.user.password)

            console.log(isValidPassword)
            if(!isValidPassword) throw new Error(`${req.__('invalid_id')}`) 
            // if(val !== req.user.password) throw new Error(`${req.__('validation_password_match')}`)
        })
        ,
        body('password').notEmpty().withMessage((val,{req})=>`${req.__('validation_field')}`)
        .isLength({min:2,max:50}).withMessage((val,{req})=>`${req.__('validation_length_short')}`)
        ,
        body('confirmPassword').notEmpty().withMessage((val,{req})=>`${req.__('validation_field')}`)
        .isLength({min:2,max:50}).withMessage((val,{req})=>`${req.__('validation_length_short')}`)
        
        .custom(async(val:string,{req})=>{
            console.log(`val is,${val}`)

            if(val!==req.body.password){
                console.log(`wrong val is,${val}`)

            throw new Error(`${req.__('validation_password_match')}`)
            }

            return true;
    
        }),
        validatorMiddelware
    ]
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

const userValidation=new UserValidation();
export default userValidation