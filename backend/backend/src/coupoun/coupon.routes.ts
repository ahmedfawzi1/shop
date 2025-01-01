import {Router}  from "express";
import authService from "../authenticator/auth.service";
// import couponValidation from "./couponvalidation";
import couponService from "./coupon.service";
// const couponRouter:Router= Router();

// couponRouter.use(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee','user'))
// couponRouter.route('/')
// .get(couponService.getAll)
// .post(couponValidation.createOne,couponService.createOne);
// // categoriesRouter.get('/',categoriesService.getAll);

// couponRouter.route('/:id')
// .get(couponValidation.getOne,couponService.getOne)
// .put(couponValidation.UpdateOne,couponService.updateOne)
// .delete(couponValidation.deleteOne,couponService.deleteOne)
// export default couponRouter;

// import couponService from "./coupon.service";
import couponValidation from "./couponvalidation";
// import authService from "../authenticator/auth.service'

const couponRouter: Router = Router();

couponRouter.use(authService.protectedRoutes, authService.checkActive, authService.allowedTo('admin', 'employee','user'));

couponRouter.route('/')
    .get(couponService.getAll)
    .post(couponValidation.createOne, couponService.createOne);

couponRouter.route('/:id')
    .get(couponValidation.getOne, couponService.getOne)
    .put(couponValidation.UpdateOne, couponService.updateOne)
    .delete(couponValidation.deleteOne, couponService.deleteOne);

export default couponRouter;



