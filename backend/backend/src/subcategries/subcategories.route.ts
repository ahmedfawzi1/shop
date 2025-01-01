import { Router } from "express";
import subcategoriesService from "./subcategories.service";
import subcategoriesValidation from "./subcategoriesvalidation";
import authService from "../authenticator/auth.service";

const subcategoriesRouter:Router=Router({mergeParams:true});
subcategoriesRouter.route('/')
.get(subcategoriesService.filterDataSubcategory,subcategoriesService.getAll)
.post(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),subcategoriesService.setCategoryId,subcategoriesValidation.createOne,subcategoriesService.createOne)
// .get(subcategoriesService.filterSubCategory,subcategoriesService.getAll)
// .post(subcategoriesService.setCategoryId,subcategoriesService.createOne)




subcategoriesRouter.route('/:id')
.get(subcategoriesValidation.getOne,subcategoriesService.getOne)
.put(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),subcategoriesValidation.UpdateOne,subcategoriesService.updateOne)
.delete(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),subcategoriesValidation.deleteOne,subcategoriesService.deleteOne);

export default subcategoriesRouter;
