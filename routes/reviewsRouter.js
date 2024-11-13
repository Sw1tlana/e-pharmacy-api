import express from "express";
import { getCustomerReviews } from "../controllers/reviewsControllers.js";

const reviewsRouter = express.Router();

reviewsRouter.get('/', getCustomerReviews);


export default reviewsRouter;