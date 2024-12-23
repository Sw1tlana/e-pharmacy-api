import { getCartItemsServices,
         checkoutServices,
         updateCartServices
} from "../services/cartServices.js";
import mongoose from 'mongoose';
     
export const getCartItems = async (req, res, next) => {
   try {
    const cart = await getCartItemsServices();

    if (cart.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    };

    res.status(200).json(cart);

   } catch (error) {
    next(error);
   }
};

export const updateCart = async (req, res, next) => {

  try {
    const { userId, updatedProducts} = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }ж

    const updatedCartItem = await updateCartServices(userId, updatedProducts);
    res.status(200).json({ message: "Cart updated successfully!", cart: updatedCartItem });

  } catch(error) {
    next(error);
  }
};

export const checkout = async (req, res, next) => {
    try {
      const { 
        products, 
        totalAmount, 
        status, 
        order_date, 
        userId, 
        paymentMethod } = req.body;

      const updatedProducts = products.map(product => ({
        ...product,
        productId: new mongoose.Types.ObjectId(product.productId), 
      }));
  
      const cartUserId = new mongoose.Types.ObjectId(userId); 
  
      const newCart = await checkoutServices(
        updatedProducts, 
        {
          userId: cartUserId,
          totalAmount,
          status,
          order_date,
          paymentMethod,
        }
      );
      
      res.status(200).json({ message: 'Cart created successfully!', cart: newCart });
    } catch (err) {
      next(err);
    }
  };