import Cart from "../models/cart.js";

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

export const checkoutServices = async (products, { 
  userId, 
  status, 
  order_date,
  paymentMethod, }) => {

  try {
    const totalAmount = products.reduce((acc, product) => acc + product.totalPrice, 0);

    const cartData = {
      userId,
      products,
      totalAmount,
      status,
      order_date,
      paymentMethod,
    };

    const createdCart = await Cart.create(cartData); 

    return createdCart;
  } catch (error) {
    throw error;
  }
};

export const updateCartServices = async (userId, updatedProducts) => {
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new Error('The cart is empty');
    };

    updatedProducts.forEach((updatedProduct) => {
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
    await cart.save();
    return cart;

  }catch (error) {
    throw error;
  }

};