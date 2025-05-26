import express from 'express';
import { isAuth, login, logout, register } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter=express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login); // Assuming login uses the same controller for now
userRouter.get('/is-auth',authUser,isAuth)
userRouter.get('/logout',authUser,logout)
export default userRouter;