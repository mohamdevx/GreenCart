import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './configs/db.js';
import dotenv from 'dotenv/config'; // loads .env variables
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhook } from './controllers/orderController.js';



const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB (must be done before the server starts)
await connectDB(); // ✅ move this AFTER defining app and middleware
await connectCloudinary(); // Connect to Cloudinary


const allowedOrigins = ['http://localhost:5173','https://green-cart-xi-red.vercel.app']

app.post('stripe',express.raw({type: 'application/json'}),stripeWebhook);

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies from the client
app.use(cors({ origin: allowedOrigins, credentials: true })); // Enable CORS with cookies


// Basic route
app.get('/', (req, res) => res.send("API is working"));

// User API routes
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
