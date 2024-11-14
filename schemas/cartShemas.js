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
 });
