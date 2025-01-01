import { body, param } from "express-validator";
import express from 'express'
import validatorMiddelware from "../middelwaresErrors/validatormiddelware";
import UserSchema from "../user/user.schema"
import userSchema from "../user/user.schema";

class AuthValidation{
//  i witll replace this message to =this=====>to translate error to other message
// withMessage('category ..name is required')====>withMessage((req:Request)=>req.__'validation_field')
     signup=[
    //  body('username').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
    //         .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short'))
    //         .custom(async (val: string, {req}) => {
    //             const user = await UserSchema.findOne({username: val});
    //             if (user) throw new Error(`${req.__('validation_email_check')}`);
    //             return true;
    //         }),
            
    //     body('email').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
    //         .isEmail().withMessage((val, {req}) => req.__('validation_value'))
    //         .custom(async (val: string, {req}) => {
    //             const user = await UserSchema.findOne({email: val});
    //             if (user) throw new Error(`${req.__('validation_email_check')}`);
    //             return true;
    //         }),
    //     body('name')
    //         .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
    //         .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short')),
    //     body('role').optional()
    //         .custom((val:string,{req})=>{
    //             req.body.role='user'
    //             return true;
    //         })
    //         ,
    //     body('password')
    //         .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
    //         .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password')),
    //     body('confirmPassword')
    //         .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
    //         .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password'))
    //         .custom((val: string, {req}) => {
    //             if (val !== req.body.password ) throw new Error(`${req.__('validation_password_match')}`);
    //             return true;
    //         }),
    //     validatorMiddelware
    body('username').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short'))
            .custom(async (val: string, {req}) => {
                const user = await userSchema.findOne({username: val});
                if (user) throw new Error(`${req.__('validation_email_check')}`);
                return true;
            }),
        body('email').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isEmail().withMessage((val, {req}) => req.__('validation_value'))
            .custom(async (val: string, {req}) => {
                const user = await userSchema.findOne({email: val});
                if (user) throw new Error(`${req.__('validation_email_check')}`);
                return true;
            }),
        body('name')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short')),
        body('password')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password')),
        body('confirmPassword')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password'))
            .custom((val: string, {req}) => {
                if (val !== req.body.password) throw new Error(`${req.__('validation_password_match')}`);
                return true;
            }),
        validatorMiddelware
    ]

//     login=[
//         body('username').isEmail().withMessage((val, {req}) => req.__('check_email'))
//         .custom(async(val: string, {req}) => {
//             let username=await userSchema.findOne({username:req.body.val})
//             if (val !== req.body.username) throw new Error(`${req.__('check_email')}`);
//             return true;
//         })
// ||
//         body('username').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
//         .custom(async(val: string, {req}) => {
//             let username=await userSchema.findOne({username:req.body.val})
//             if (val !== req.body.username) throw new Error(`${req.__('invalid_login')}`);
//             return true;
//         }) ,
            
//             body('password')
//                 .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
//                 .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password')),
    
//             validatorMiddelware
//         ]
    login=[
        body('username').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            // .isEmail().withMessage((val, {req}) => req.__('validation_value'))

       ,
        body('password')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password')),

        validatorMiddelware
    ]
       forgetPassword=[

        body('email').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isEmail().withMessage((val, {req}) => req.__('validation_value')),

        validatorMiddelware
    ]
    ;
    changePassword = [
        body('password')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password')),
        body('confirmPassword')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password'))
            .custom((val: string, {req}) => {
                if (val !== req.body.password) throw new Error(`${req.__('validation_password_match')}`);
                return true;
            }),
        validatorMiddelware
    ]
}

const authValidation=new AuthValidation();
export default authValidation