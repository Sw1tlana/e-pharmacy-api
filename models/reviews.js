import mongoose from "mongoose";

const customerReviewsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    testimonial: {
        type: String,
        required: true,
    },
});

const CustomerReviews = mongoose.model('CustomerReviews', customerReviewsSchema);

export default CustomerReviews;