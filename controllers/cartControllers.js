import Cart from "../models/cart.js";
import { getCartItemsServices,
         checkoutServices
} from "../services/cartServices.js";
import mongoose from 'mongoose';
// import { isValidObjectId } from "mongoose";
     
export const getCartItems = async (req, res, next) => {
   try {
    const cart = await getCartItemsServices();
    res.status(200).json(cart);

   } catch (error) {
    next(error);
   }
};

export const updateCart = (req, res, next) => {

};

export const checkout = async (req, res, next) => {
    try {
      const { error } = Cart.validate(req.body);
  
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const { products, totalAmount, status, order_date } = req.body;

      const updatedProducts = products.map(product => ({
        ...product,
        productId: new mongoose.Types.ObjectId(product.productId),
      }));
      
      const cart = await checkoutServices.create({
        userId,
        products: updatedProducts,
        totalAmount,
        status,
        order_date,
      });

      res.status(200).json({ message: 'Кошик створено успішно!', cart });
    } catch (err) {
      next(err);
    }
  };