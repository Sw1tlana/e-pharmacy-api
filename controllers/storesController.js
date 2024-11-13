// import { isValidObjectId } from "mongoose";
import { getNearestMedicineStoresService } from '../services/storesServices.js';

export const getStoresList = (req, res, next) => {

};

export const getNearestMedicineStores = async (req, res, next) => {
    try {
        const stores = await getNearestMedicineStoresService();  
        res.status(200).json(stores);  
    } catch (error) {
        next(error);  
    }
};