import express from 'express';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';

import {
  placeOrderCOD,
  placeOrderStripe,
  getUserOrders,
  getAllOrders,
} from '../controllers/orderController.js'; // ✅ Import placeOrderCOD here

const orderRouter = express.Router();

// ✅ Place COD order
orderRouter.post('/cod', authUser, placeOrderCOD);

// ✅ Get user orders (should be POST because you're sending userId in body)
orderRouter.post('/user', authUser, getUserOrders);

// ✅ Get all orders for seller
orderRouter.get('/seller', authSeller, getAllOrders);

// ✅ Stripe order (should be POST, not GET)
orderRouter.post('/stripe', authUser, placeOrderStripe);

export default orderRouter;
