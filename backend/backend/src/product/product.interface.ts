import { Categories } from "../category/categories.interface";
import { Document } from "mongoose";
import { subcategoriesInterface } from "../subcategries/subcategories.interface";
export interface productInterface extends Document{
    readonly name:string;
    readonly description:string;
    readonly category:Categories;
    readonly subcategory:subcategoriesInterface;
    readonly price:number;
    readonly discount:number;
    readonly priceAfterDiscount:number;
    readonly sold:number;
    readonly rate:number;
    readonly rateAvg:number;
    readonly totalOfRate:number;
    readonly quantity:number;
    cover:string;
    image:string[];

}