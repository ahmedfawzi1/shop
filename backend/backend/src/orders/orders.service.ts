import {Request,Response,NextFunction, RequestHandler} from "express";
import { OrdersInterface } from "./orders.interface";
import orderSchema from "./orders.schema";
import asyncHandler from "express-async-handler";
import refactorSchemaService from "../refactorysechmaservices";
import { CartItems, Carts } from "../carts/cart.interface";
import cartSchema from "../carts/cart.schema";
import ApiErrors from "../utilsuses/ApiErrors";
import productSchema from "../product/product.schema";
class OrderService{
    filterOrders(req:Request,res:Response,next:NextFunction){
       const filterData:any={}
        if (req.user.role=='user'){
            // req.filterData.user={user:req.user._id}
            filterData.user=req.user._id
            req.filterData=filterData
            next()
        }
    }
// handel service for all schemas
   getAll=refactorSchemaService.getAll<OrdersInterface>(orderSchema);
    createCashOrder=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const cart:any= await cartSchema.findOne({user:req.user._id});
        if (!cart) return next(new ApiErrors('cart is empty', 404))

        const ItemsPrice:number=cart.totalPriceAfterDiscount ? 
        cart.totalPriceAfterDiscount : cart.totalPrice
        const order=await orderSchema.create({
            items:cart.items,
            taxPrice:cart.taxPrice,
            itemsPrice: ItemsPrice,
            totalPrice:cart.taxPrice +ItemsPrice ,
            user:req.user._id  ,
            address:req.body.address ,
        })

        const bulkOptions:any=cart.items.map((item:CartItems)=>({
            updateOne:{
                filter:{_id:item.product._id},
                update: {$inc: {quantity: -item.quantity,sold:item.quantity}}
            }
        }))
        console.log('true1')

            await productSchema.bulkWrite(bulkOptions);
            await order.save()
            // await cartSchema.deleteOne({user: req.user?._id});
            res.status(201).json({data: order})
     });  
     payOrder=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const order=await orderSchema.findByIdAndUpdate(req.params.id,{
            isPaid:true,
            paidAt:Date.now()},
            {new:true})
            res.status(200).json({success:true})
     }); 
     deliverOrder=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const order=await orderSchema.findByIdAndUpdate(req.params.id,{
            isDelievered:true,
            deliveredAt:Date.now()
        },
            {new:true})
            res.status(200).json({success:true})
     });  
   getOne=refactorSchemaService.getOne<OrdersInterface>(orderSchema);
   updateOne=refactorSchemaService.updateOne<OrdersInterface>(orderSchema)
   deleteOne=refactorSchemaService.deleteOne<OrdersInterface>(orderSchema);
   //  getAll=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
   //      const categories:Categories[]=await categoriesSchema.find();
   //      res.status(200).json({data:categories});

   //  })
   //  // async createOne(req:Request,res:Response,next:NextFunction){
   //  //     const categories: Categories=await categoriesSchema.create(req.body);
   //  //     res.status(201).json({data:categories});
   //  //  }
   //  createOne=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
   //      const categories: Categories= await categoriesSchema.create(req.body);
   //      res.status(201).json({data:categories})
   //   });

   //   getOne=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
   //      const categories: Categories | null= await categoriesSchema.findById(req.params.id);
   //      res.status(201).json({data:categories})
   //   });

   //   updateOne=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
   //      const categories: Categories| null= await categoriesSchema.findByIdAndUpdate(req.params.id,req.body,{new:true});
   //      res.status(200).json({data:categories})
   //   });
   //   deleteOne=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
   //      const categories:Categories|null=await categoriesSchema.findByIdAndDelete(req.params.id);
   //      res.status(204).json()
   //   });
    };
const orderService =new OrderService() ;
export default orderService;
