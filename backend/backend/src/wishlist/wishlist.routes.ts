import {Router}  from "express";

import userValidation from "../user/user.validation";
import profileService from "./wishlist.service";
import userService from "../user/user.service";
import authService from "../authenticator/auth.service";
import wishListService from "./wishlist.service";
import wishlistValidation from "./wishlist.validation";
const WishlistRouter:Router= Router();
WishlistRouter.use(authService.protectedRoutes,authService.checkActive);
// userRouter.use( authService.allowedTo('admin'))


// userRouter.use('/:categoryId/subcategories', subcategoriesRouter)

WishlistRouter.route('/')
.get(wishListService.getwishlist)
.post(wishlistValidation.addtoWishlist,wishListService.addTowishlist)
WishlistRouter.delete('/:productId',wishListService.removeFromwishlist)

export default WishlistRouter;



