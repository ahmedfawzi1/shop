import { NextFunction, Router } from "express";
import multer, { Multer } from "multer";
import { Request,Response } from "express";
import productService from "./product.service";
import productvalidation from "./productvalidation";
import sharp from "sharp";
import ReviewsRouter from "../reviews/reviews.routes";
import authService from "../authenticator/auth.service";

// const storage=multer.diskStorage({
//     destination:(req:Request,filename,cb)=>{
//         cb(null,'uploads/images/products')

//     },
//     filename:(req:Request,file,cb)=>{
//         const ext=file.mimetype.split('/')[1];
//         const fileName:string=`product-${Date.now()}-cover.${ext}`;
//         cb(null,fileName)
//     }
// })
// const upload=multer({storage:storage})
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/images/products');
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         const fileName: string = `product-${Date.now()}-cover.${ext}`;
//         cb(null, fileName);
//     }
// })


// const upload=multer({dest:'uploads/images/products'});
const productRouter:Router=Router();
productRouter.use('/:productId/reviews',ReviewsRouter)
productRouter.route('/')
.get(productService.getAll)
.post(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),productService.uploadImages,productService.saveImage,productvalidation.createOne,productService.createOne)

// .post(upload.single('cover'),productvalidation.createOne,productService.createOne)
// .get(subcategoriesService.filterSubCategory,subcategoriesService.getAll)
// .post(subcategoriesService.setCategoryId,subcategoriesService.createOne)

productRouter.route('/:id')
.get(productvalidation.getOne,productService.getOne)
.put(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),productService.uploadImages,productService.saveImage,productvalidation.UpdateOne,productService.updateOne)
.delete(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),productvalidation.deleteOne,productService.deleteOne);

export default productRouter;

