import Joi from "joi";

export const nearestPharciesSchema = Joi.object({  
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(),
    rating: Joi.string().min(1).max(5).required()
});

export const pharciesSchema = Joi.object({  
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(),
    rating: Joi.string().min(1).max(5).required()
});


