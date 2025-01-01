import {Router}  from "express";
import categoriesService from "./categories.service";
import subcategoriesRouter from "../subcategries/subcategories.route";
import categoriesValidation from "./categoriesvalidation";
import { body } from "express-validator";
import validatorMiddelware from "../middelwaresErrors/validatormiddelware";
import categoriesSchema from "./categories.schema";
import { error } from "console";
import authService from "../authenticator/auth.service";
const categoriesRouter:Router= Router();

categoriesRouter.use('/:categoryId/subcategories', subcategoriesRouter)

categoriesRouter.route('/')
.get(categoriesService.getAll)
.post(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),categoriesValidation.createOne,categoriesService.createOne);
// categoriesRouter.get('/',categoriesService.getAll);

categoriesRouter.route('/:id')
.get(categoriesValidation.getOne,categoriesService.getOne)
.put(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),categoriesValidation.UpdateOne,categoriesService.updateOne)
.delete(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),categoriesValidation.deleteOne,categoriesService.deleteOne)
export default categoriesRouter;




