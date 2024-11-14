import Cart from "../models/cart.js";

export const getCartItemsServices = async () => {
  try {
   const cart = await Cart.find();
   return cart;

  } catch(error) {
   throw error;
  }
};

export const checkoutServices = async (cartItems, userDetails) => {
  try {
    const order = {
      orderId: Date.now(),
      items: cartItems,
      userDetails,
      totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      status: 'Successful',
    };
    
    const createdCart = await Cart.create(order);

    return createdCart; 
  } catch (error) {
    throw error;
  }
};