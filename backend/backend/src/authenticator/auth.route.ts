import {Router}  from "express";
import { body } from "express-validator";
import validatorMiddelware from "../middelwaresErrors/validatormiddelware"
import { error } from "console";
import authService from "./auth.service";
import authValidation from "./auth.validator"
const authRouter:Router= Router();

// authRouter.use('/:categoryId/subcategories', subcategoriesRouter)
// authRouter.use(authService.protectedRoutes)
authRouter.route('/')
// .get(categoriesService.getAll)
authRouter.post('/signup', authValidation.signup ,authService.signup);
authRouter.post('/login', authValidation.login,authService.login);
authRouter.post('/adminLogin', authValidation.login, authService.adminLogin);
authRouter.post('/forget-Password', authValidation.forgetPassword, authService.forgetPassword);
authRouter.post('/verify-code', authService.resetVerifyCode);
authRouter.post('/reset-password', authValidation.changePassword, authService.resetPassword);




// categoriesRouter.get('/',categoriesService.getAll);
export default authRouter




