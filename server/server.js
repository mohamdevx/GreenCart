import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './configs/db.js';
import dotenv from 'dotenv/config'; // loads .env variables
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = ['http://localhost:5173'];

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies from the client
app.use(cors({ origin: allowedOrigins, credentials: true })); // Enable CORS with cookies

// Connect to MongoDB (must be done before the server starts)
await connectDB(); // ✅ move this AFTER defining app and middleware

// Basic route
app.get('/', (req, res) => res.send("API is working"));

// User API routes
app.use('/api/user', userRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
