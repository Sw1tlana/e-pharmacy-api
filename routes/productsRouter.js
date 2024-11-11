import express from "express";

const productsRouter = express.Router();

// Роут для отримання продуктів
productsRouter.get('/products', getMedicines);

// Роут для отримання деталей продукту
productsRouter.get('/products/:productId', getProductDetails);

export default productsRouter;