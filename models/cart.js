import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', 
      required: true,
    },
    quantity: { 
      type: Number,
      required: true,
      min: 1, 
    },
    price: { 
      type: Number,
      required: true,
    },
    totalPrice: { 
      type: Number,
      required: true,
    },
  }],
  totalAmount: { 
    type: Number,
    required: true,
    default: 0,
  },
  paymentMethod: { 
    type: String,
    required: true, 
    enum: ['bank', 'cash'], 
  },
  customer: {
    email: { 
      type: String, 
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
}, {
  timestamps: true, 
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;