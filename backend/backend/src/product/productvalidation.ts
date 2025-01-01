import { body, param } from "express-validator";
import express from 'express'
import productSchema from "./product.schema";
import { Request,Response,NextFunction } from "express";
import validatorMiddelware from "../middelwaresErrors/validatormiddelware";
import subcategoriesSchema from "../subcategries/subcategories.schema";
import categoriesSchema from "../category/categories.schema";
class Productvalidation{

     createOne=
     [
    body('name').notEmpty().withMessage((val,{req})=>req.__('validation_field'))
    .isLength({min:2,max:50}).withMessage((val,{req})=>req.__('validation_length_short')),
    body('description').notEmpty().withMessage((val,{req})=> req.__('validation_field'))
    .isLength({min:2,max:500}).withMessage((val,{req})=>req.__('validation_length_short')),
    body('price').notEmpty().withMessage((val,{req})=> req.__('validation_value'))
    .isFloat({min:1,max:1000}).withMessage((val,{req})=>req.__('validation_length_short')),
    body('discount').optional()
    .custom((val,{req})=>{
        if(req.body.discount > 0){
        req.body.priceAfterDiscount= req.body.price-(req.body.price*req.body.discount/100)
    }
        return true
    }),
    body('category')
    .isMongoId().withMessage((val,{req})=> req.__('not_found'))
    .custom(async(val:string,{req})=>{
        const category=await categoriesSchema.findById(val);
        if(!category) throw new Error(`category with id ${val}${req.__('invalid_id')}`);
        return true
    }),
    body('subcategory')
    .notEmpty().withMessage((val,{req})=>`${req.__('validation_field')}`)
    .isMongoId().withMessage((val,{req})=>`${req.__('mongo_id')}`)
    .custom(async(val:string,{req})=>{
        const subcategory=await subcategoriesSchema.findById(val);
        if(!subcategory)  throw new Error(`category with id ${req.__('not_found')}`);
        if(subcategory.category._id!.toString() !=req.body.category.toString()) throw new Error(`subcategory with id ${val} not belong to this category`);
        return true
    }),
        validatorMiddelware
    ]
    //  [
//      body('name')
//      .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
//      .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short')),
//      body('description')
//      .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
//      .isLength({min: 2, max: 500}).withMessage((val, {req}) => req.__('validation_length_long')),
//  body('price')
//      .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
//      .isFloat({min: 1, max: 10000000}).withMessage((val, {req}) => req.__('validation_value')),
//  body('quantity').optional()
//      .isInt({min: 1, max: 10000000}).withMessage((val, {req}) => req.__('validation_value')),
//  body('discount').optional()
//      .isFloat({min: 1, max: 100}).withMessage((val, {req}) => req.__('validation_value'))
//      .custom((val, {req}) => {
//          req.body.priceAfterDiscount = req.body.price - (req.body.price * val / 100)
//          return true;
//      }),
//      body('category')
//      .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
//      .isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
//      .custom(async (val: string, {req}) => {
//          const category = await categoriesSchema.findById(val);
//          if (!category) throw new Error(`${req.__('validation_value')}`);
//          return true;
//      }),
//  body('subcategory')
//      .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
//      .isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
//      .custom(async (val: string, {req}) => {
//          const subcategory = await subcategoriesSchema.findById(val);
//          if (!subcategory || subcategory.category._id!.toString() !== req.body.category.toString()) throw new Error(`${req.__('validation_value')}`);
//          return true;
//      }),
//      validatorMiddelware
// ]
     
        // if(subcategory.category._id.toString()!=req.body.category.toString)

    //  (async(req:Request,res:Response,next:NextFunction)=>{
        
    //  // if(req.params.categoryId && !req.body.category) req.body.category=req.params.categoryId
    //  const product:productInterface=await productSchema.create(req.body);
    //  res.status(201).json({data:product});
 
    //  });
 
//  [


    // body('description').notEmpty().withMessage((val,{req})=>`product description ${req.__('validation_field')}`)
    // .isLength({min:2,max:500}).withMessage((req:express.Request)=>`${req.__('validation_length_short')}`),

    // body('price').notEmpty().withMessage((val,{req})=>` ${req.__('validation_value')}`)
    // .isFloat({min:1,max:1000}).withMessage((req:express.Request)=>`${req.__('validation_length_short')}`),

    // body('discount').optional()
    // .isFloat({min:1,max:1000}).withMessage((req:express.Request)=>`${req.__('validation_length_short')}`)
    // .custom((val,{req})=>{
    //     req.body.priceAfterDiscount= req.body.price-(req.body.price*req.body.val/100)
    //     return true
    // }),
    // body('quantity').optional()
    // .isInt({min:0,max:1000}).withMessage((req:express.Request)=>`${req.__('validation_length_short')}`),

    // body('category')
    // .isMongoId().withMessage((req:express.Request)=>`${req.__('mongo_id')}`)
    // .custom(async(val:string,{req})=>{
    //     const category=await categoriesSchema.findById(val);
    //     if(!category) throw new Error(`category with id ${val}${req.__('invalid_id')}`);
    //     return true
    // }),
    // body('subcategory')
    // .notEmpty().withMessage((req)=>`${req.__('validation_field')}`)
    // .isMongoId().withMessage((req:express.Request)=>`${req.__('mongo_id')}`)
    // .custom(async(val:string,{req})=>{
    //     const subcategory=await subcategoriesSchema.findById(val);
    //     if(!subcategory)  throw new Error(`category with id {req.__('not_found')}`);
    //     if(subcategory.category._id!.toString() !=req.body.category.toString) throw new Error(`subcategory with id ${val} not belong to this category`);

    //     // if(subcategory.category._id.toString()!=req.body.category.toString)
    //     return true
    // }) ,validatorMiddelware];

    // .custom(async(val:string)=>{
    //     const category=await subcategorieSchema.findOne({name:val});
    //     if (category) throw new Error('category is already in use');
    //     return true;
    // }) 
        // ,validatorMiddelware]
    UpdateOne=[
        param('id').isMongoId().withMessage((val,{req})=> `${req.__('not_found')}`),
        body('name').optional()
        .isLength({min:2,max:50}).withMessage((val,{req})=>`${req.__('validation_length_short')}`),    
        // .isLength({min:2,max:50}).withMessage('invalid length')
        // .custom(async(val:string,{req})=>{
        //     const category=await categoriesSchema.findOne({name:val});
        //     if (category && category._id!.toString()!=req.params?.id.toString()) throw new Error('category is already in use');
        //     return true;
        // })
        body('description').optional()
        .isLength({min:2,max:500}).withMessage((val,{req})=>`${req.__('validation_length_short')}`),
    
        body('price').optional()
        .isFloat({min:1,max:1000}).withMessage((val,{req})=>`${req.__('validation_length_short')}`)
,
    
        body('discount').optional()
         .isFloat({min:1,max:1000}).withMessage((val,{req})=>`${req.__('validation_length_short')}`)
        .custom(async(val,{req})=>{
            const product=await productSchema.findById(req.params?.id)
            console.log(`product price ${product?.price}`);
            req.body.price=product?.price
            if(req.body.discount! ||req.body.discount! && !product?.price)
            req.body.priceAfterDiscount= req.body.price-(req.body.price*req.body.discount/100)
            return true
    }),

        body('quantity').optional()
        .isInt({min:0,max:1000}).withMessage((val,{req})=>`${req.__('validation_length_short')}`),
    
        body('category').optional()
        .isMongoId().withMessage((val,{req})=>`${req.__('mongo_id')}`)
        .custom(async(val:string,{req})=>{
            const category=await categoriesSchema.findById(val);
            if(!category) throw new Error(`category with id ${val}${req.__('invalid_id')}`);
            return true;
        }),

        body('subcategory').optional()
        .isLength({min:2,max:500}).withMessage((val,{req})=>`${req.__('validation_length_short')}`)
        .isMongoId().withMessage((val,{req})=>`${req.__('mongo_id')}`)
        .custom(async(val:string,{req})=>{
            const subcategory=await subcategoriesSchema.findById(val);
            if(!subcategory )  throw new Error(`subcategory with id ${val}${req.__('not_found')}`);
            // if(subcategory.category._id!.toString() !=req.body.category.toString()) throw new Error(`subcategory with id ${val} not belong to this category`);
            if(subcategory.category._id! && !req.body.category || subcategory.category._id ){
                req.body.category=subcategory.category._id
            }
            // if(subcategory.category._id.toString()!=req.body.category.toString)
            return true
        })
        ,validatorMiddelware];

    getOne=[
        // (val,{req})=>`${req.__('validation_field')}`
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


const productvalidation=new Productvalidation();
export default productvalidation;