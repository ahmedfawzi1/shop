import mongoose, { model } from "mongoose";
import * as querystring from "mongoose";
import {Response,Request,NextFunction}  from "express";
import express from 'express'

//sort, fields ,search, pagination...(page,limit)
class Features{
    public paginationResult:any;
    constructor(public moongoseQuery:mongoose.Query<any[],any>,private readonly queryString:any){

    }
    filter(){
        const queryStringObj:any={...this.queryString}
        const executedFields:string[]=['page','limit','sort','fields','search','lang'];
        executedFields.forEach((field:string):void=>{
            delete queryStringObj[field]
        });
        let queryStr:string=JSON.stringify(queryStringObj);
        queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g ,match=>`$${match}`)
        this.moongoseQuery = this.moongoseQuery.find(JSON.parse(queryStr))

        return this;
    }
    sort(){
        if(this.queryString.sort){
            console.log(this.queryString.sort)
            const sortBy=this.queryString.sort.split(',').join(' ');
            this.moongoseQuery=this.moongoseQuery.sort(sortBy)
    }else {this.moongoseQuery.sort('-updatedAt -createdAt')}
    return this
    }
    search(modelName:string){
        if(this.queryString.search){
            console.log(this.queryString.search)
            let query:any;
            if(modelName==='products'){
                // تكتب بطرقتين
                // 1) الطريقه الاولي
                    query={$or:[{name: new RegExp(this.queryString.search,'i')},
                   {description: new RegExp(this.queryString.search,'i')}]}
                // 1) الطريقه الثانيه
   
                //  query.$or=[{name: new RegExp(this.queryString.search,'i')},
                //     {description: new RegExp(this.queryString.search,'i')}]


            }else{
             query={name: new RegExp(this.queryString.search,'i')}
            }
            this.moongoseQuery=this.moongoseQuery.find(query);

            // let query: SeachQuery = {};
            // if(modeName===''){
            //     query.$or=[
            //         {prop1: new RegExp(this.queryString.search,'i')},
            //         {prop2: new RegExp(this.queryString.search,'i')}

            //     ];

            // }else{
            //     query={prop:new RegExp(this.queryString.search('n'))}
            // }
            // this.moongoseQuery=this.moongoseQuery.find(query)

        }
        return this
    }

    limitFields(){
        if(this.queryString.fields){
            const fields=this.queryString.fields.split(',').join(' ')
            this.moongoseQuery=this.moongoseQuery.select(fields);
        }else this.moongoseQuery.select('-__v')
        return this;

    }
    pagination(documentsCount:number){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 20;
     
        const skip = (page - 1) * limit;
        const endIndex = page * limit;
        const pagination: any = {};
        pagination.currentPage = page;
        pagination.limit = limit;

         pagination.totalPages = Math.ceil(documentsCount /limit);

        if (endIndex < documentsCount) pagination.next = page + 1;
        if (skip > 0) pagination.prev = page - 1;
        this.moongoseQuery = this.moongoseQuery.skip(skip).limit(limit);
        this.paginationResult = pagination;
        return this;
    }

}

export default Features;
