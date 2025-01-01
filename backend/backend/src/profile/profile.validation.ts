import { body, check, param } from "express-validator";
import { Request,Response,NextFunction } from "express";
import express from 'express'
import validatorMiddelware from "../middelwaresErrors/validatormiddelware";
import UserSchema from "../user/user.schema"
import asyncHandler from "express-async-handler";
import bcrypt from 'bcrypt' 
import { UserInterface } from "../user/user.interface";
import ApiErrors from "../utilsuses/ApiErrors";
import  Jwt  from "jsonwebtoken";
import sanitization from "../utilsuses/santization";
import decrypt  from "dotenv";

class ProfileValidation{
   
    UpdateOne=[
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
        createPassword=[
            body('currentPassword').notEmpty().withMessage((val,{req})=>`${req.__('validation_field')}`)
            .isLength({min:2,max:50}).withMessage((val,{req})=>`${req.__('validation_length_short')}`),
            body('password').notEmpty().withMessage((val,{req})=>`${req.__('validation_field')}`)
            .isLength({min:2,max:50}).withMessage((val,{req})=>`${req.__('validation_length_short')}`)
            ,
            body('confirmPassword').notEmpty().withMessage((val,{req})=>`${req.__('validation_field')}`)
            .isLength({min:2,max:50}).withMessage((val,{req})=>`${req.__('validation_length_short')}`)
            .custom(async(val:string,{req})=>{
                if(val!==req.body.password){
                throw new Error(`${req.__('validation_password_match')}`)
                }
                return true;
            }),
            validatorMiddelware
        ]
        // .custom(async(val:string,{req})=>{
        //     const isValidPassword=decrypt.compare(val,user)
        //     if(val !==req.body.password) throw new Error(`${req.__('validation_password.match')}`)
        // })
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
        .custom(async(val,{req})=>{
            if(val===req.body.currentPassword){
                throw new Error(`enter another password, this already used`) 

            }
            return true;
        })
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

const profileValidation=new ProfileValidation();
export default profileValidation