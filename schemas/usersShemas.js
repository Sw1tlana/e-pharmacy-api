import Joi from "joi";

export const usersSchema = Joi.object({  
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(),
    password: Joi.number().required()
});

