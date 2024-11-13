import Joi from "joi";

export const nearestPharmsSchema = Joi.object({  
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(),
    rating: Joi.number().min(1).max(5).required()
});

export const pharmsSchema = Joi.object({  
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(),
    rating: Joi.string().min(1).max(5).required()
});


