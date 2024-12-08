import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
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
  status: { 
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'], 
    default: 'Pending',
  },
  paymentMethod: { 
    type: String,
    required: true, 
    enum: ['bank', 'cash'], 
  },
}, {
  timestamps: true, 
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;