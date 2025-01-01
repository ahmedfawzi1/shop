// import { Request,Response,NextFunction, RequestHandler } from "express";
// // import validationResult from 'express-validator';
// import { validationResult } from 'express-validator';


// const validatorMiddelware:RequestHandler=(req:Request,res:Response,next:NextFunction)=>{
//     const error=validationResult(req);
//     if(!error.isEmpty()){
//         return res.status(400).json({error:error.array()});
        
//     }
//     else{
//         next()
//     }
// };
// export default validatorMiddelware;
import {NextFunction, Request, RequestHandler, Response} from 'express';
import {validationResult} from 'express-validator';

const validatorMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    } else {
        next();
    }
};

export default validatorMiddleware;