import express from "express";           // Import express, not mongoose here
import authUser from "../middlewares/authUser.js";
import { updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router();    // Use express.Router()

cartRouter.post('/update', authUser, updateCart);

export default cartRouter;
