import User from '../models/users.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

export const userRegistersServices = async (information) => {
  
    try {
      const {name, email, phone, password } = information;

      const user = await User.findOne({email});

      if (user) {
        return { message: "Email is already in use" }; 
      };

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        phone,
        password: passwordHash, 
      });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    
      newUser.token = token;

    await newUser.save();

    return {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
      token,
    };

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
    
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return null;
      }

      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);
    
      user.refreshToken = refreshToken;
      user.token = accessToken;
      await user.save();

      return {
        token: accessToken,
        refreshToken, 
        user: { id: user._id, name: user.name, email: user.email },
      };
  
    } catch (error) {
      throw new Error("Internal server error during login");
    }
  };

export const userLogoutService = async(id) => {
  try {
    const user = await User.findByIdAndUpdate(id, { refreshToken: null }, { new: true });
    if (!user) {
      throw new Error('User not found');
    }
    console.log(`User ${id} logged out successfully.`);
  } catch (error) {
    console.error('Logout service error:', error);
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
 getUserInfoServices,
 generateAccessToken,
 generateRefreshToken
};