import Joi from "joi";

export const createProductSchema = Joi.object({
    name: Joi.string().required(),
    suppliers: Joi.string().required(),
    stock: Joi.number().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    photo: Joi.string(),
});
