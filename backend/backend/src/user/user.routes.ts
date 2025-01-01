import {Router}  from "express";

import userValidation from "./user.validation";
import userService from "./user.service";
import authService from "../authenticator/auth.service";
const userRouter:Router= Router();
// userRouter.use(authService.protectedRoutes);
// userRouter.use( authService.allowedTo('admin'))

userRouter.use(authService.protectedRoutes, authService.checkActive);

userRouter.get('/me',userService.setUserId,userService.getOne)
userRouter.put('/updateMe',userValidation.UpdateOne,userService.updateLoggedUser)
userRouter.get('/changeMyPassword',userService.setUserId,userService.getOne)
userRouter.get('/deleteMe',authService.allowedTo('user'),userValidation.deleteOne,userService.setUserId,userService.deleteOne)

// userRouter.use('/:categoryId/subcategories', subcategoriesRouter)
userRouter.use(authService.protectedRoutes,authService.checkActive)
userRouter.route('/')
.get(userService.getAll)
.post(userService.uplodaImages,userService.saveImage,userValidation.createOne,userService.createOne);
// categoriesRouter.get('/',categoriesService.getAll);

userRouter.route('/:id')
.get(userValidation.getOne,userService.getOne)
.put(authService.protectedRoutes,userService.uplodaImages,userService.saveImage,userValidation.UpdateOne,userService.updateOne)
.delete(authService.protectedRoutes,userValidation.deleteOne,userService.deleteOne)

// userRouter.put('/:id/change-password',userValidation.changePassword,userService.changePassword)
export default userRouter;



