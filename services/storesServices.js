import Store from '../models/stores.js';

export const getNearestMedicineStoresService = async(city = 'Kyiv') => {
 try {
   const nearestStores = await Store.find({ city }).limit(6);
        
   if (nearestStores.length > 0) {
       return nearestStores;
   } else {
       return []; 
   }

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