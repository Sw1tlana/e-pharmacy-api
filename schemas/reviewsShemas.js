import Joi from "joi";

export const createProductSchema = Joi.object({  
    "name": Joi.string().required(),
    "testimonial": Joi.string().required(),
});