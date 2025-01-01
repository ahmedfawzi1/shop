import express from "express";
import { NextFunction } from "express";

class ApiErrors extends Error {
    private status: string;

    constructor(message: string, private statusCode: number) {
        super(message);
        this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
    };
}

export default ApiErrors;



// class ApiErrors extends Error{


//     private status:string;
//     // private isOperation:boolean;
//     constructor(message:string,private statuscode:number){
//         super(message);
//         this.status=`${statusCode}`.startsWith('4')? 'fail' : 'error';
//         // this.isOperation=true;
//     };
// }

