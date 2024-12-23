import Joi from "joi";

export const registersSchema = Joi.object({  
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(),
    password: Joi.string().required(),
    token: Joi.string()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  export const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required(),
});