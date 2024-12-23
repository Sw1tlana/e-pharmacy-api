import express from "express";
import { getCartItems,
         updateCart,
         checkout
 } from "../controllers/cartControllers.js";
 import auth from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.get('/', auth, getCartItems);

cartRouter.put('/update', auth, updateCart);

cartRouter.post('/checkout', auth, checkout);

export default cartRouter;