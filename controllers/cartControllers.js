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
    const { userId, updatedProducts, paymentMethod } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!updatedProducts || !Array.isArray(updatedProducts) || updatedProducts.length === 0) {
      return res.status(400).json({ message: "Updated products array is required and must be non-empty" });
    }

    if (!paymentMethod) {
      return res.status(400).json({ message: "Payment method is required" });
    }

    const updatedCartItem = await updateCartServices(userId, updatedProducts, paymentMethod);

    res.status(200).json({ message: "Cart updated successfully!", cart: updatedCartItem });

  } catch (error) {
    next(error);
  }
};

export const checkout = async (req, res, next) => {
  try {
    const { userId, products, totalAmount, paymentMethod, customer } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ message: "Products are required and should be an array" });
    }

    const updatedProducts = products.map(product => {
      if (!product.productId || !product.quantity || !product.price || !product.totalPrice) {
        throw new Error('Invalid product data');
      }

      if (!mongoose.Types.ObjectId.isValid(product.productId)) {
        throw new Error(`Invalid product ID: ${product.productId}`);
      }

      return {
        ...product,
        productId: new mongoose.Types.ObjectId(product.productId), 
      };
    });

    if (!customer || !customer.firstName || !customer.lastName || !customer.phone || !customer.address) {
      return res.status(400).json({ message: 'Customer information is incomplete' });
    }

    const { address } = customer;
    if (!address || !address.street || !address.city) {
      return res.status(400).json({ message: 'Address is incomplete, street and city are required' });
    }

    const finalTotalAmount = totalAmount || products.reduce((acc, product) => acc + product.totalPrice, 0);

    const newCart = await checkoutServices(
      updatedProducts, 
      {
        userId,
        totalAmount: finalTotalAmount,
        paymentMethod,
        customer 
      }
    );

    res.status(200).json({ message: 'Cart created successfully!', cart: newCart });
  } catch (err) {
    console.error("Error in checkout:", err);
    res.status(500).json({ message: 'An error occurred during checkout', error: err.message });
  }
};