import {Router}  from "express";

import userValidation from "../user/user.validation";
import profileService from "./address.service";
import userService from "../user/user.service";
import authService from "../authenticator/auth.service";
import wishListService from "./address.service";
import wishlistValidation from "./address.validation";
import addressService from "./address.service";
const AddressRouter:Router= Router();
AddressRouter.use(authService.protectedRoutes,authService.checkActive);
// userRouter.use( authService.allowedTo('admin'))


// userRouter.use('/:categoryId/subcategories', subcategoriesRouter)

AddressRouter.route('/')
.get(addressService.getAddress)
.post(addressService.addAddress)
AddressRouter.delete('/:addressId',addressService.removeAddress)

export default AddressRouter;



