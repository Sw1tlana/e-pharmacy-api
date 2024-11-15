import User from '../models/users.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
     const token = jwt.sign({ id: user._id, name: user.name }, 
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      }
    )
   
    await User.findByIdAndUpdate(user._id, { token });

    return { token, user };
  
    } catch (error) {
      throw new Error("Internal server error during login");
    }
  };

export const userLogoutService = async(id) => {
    await User.findByIdAndUpdate(id, { token: null }, { new: true });
};

export default {
 userRegistersServices,
 userLoginServices,
 userLogoutService
};