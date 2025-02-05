import express from "express";
import { getMedicinesProducts,
         getProductDetails
 } from "../controllers/productsControllers.js";

const productsRouter = express.Router();

productsRouter.get('/', getMedicinesProducts);

productsRouter.get('/:productId', getProductDetails);

export default productsRouter;