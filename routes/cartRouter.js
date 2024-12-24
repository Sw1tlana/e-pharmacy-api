import express from "express";
import { getCartItems,
         updateCart,
         checkout
 } from "../controllers/cartControllers.js";
 import authMiddlewares from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.get('/', authMiddlewares, getCartItems);

cartRouter.put('/update', authMiddlewares, updateCart);

cartRouter.post('/checkout', authMiddlewares, checkout);

export default cartRouter;