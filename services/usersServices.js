import User from '../models/users.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

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

      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } 
    );

    newUser.token = token;
    await newUser.save();

    return { user: newUser, token };
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
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      await User.findByIdAndUpdate(user._id, { token });

      return {
        token,
        user: {
          email: user.email,
          name: user.name,
        },
      };
  
    } catch (error) {
      throw new Error("Internal server error during login");
    }
  };

export const userLogoutService = async(id) => {
  try {
    await User.findByIdAndUpdate(id, { token: null }, { new: true });
  } catch (error) {
    throw error;
  }
};

export const getUserInfoServices = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
     throw new Error('User not found!');
    }

    return {
      name: user.name,
      email: user.email
    };

  } catch(error) {
    throw error;
  }

};

export default {
 userRegistersServices,
 userLoginServices,
 userLogoutService,
 getUserInfoServices
};