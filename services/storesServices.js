import Store from '../models/stores.js';

export const getNearestMedicineStoresService = async() => {
 try {
    const stores = await Store.find();
    return stores;

 }catch (error) {
 throw error;
 }
};

export const getMedicineStoresService = async() => {
   try {
      const stores = await Store.find();
      return stores;
      
   } catch (error) {
      throw error;
   }
};