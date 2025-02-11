import { isValidObjectId } from "mongoose";

import { getMedicinesProductsServises,
         getProductDetailsServices
 } from "../services/productsServices.js";

export const getMedicinesProducts = async (req, res, next) => {

   let { page = 1, limit = 12, filter = {}, query } = req.query;

   page = parseInt(page, 10);
   limit = parseInt(limit, 10);

   if (query) {
    filter.name = { $regex: query, $options: 'i' }; 
  }

   Object.keys(filter).forEach(key => {
    if (!filter[key]) {
      delete filter[key];
    }
  });

   if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
    return res.status(400).json({ message: "Bad request. Invalid page or limit." });
  }

   try {
    const products = await getMedicinesProductsServises(filter, page, limit);
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