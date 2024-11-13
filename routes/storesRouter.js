import express from "express";
import { getStoresList, 
         getNearestMedicineStores } from "../controllers/storesController.js";

const storesRouter = express.Router();

// Роут для отримання списку аптек
storesRouter.get('/list', getStoresList);

// Роут для отримання найближчих аптек
storesRouter.get('/nearest', getNearestMedicineStores);



export default storesRouter;