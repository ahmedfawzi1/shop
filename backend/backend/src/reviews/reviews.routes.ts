import {Router}  from "express";
import categoriesService from "./reviews.service";
import subcategoriesRouter from "../subcategries/subcategories.route";
import categoriesValidation from "./reviewsvalidation";
import { body } from "express-validator";
import validatorMiddelware from "../middelwaresErrors/validatormiddelware";
import categoriesSchema from "./reviews.schema";
import { error } from "console";
import authService from "../authenticator/auth.service";
import reviewsValidation from "./reviewsvalidation";
import reviewsService from "./reviews.service";
// const ReviewsRouter:Router= Router();

const ReviewsRouter:Router= Router({mergeParams:true});
ReviewsRouter.route('/')
.get(reviewsService.filterReviews,reviewsService.getAll)

.post(authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'),reviewsService.setUserId,reviewsValidation.createOne,reviewsService.createOne);
// categoriesRouter.get('/',categoriesService.getAll);
ReviewsRouter.get('/my',authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'),reviewsService.filterReviews,reviewsService.getAll)
ReviewsRouter.route('/:id')
.get(reviewsValidation.getOne,reviewsService.getOne)
.put(authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'),reviewsValidation.UpdateOne,reviewsService.updateOne)
.delete(authService.protectedRoutes,authService.checkActive,authService.allowedTo('user','employee','admin'),reviewsValidation.deleteOne,reviewsService.deleteOne)
export default ReviewsRouter;




