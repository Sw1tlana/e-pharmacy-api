import express from "express";
import { getMedicinesProducts,
         getProductDetails
 } from "../controllers/productsControllers.js";

const productsRouter = express.Router();

// Роут для отримання продуктів
productsRouter.get('/', getMedicinesProducts);

// Роут для отримання деталей продукту
productsRouter.get('/:productId', getProductDetails);

export default productsRouter;