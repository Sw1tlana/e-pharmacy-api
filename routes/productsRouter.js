import express from "express";
import { getMedicines,
    getProductDetails
 } from "../controllers/productsControllers.js";

const productsRouter = express.Router();

// Роут для отримання продуктів
productsRouter.get('/products', getMedicines);

// Роут для отримання деталей продукту
productsRouter.get('/products/:productId', getProductDetails);

export default productsRouter;