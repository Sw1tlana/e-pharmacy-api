import express from "express";

const storesRouter = express.Router();

// Роут для отримання списку аптек
storesRouter.get('/stores/list', getStoresList);

// Роут для отримання найближчих аптек
storesRouter.get('/stores/nearest', getNearestMedicineStores);



export default storesRouter;