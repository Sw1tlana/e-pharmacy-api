import { getNearestMedicineStoresService,
         getMedicineStoresService
 } from '../services/storesServices.js';

export const getStoresList = async (req, res, next) => {
    try {
      const stores = await getMedicineStoresService();
      res.status(200).json(stores);

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