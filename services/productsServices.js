import Product from "../models/products.js";

export const getMedicinesProductsServises = async (filter= {}, page, limit) => {
  try {
  const skip = (page - 1) * limit;

  const query = {};
  if (filter.category) query.category = filter.category;
  if (filter.query) query.name = { $regex: filter.query, $options: 'i' }; 
  
  const products = await Product.find(filter).skip(skip).limit(limit);

  const total = await Product.countDocuments(filter);
  return {
  total,
  page,
  limit,
  products };

  } catch (error) {
    throw error;
  }
};

export const getProductDetailsServices = async (productId) => {
  try {
 const product = await Product.findById(productId);
 return product;

  } catch(error) {
    throw error;
  }
};