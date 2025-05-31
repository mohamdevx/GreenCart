import express from 'express';
import { isSellerAuth, sellerLogin, SellerLogout } from '../controllers/sellerController.js'
import authSeller from '../middlewares/authSeller.js';


const sellerRoute = express.Router();

sellerRoute.post('/login', sellerLogin);
sellerRoute.get('/is-auth', authSeller, isSellerAuth);
sellerRoute.get('/logout', SellerLogout);

export default sellerRoute;