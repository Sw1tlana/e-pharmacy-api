import express from "express";
import { getStoresList, 
         getNearestMedicineStores } from "../controllers/storesController.js";

const storesRouter = express.Router();

storesRouter.get('/list', getStoresList);

storesRouter.get('/nearest', getNearestMedicineStores);



export default storesRouter;