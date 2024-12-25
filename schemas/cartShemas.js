import Joi from "joi";

export const createCartSchema = Joi.object({
  userId: Joi.string().required(), 
  products: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(), 
      quantity: Joi.number().integer().min(1).required(), 
      price: Joi.number().required(), 
      totalPrice: Joi.number().required(), 
    })
  ).required(),
  totalAmount: Joi.number().required(),
  status: Joi.string().valid('Pending', 'Completed', 'Cancelled').required(), 
  order_date: Joi.date().required(),
  paymentMethod: Joi.string().valid('bank', 'cash').required(), 
  customer: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required()
    }).required()
  }).required()
});
