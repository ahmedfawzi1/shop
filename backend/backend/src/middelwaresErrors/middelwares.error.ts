// import { error } from "console";
// import express from "express";
// import { Response,Request,NextFunction} from "express";
// import { Jwt } from "jsonwebtoken";
// import ApiErrors from "../utilsuses/ApiErrors";



// const devErrors=(err:any,res:express.Response)=>{
//     res.status(err.statusCode!).json({
//         error:err,
//         status:err.status,
//         message:err.message,
//         stack:err.stack,
//     });
// }

// const proErrors=(err:any,res:express.Response)=>{
//     res.status(err.statusCode!).json({
//         status:err.status,
//         message:err.message,
//     })
// }
// const handleJwtInvalidSignature=() =>new ApiErrors(`invalid token please login again..`,401)
// const handleJwtExpiredSignature=() =>new ApiErrors(`Expired token lease login again..`,401)

// const globalErrors=function(err:any,req:express.Request,res:express.Response,next:express.NextFunction){
//     err.statusCode=err.statusCode||500 ;
//     err.status=err.status||'error';
//     if(process.env.NODE_ENV ==='development'){
//         devErrors(err,res)
//         // res.status(err.statusCode!).json({
//         //     error:err,
//         //     status:err.status,
//         //     message:err.message,
//         //     stack:err.stack,
//         // });
//     }
//     else {
//         if(err.name==='JsonWebTokenError') err=handleJwtInvalidSignature()
//         if(err.name==='JsonExpiredError') err=handleJwtExpiredSignature()

//         proErrors(err,res)};
// };
// export default globalErrors;





import express from 'express';
import ApiErrors from "../utilsuses/ApiErrors";

const devErrors = (err: any, res: express.Response) =>
    res.status(err.statusCode!).json({
        error: err,
        status: err.status,
        message: err.message,
        stack: err.stack
    });

const prodErrors = (err: any, res: express.Response) =>
    res.status(err.statusCode!).json({
        status: err.status,
        message: err.message
    });

const handleJwtExpired = (message: string, res: express.Response) => new ApiErrors(message, 401);


const globalErrors = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') err = handleJwtExpired(`${req.__('session_expired')}`, res);
    if (process.env.NODE_ENV === 'development') devErrors(err, res)
    else prodErrors(err, res);
};

export default globalErrors;













