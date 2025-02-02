import Joi from "joi";

export const createCartSchema = Joi.object({
  email: Joi.string().required(), 
  products: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(), 
      quantity: Joi.number().integer().min(1).required(), 
      price: Joi.number().required(), 
      totalPrice: Joi.number().required(), 
    })
  ).required(),
  totalAmount: Joi.number().required(),
  order_date: Joi.date().required(),
  paymentMethod: Joi.string().valid('bank', 'cash').required(), 
  customer: Joi.object({
    email: Joi.string().required(), 
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
  }).required()
});
