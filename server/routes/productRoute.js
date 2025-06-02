import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, proudctList } from '../controllers/productController.js';

const productRouter = express.Router();

// Use 'images' as the field name string
productRouter.post('/add', upload.array('images'), authSeller, addProduct);
productRouter.get('/list', proudctList);
productRouter.get('/:id', productById);
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;
