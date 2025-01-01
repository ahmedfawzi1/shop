import {Router}  from "express";

import profileValidation from "./profile.validation";
import userValidation from "../user/user.validation";
import profileService from "./profile.service";
import userService from "../user/user.service";
import authService from "../authenticator/auth.service";
const profileRouter:Router= Router();
// userRouter.use(authService.protectedRoutes);
// userRouter.use( authService.allowedTo('admin'))

profileRouter.use(authService.protectedRoutes, authService.checkActive);

// userRouter.use('/:categoryId/subcategories', subcategoriesRouter)

profileRouter.route('/')
.get(userService.setUserId,profileService.getOne)
.put(profileService.uplodaImages,userService.saveImage,profileValidation.UpdateOne,profileService.updateOne)
.delete(authService.allowedTo('user'),profileService.deleteOne)

profileRouter.put('/change-password',profileValidation.changePassword,profileService.changePassword)
profileRouter.put('/create-password',profileValidation.createPassword,userService.createOne)

export default profileRouter;



