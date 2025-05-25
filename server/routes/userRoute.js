import express from 'express';
import { login, register } from '../controllers/userController.js';

const userRouter=express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login); // Assuming login uses the same controller for now

export default userRouter;