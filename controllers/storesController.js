import { getNearestMedicineStoresService,
         getMedicineStoresService
 } from '../services/storesServices.js';

export const getStoresList = async (req, res, next) => {
    try {
      const stores = await getMedicineStoresService();

      const randomStores = stores.sort(() => 0.5 - Math.random()).slice(0, 6);
      res.status(200).json(randomStores);

    } catch (error) {
        next(error);
    }
};

export const getNearestMedicineStores = async (req, res, next) => {
    try {
        const stores = await getNearestMedicineStoresService();  
        res.status(200).json(stores);  
        
    } catch (error) {
        next(error);  
    }
};