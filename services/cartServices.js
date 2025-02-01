import Cart from "../models/cart.js";
import mongoose from "mongoose";

export const getCartItemsServices = async () => {
  try {
   const cart = await Cart.find()
   .populate("products.productId")  
   .exec();
   return cart;

  } catch(error) {
   throw error;
  }
};

export const checkoutServices = async (products, { email, totalAmount, paymentMethod, customer }) => {
  try {
    const cartData = {
      email,
      products,
      totalAmount,
      status: 'Pending', 
      order_date: new Date(),
      paymentMethod,
      customer, 
    };

    const createdCart = await Cart.create(cartData); 

    return createdCart;
  } catch (error) {
    throw error;
  }
};

export const updateCartServices = async (email, updatedProducts, paymentMethod) => {
  try {
    const cart = await Cart.findOne({ email });

    if (!cart) {
      return { message: "Cart is empty" };
    }

    updatedProducts.forEach((updatedProduct) => {
      if (!updatedProduct.productId || !updatedProduct.quantity || !updatedProduct.price) {
        throw new Error('Invalid product data in updatedProducts');
      }

      const productIndex = cart.products.findIndex(
        (product) => product.productId.toString() === updatedProduct.productId.toString()
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity = updatedProduct.quantity;
        cart.products[productIndex].totalPrice = updatedProduct.quantity * cart.products[productIndex].price;
      } else {
        
        cart.products.push({
          productId: updatedProduct.productId,
          quantity: updatedProduct.quantity,
          price: updatedProduct.price,
          totalPrice: updatedProduct.quantity * updatedProduct.price,
        });
      }
    });

    cart.totalAmount = cart.products.reduce((total, product) => total + product.totalPrice, 0);

    if (paymentMethod) {
      cart.paymentMethod = paymentMethod;
    }

    try {
      await cart.save();
    } catch (error) {
      throw error;
    }

    return cart;

  } catch (error) {
    throw error;
  }
};