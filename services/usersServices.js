import User from '../models/users.js';
import bcrypt from "bcrypt";

export const userRegistersServices = async (information) => {
  
    try {
      const {name, email, phone, password } = information;

      const user = await User.findOne({email});

      if (user !== null) {
        return null;
      };

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        phone,
        password: passwordHash, 
      });

      return newUser;
    } catch (error) {
        throw error;
    }
};

export const userLoginServices = async (email, password) => {
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return null;
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return null;
      }
  
      return user;
  
    } catch (error) {
      console.error("Error in userLoginServices:", error);
      throw new Error("Internal server error during login");
    }
  };

export default {
 userRegistersServices,
 userLoginServices
};