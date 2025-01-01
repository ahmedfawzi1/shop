// import { Request,Response,NextFunction } from "express";
// import asyncHandler from "express-async-handler";
// import UserSchema from "../user/user.schema";
// import bcrypt from "bcrypt"
// import Jwt from 'jsonwebtoken'
// import ApiErrors from "../utilsuses/ApiErrors";
// import createToken  from "../utilsuses/create.tokens";
// import sanitization from "../utilsuses/santization";
// import userSchema from "../user/user.schema";
// import { check } from "express-validator";

// const createToken= function(payload:any){
//        return jwt.sign({_id:payload},process.env.JWT_KEY!,{expiresIn:process.env.JWT_EXPIRE})
// }
// class AuthService {
//     signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//         const user = await UserSchema.create({
//             username: req.body.username,
//             password: req.body.password,
//             name: req.body.name,
//             email: req.body.email,
//             image: req.body.image
//         });
//     // const token = createToken.accessToken(user._id, user.role);
//     // const token = createToken.accessToken(user._id, user.role);
//     // res.status(201).json({token, data: sanitization.User(user)});
//             // const token =Jwt.sign({username:user.username,password:user.password,email:user.email},process.env.JWT_KEY!,{expiresIn:process.env.JWT_EXPIRE})


//     const token=Jwt.sign({_id:user._id,role:user.role},process.env.JWT_KEY!,{expiresIn:process.env.JWT_EXPIRE})
//     //     console.log(token)

//         res.status(201).json({token, data: sanitization.User(user)});

//         // res.status(201).json({token, data: user});
//     });
//     // !(await bcrypt.compare(req.body.password,user.password))
//         // const token =Jwt.sign({username:user.username,password:user.password,email:user.email},process.env.JWT_KEY!,{expiresIn:process.env.JWT_EXPIRE})
//         // const token = createTokens.accessToken(user._id, user.role);


//         // res.status(201).json({token, data: sanitization.User(user)});
//      login = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
//     const user=await UserSchema.findOne({$or:[{email:req.body.email},{email:req.body.password}]})
//     if(!user ||user.hasPassword==false ||  !(await bcrypt.compare(req.body.password,user.password)) ){
//         return next (new ApiErrors('invalid email password',401));
//     }
//     const token=Jwt.sign({_id:user._id,role:user.role},process.env.JWT_KEY!,{expiresIn:process.env.JWT_EXPIRE})
//         // const token = createToken.accessToken(user._id, user.role);

//         res.status(200).json({token, data: sanitization.User(user)});
//     res.status(200).json({token,message:'logged in successfully',data:user})
// })


// // protectRoute = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
// //     let token: string;
// //     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
// //         token = req.headers.authorization.split('')[1] 
// //         console.log('true1');
// //     }
// //     else {
// //         console.log('true2');
// //         return next(new ApiErrors(`${req.__('check_login')}`, 401))
// //     }
// //     const decoded: any = Jwt.verify(token, process.env.JWT_KEY!)
// //     console.log('true3');

// //     const user = await UserSchema.findById(decoded._id);
// //     if (!user) return next(new ApiErrors(`${req.__('check_login')}`, 401));
// //     console.log('true4');

// //     if (user.passwordChangedAt instanceof Date) {
// //         console.log('true4');

// //         const changedPasswordTime: number = Math.trunc(user.passwordChangedAt.getTime() / 1000);
// //         if (changedPasswordTime > decoded.iat) return next(new ApiErrors(`${req.__('check_password_changed')}`, 401));
// //         console.log('true5');
// //     }
// //     req.user = user;
// //     console.log(req.user)
// //     // req.user = user;
// //     next();
// // })
// protectedRoutes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     let token: string = '';
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
//         token = req.headers.authorization.split(' ')[1];
//     else return next(new ApiErrors(`${req.__('check_login')}`, 401));
//     const decoded: any = Jwt.verify(token, process.env.JWT_KEY!);
//     const user = await UserSchema.findById(decoded._id);
//     if (!user) return next(new ApiErrors(`${req.__('check_login')}`, 401));
//     if (user.passwordChangedAt instanceof Date) {
//         const changedPasswordTime: number = Math.trunc(user.passwordChangedAt.getTime() / 1000);
//         if (changedPasswordTime > decoded.iat) return next(new ApiErrors(`${req.__('check_password_changed')}`, 401));
//     }
//     req.user = user;
//     next();
// });

// // 
// //  protcetRoutes=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
// //     let token:string="";
// //     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
// //         token=req.headers.authorization.split(' ')[1]
// //         console.log(`true1`)
// //     }
// //     else{console.log(`true2`) 
// //         return next(new ApiErrors(`${req.__('check_login')}`, 401))
    

// // }

// //     // decode token
// //     console.log(`true3`)
// //     const decodeToken:any=Jwt.verify(token,process.env.JWT_KEY!)
// //     console.log(`true4`)

// //     // check if user still exists in db
// //     const user= await UserSchema.findById(decodeToken._id)
// //     if(!user){
// //         console.log(`true5`)
// //         return next(new ApiErrors(`${req.__('check_login')}`, 401))
// //     }
// //     if(user.passwordChangedAt instanceof Date){
// //         const changeTime=parseInt((user.passwordChangedAt.getTime()/1000).toString())
// //         console.log(`true6`)
// //         if(changeTime > decodeToken.iat){
// //             return next(new ApiErrors(`${req.__('session_expired')}`, 401))
// //             console.log(`true7`)

// //         }
// //         console.log(`true8`)
// //     }
// //     console.log(`true9`)
// //     req.user=user;
// //     next();
// // })

// checkActive = asyncHandler((req:Request,res:Response,next:NextFunction)=>{
//     if(!req.user?.active){
//         return next(new ApiErrors(`${req.__('check_active')}`, 403))
//     }
//     next()
// })
//  allowedTo=(...role:string[])=>{
//     asyncHandler((req:Request,res:Response,next:NextFunction)=>{
//         if(!(role.includes(req.user?.role))){
//             return next(new ApiErrors(`${req.__('allowed_to')}`, 403))

//         }
//         next();
//     })

// }

// }
// // export const login = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
// //     const user=await userSchema.findOne({email:req.body.email})
// //     if(!user || await bcrypt.compare(req.body.password,user.password) ){
// //         return next (new ApiErrors('invalid email password',401));
// //     }

//     // const token=Jwt.sign({_id:user._id,role:user.role},process.env.JWT_KEY!,{expiresIn:process.env.JWT_EXPIRE})
  




// const authService=new AuthService();
// export default authService;

import {NextFunction, Request, Response} from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import UserSchema from "../user/user.schema";
import ApiErrors from "../utilsuses/ApiErrors";
import createTokens from "../utilsuses/create.tokens";
import sanitization from "../utilsuses/santization";
import { console } from "inspector";
import { request } from "http";
import crypto from 'crypto'
import sendEmail from "../utilsuses/sendMail";
import { Schema } from "mongoose";
import userSchema from "../user/user.schema";
class AuthService {
    signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await userSchema.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
            image: req.body.image
        });
        const token = createTokens.accessToken(user._id, user.role);
        res.status(201).json({token, data: sanitization.User(user)});
    });
    //     signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //     const user = await UserSchema.create({
    //         username: req.body.username,
    //         password: req.body.password,
    //         name: req.body.name,
    //         email: req.body.email,
    //         image: req.body?.image,
    //         role:req.body.role
    //     });

    //     // const token=createTokens.accessToken(user._id,user.role)
    //     const token = createTokens.accessToken(user?._id, user?.role!)
    //     // const token=Jwt.sign({_id:user._id,role:user.role},process.env.JWT_KEY!,{expiresIn:process.env.JWT_EXPIRE})
    //     // const token = createTokens.accessToken(user._id, user.role);

    // res.status(201).json({token, data: sanitization.User(user)});

    //     // const token = createTokens.accessToken(user?._id, user?.role!)
    // });

    login = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const user=await UserSchema.findOne({$or:[{username: req.body.username}, {email: req.body.username}]})
        if(!user ||user.hasPassword==false ||  !(await bcrypt.compare(req.body.password,user.password)) ){
            return next (new ApiErrors('invalid email password',401));
        }
        // const token=createTokens.accessToken(user._id,user.role)
    
        const token = createTokens.accessToken(user._id, user.role)
        // const token = createToken.accessToken(user._id, user.role);
                // const token =Jwt.sign({username:user.username,password:user.password,email:user.email},process.env.JWT_KEY!,{expiresIn:process.env.JWT_EXPIRE})
    
            res.status(200).json({token, data: sanitization.User(user)});
        res.status(200).json({token,message:'logged in successfully',data:user})
    })

    // const token = createToken.accessToken(user._id, user.role);
    // const token = createToken.accessToken(user._id, user.role);
    // res.status(201).json({token, data: sanitization.User(user)});
            // const token =Jwt.sign({username:user.username,password:user.password,email:user.email},process.env.JWT_KEY!,{expiresIn:process.env.JWT_EXPIRE})


    //     console.log(token)


        // res.status(201).json({token, data: user});
    // !(await bcrypt.compare(req.body.password,user.password))
        // const token =Jwt.sign({username:user.username,password:user.password,email:user.email},process.env.JWT_KEY!,{expiresIn:process.env.JWT_EXPIRE})
        // const token = createTokens.accessToken(user._id, user.role);


        // res.status(201).json({token, data: sanitization.User(user)});
//      login = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
//     const user=await UserSchema.findOne({$or:[{username:req.body.username},{email:req.body.username}]})
//     if(!user ||user.hasPassword==false ||  !(await bcrypt.compare(req.body.password,user.password)) ){
//         return next (new ApiErrors('invalid email password',401));
//     }
//     const token = createTokens.accessToken(user._id, user.role)
//     res.status(200).json({token,message:'logged in successfully',data:user})
//     res.status(200).json({token, data: sanitization.User(user)});
// })
// login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     const user = await userSchema.findOne({$or: [{username: req.body.username}, {email: req.body.username}]});
//     if (!user || user.hasPassword == false || !(await bcrypt.compare(req.body.password, user.password)))
//         return next(new ApiErrors(`${req.__('invalid_login')}`, 400));
//     const token = createTokens.accessToken(user._id, user.role);
//     // res.status(200).json({token, data: sanitization.User(user)});
//     res.status(200).json({token,message:'logged in successfully',data:user})
//     //     res.status(200).json({token, data: sanitization.User(user)});
// });

    // const token=createTokens.accessToken(user._id,user.role)



    // const token = createToken.accessToken(user._id, user.role);
            // const token =Jwt.sign({username:user.username,password:user.password,email:user.email},process.env.JWT_KEY!,{expiresIn:process.env.JWT_EXPIRE})

        // res.status(200).json({token, data: sanitization.User(user)});
  


    adminLogin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await UserSchema.findOne({
            $or: [{username: req.body.username}, {email: req.body.username}],
            role: {$in: ['admin', 'employee']}
        });
        if (!user || user.hasPassword == false || !(await bcrypt.compare(req.body.password, user.password)))
            return next(new ApiErrors(`${req.__('invalid_login')}`, 400));
        const token = createTokens.accessToken(user._id, user.role);
        res.status(200).json({token, data: sanitization.User(user)});
    });

    // protectedRoutes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //     req.headers.authorization
    //         console.log('false')
    //         console.log(req.headers.authorization)

        
    // })

    protectedRoutes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        let token: string='' ;
        console.log(`token `)
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
            console.log(token)
            console.log(`token is ${token}`)
        }
        else {        
            return next(new ApiErrors(`${req.__('check_login')}`, 401))};
        const decoded: any = Jwt.verify(token, process.env.JWT_KEY!);
        console.log(`decoded is ${decoded._id}`)

        const user = await UserSchema.findById(decoded._id);
        if (!user) return next(new ApiErrors(`user bad`, 401));
        if (user.passwordChangedAt instanceof Date) {
            const changedPasswordTime: number = Math.trunc(user.passwordChangedAt.getTime() / 1000);
            if (changedPasswordTime > decoded.iat) return next(new ApiErrors(`${req.__('check_password_changed')}`, 401));
        }
        console.log(user)
        req.user = user;
        next();
    })
    forgetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: any = await UserSchema.findOne({email: req.body.email});
        if (!user) return next(new ApiErrors(`${req.__('check_email')}`, 404));
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    //    const cryptedCode:string= await bcrypt.hash(resetCode,13);
    const cryptedCode = crypto.createHash('sha256').update(resetCode).digest('hex');

        // const cryptedCode = crypto.createHash('sha256').update(resetCode).digest('hex');
    const message = `Your reset code is: ${resetCode}`;
        const options = {
            message,
            email: user.email,
            subject: 'Reset password'
        }
        try {
            await sendEmail(options);
            user.passwordResetCode = cryptedCode;
            user.passwordResetCodeExpores = Date.now() + (10 * 60 * 1000);
            user.passwordCodeVerify = false;
            if (user.image && user.image.startsWith(`${process.env.BASE_URL}`)) user.image = user.image.split('/').pop();
            await user.save({validateModifiedOnly: true});
            const token=createTokens.resetToken(user._id)
        } catch (e) {
            console.log(e);
            return next(new ApiErrors(`${req.__('send_email')}`, 500));
        }
        const token=createTokens.resetToken(user._id)
        // const token = createTokens.resetToken(user._id);
        res.status(200).json({token,success: true});
    })

    resetVerifyCode=asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        let token: string='' ;
        console.log(`token `)
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
             console.log(`token is ${token}`)
        }
        else {        
            return next(new ApiErrors(`${req.__('check_verify_code')}`, 403))};
        const decoded: any = Jwt.verify(token, process.env.JWT_KEY!);
        const hashResetCode: string = crypto.createHash('sha256').update(req.body.resetCode).digest('hex');
        console.log(`decoded is ${decoded._id}`)
        const user:any = await UserSchema.findOne({
            _id:decoded._id,
            passwordResetCode:hashResetCode,
            passwordResetCodeExpores:{$gt:Date.now()}
        });
        if (!user)   return next(new ApiErrors(`${req.__('check_code_valid')}`, 403))
        user.passwordCodeVerify = true;
        if (user.image && user.image.startsWith(`${process.env.BASE_URL}`)) user.image = user.image.split('/').pop();
        await user.save({validateModifiedOnly: true});
               res.status(200).json({success:true})
    })



    resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];
        else return next(new ApiErrors(`${req.__('check_reset_code')}`, 403));
        const decoded: any = Jwt.verify(token, process.env.JWT_KEY!);
        const user: any = await UserSchema.findOne({
            _id: decoded._id,
            passwordCodeVerify: true,
        });
        if (!user) return next(new ApiErrors(`${req.__('check_code_verify')}`, 403));
        user.password = req.body.password;
        user.passwordResetCodeExpores = undefined;
        user.passwordResetCode = undefined;
        user.passwordCodeVerify = undefined;
        user.passwordChangedAt = Date.now();
        if (user.image && user.image.startsWith(`${process.env.BASE_URL}`)) user.image = user.image.split('/').pop();
        await user.save({validateModifiedOnly: true});
        res.status(200).json({success: true,token,data:user});
    })
    
    // forgetPassword=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    //     const user=await userSchema.findOne({email:req.body.email})
    //     if(!user){
    //         return next(new ApiErrors(`${req.__('check_email')}`,404))
    //     }
    //    const resetCode:string=Math.floor(100000 + Math.random() * 900000).toString();
    //    const cryptedCode:string= await bcrypt.hash(resetCode,13);
    //    const message=`your reset code is ${resetCode}`;
    //    const options={
    //     message,
    //     email:user.email,
    //     subject:'Reset password'
    //    }
    //    try{
    //     await sendMail(options);
    //     user.passwordResetCode!=cryptedCode;
    //     user.passwordResetCodeExpores!=Date.now()+(10*60*1000)
    //     user.passwordCodeVerify!=false
    //     if(user.image && user.image.startsWith(`${process.env.BASE_URL}`)){
    //         user?.image!=user.image.split('/').pop()
    //     }
    //     await user.save({validateModifiedOnly:true})
    //    } catch(e){
    //     console.log(e);
    //     return next(new ApiErrors(`${req.__('send-email')}`,500))
    //    } 
    //    res.status(200).json({success:true})
    // })
    allowedTo = (...roles: string[]) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            if (!roles.includes(req.user.role)) return next(new ApiErrors(`${req.__('allowed_to')}`, 403));
            next();
    })
    checkActive = asyncHandler( (req: Request, res: Response, next: NextFunction) => {
        if (!req.user.active) return next(new ApiErrors(`${req.__('check_active')}`, 403));
        next();
    })
}
const authService = new AuthService();
export default authService;
