import express from "express";
import { getCartItems,
         updateCart,
         checkout
 } from "../controllers/cartControllers.js";

const cartRouter = express.Router();

cartRouter.get('/', getCartItems);

// Роут для оновлення корзини
cartRouter.put('/', updateCart);

cartRouter.post('/checkout', checkout);

export default cartRouter;