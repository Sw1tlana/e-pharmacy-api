import CustomerReviews from "../models/reviews.js";

export const getCustomersReviewsServices = async() => {
    try {
        const reviews = await CustomerReviews.find();
        return reviews;
    } catch(error) {
        throw error;
    }
};