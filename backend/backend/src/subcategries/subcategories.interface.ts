import { Categories } from "../category/categories.interface";
import { Document } from "mongoose";
export interface subcategoriesInterface extends Document{
    readonly name:string;
    readonly category:Categories;
    image:string;
}
