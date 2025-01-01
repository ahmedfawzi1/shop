import {body, param} from "express-validator";
import categoriesSchema from "./cart.schema";
import validatorMiddelware from "../middelwaresErrors/validatormiddelware";
import userSchema from "../user/user.schema";
class CartValidation {
    
    addToCart = [
        body('product').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        body('user').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
            .custom(async(val:string,{req})=>{
                if(req.user._id){
                    val=req.user._id
                }
                else throw new Error(`${req.__('check_login')}`)
            }),
            validatorMiddelware
    ]
    clearCart = [
        body('user').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
            .custom(async(val:string,{req})=>{
                if(req.user._id){
                    val=req.user._id
                }
                else throw new Error(`${req.__('check_login')}`)
            }),
            validatorMiddelware
    ]
    
    updateOne = [
        param('itemId').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        body('user').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
        .custom(async(val:string,{req})=>{
            if(req.user._id){
                val=req.user._id
            }
            else throw new Error(`${req.__('check_login')}`)
        }),
        validatorMiddelware
    ]

    removeFromCart = [
        param('itemId').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        validatorMiddelware
    ]
}

const cartValidation=new CartValidation()
export default cartValidation