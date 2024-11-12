import Joi from "joi";

export const reviewsShema = Joi.object({  
    "name": Joi.string().required(),
    "testimonial": Joi.string().required(),
});