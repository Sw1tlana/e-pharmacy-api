import { getCustomersReviewsServices } from "../services/reviewsServices.js";

export const getCustomerReviews = async (req, res, next) => {
    try {
     const reviews = await getCustomersReviewsServices();
     res.status(200).json(reviews);
    } catch(error) {
        next(error);
    }
};