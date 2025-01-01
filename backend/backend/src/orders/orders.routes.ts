import {Router} from 'express';

import authService from '../authenticator/auth.service';
import orderService from '../orders/orders.service';
import orderValidation from './ordersvalidation';

const orderRouter: Router = Router();

// categoriesRouter.use('/:categoryId/subcategories', subcategoriesRouter);
orderRouter.use(authService.protectedRoutes, authService.checkActive)

orderRouter.route('/')
    .get(orderService.filterOrders,orderService.getAll)
    .post(authService.allowedTo('user'),orderValidation.createOne,orderService.createCashOrder)

    orderRouter.route('/:orderId')
    .put(authService.allowedTo('admin','employee'),orderService.updateOne)
    .delete(orderService.deleteOne);

    orderRouter.put('/:id/deliver', authService.allowedTo('admin','employee'),orderService.deliverOrder);
    orderRouter.put('/:id/order', authService.allowedTo('admin','employee'),orderService.payOrder);

export default orderRouter;