import express from "express";
import { getCustomerReviews } from "../controllers/reviewsControllers.js";

const reviewsRouter = express.Router();

reviewsRouter.get('/customer/reviews', getCustomerReviews);


export default reviewsRouter;