import express from "express";

const reviewsRouter = express.Router();

reviewsRouter.get('/customer/reviews', getCustomerReviews);


export default reviewsRouter;