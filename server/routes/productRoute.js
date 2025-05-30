import express from 'express';
import { upload } from '../configs/multer';
import { authSeller } from '../middleware/authSeller.js';
import { addProduct, changeStock, productById, proudctList } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add',upload.array([images]),authSeller,addProduct)
productRouter.get('/list',proudctList)
productRouter.get('/id' ,productById)
productRouter.post('/stock',authSeller,changeStock)


export default productRouter;