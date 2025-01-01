import mongoose from "mongoose";
import { env } from "process";
import dotenv from 'dotenv'

const dbConnection=()=>{
    // mongoose.connect(process.env.DB!)
    mongoose.connect(process.env.DB!)

    // mongoose.connect('mongodb://localhost:27017/Nti-commerce')

    .then(()=>{
        console.log("connected to db")
    }).catch((err)=>{
            console.log(err +"error is tid hello mai")
            
        });
}
export default dbConnection;












