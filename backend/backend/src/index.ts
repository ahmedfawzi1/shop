import categoriesRouter from "./category/categories.routes";
import subcategoriesRouter from "./subcategries/subcategories.route";
import globalErrors from "./middelwaresErrors/middelwares.error";
import ApiErrors from "./utilsuses/ApiErrors";
import express from 'express';
import { Request,Response,NextFunction } from "express";
import productRouter from "./product/product.route";
import userRouter from "./user/user.routes";
import authRouter from "./authenticator/auth.route"
import { UserInterface } from "./user/user.interface";
import profileRouter from "./profile/profile.routes";
import googleRouter from "./google/google.router"
import WishlistRouter from "./wishlist/wishlist.routes";
import AddressRouter from "./address/address.routes";
import ReviewsRouter from "./reviews/reviews.routes";
import cartRouter from "./carts/cart.route";
import couponRouter from "./coupoun/coupon.routes";
import cookieParser from "cookie-parser";
import cors from 'cors'
import compression from "compression";
import csurf from "csurf";
import orderRouter from "./orders/orders.routes";
// import googleRouter from
// declare module "express"{
//     interface Request{
//         filterData?:any;
//     }
// }

declare module  "express"{
    interface Request{
        filterData?:any
        req?:any
        files?:any
        user?:any
    }
}

const mountRoutes=(app:express.Application)=>{
    app.use("/auth/google",googleRouter);
    app.use(
        csurf({
            cookie: {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            },
        }),
    );
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.cookie('cookies', req.csrfToken());
        next();
    });

    app.use("/api/v1/categories",categoriesRouter)
    app.use('/api/v1/subcategories',subcategoriesRouter);
    app.use('/api/v1/products',productRouter);
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/user",userRouter)
    app.use("/api/v1/cart",cartRouter)
    app.use("/api/v1/coupon",couponRouter)
    app.use("/api/v1/profile",profileRouter)
    app.use("/api/v1/wishlist",WishlistRouter)
    app.use("/api/v1/address",AddressRouter)
    app.use("/api/v1/reviews",ReviewsRouter)
    app.use("/api/v1/order",orderRouter)










//errors    
// error for notfound category or product  
     app.all("*",(req:Request,res:Response,next:NextFunction)=>{
        // const error= new Error('route/ele not found');
        next(new ApiErrors(`route ${req.originalUrl} is not found please solve it`,400));
        
    });
    app.use(globalErrors);

    //  الفنكشن دي هي والفنكشن الموجوده اخر حاجه في ملف الاندكس كنت بستخدمهم عشان اعمل كرييت لل ايرور وابتدي 
    // استخدمه لكن وقفتهم عشان هستبدلهم بملفات الميدويير الديفلوب والبرودكشن والجلوبال
    // app.all("*",(req:express.Request,res:express.Response,next:NextFunction)=>{
    //     const error= new Error('route/ele not found');
    //     next(error);
    // });


};

export default mountRoutes;

