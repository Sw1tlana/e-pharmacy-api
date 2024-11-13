import express from "express";
import { getCartItems,
         updateCart,
         checkout
 } from "../controllers/cartControllers.js";

const cartRouter = express.Router();

cartRouter.get('/cart', getCartItems);

// Роут для оновлення корзини
cartRouter.put('/cart', updateCart);

cartRouter.post('/cart/checkout', checkout);

export default cartRouter;