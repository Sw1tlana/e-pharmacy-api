import { isValidObjectId } from "mongoose";

import { getMedicinesProductsServises,
         getProductDetailsServices
 } from "../services/productsServices.js";

export const getMedicinesProducts = async (req, res, next) => {
   let { page = 1, limit = 12 } = req.query;

   page = parseInt(page, 12);
   limit = parseInt(limit, 12);

   try {
    const products = await getMedicinesProductsServises();
    res.status(200).json(products);
    
   }catch(error) {
    next(error);
   }
};

export const getProductDetails = async (req, res, next) => {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res.status(404).json({ message: "This identifier is not valid" });
    }

    try {
      const product = await getProductDetailsServices(productId);
      if (!product) {
         return res.status(404).json({ message: "Contact not found" });
       }
       res.status(200).json(product);
    } catch(error) {
      next(error);
    }
};