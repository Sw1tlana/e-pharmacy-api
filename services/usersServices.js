import User from '../models/users.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export function generateAccessToken(payload) {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  } catch (err) {
    console.error("Error generating access token:", err.message);
    throw err;
  }
};

export function generateRefreshToken(payload) {
  try {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
  } catch (err) {
    console.error("Error generating refresh token:", err.message);
    throw err;
  }
}

export const userRegistersServices = async (information) => {
  try {
    const { name, email, phone, password } = information;
    
    const user = await User.findOne({ email });

    if (user) {
      return { message: "Email is already in use" };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      phone,
      password: passwordHash,
    });

    const payload = { id: newUser._id };

    const refreshToken = generateRefreshToken(payload);
    const token = generateAccessToken(payload);

    newUser.token = token;
    newUser.refreshToken = refreshToken;

    await newUser.save();

    return {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
      token,
      refreshToken,
    };

  } catch (error) {
    throw error;
  }
};

export const userLoginServices = async (email, password) => {
    try {
      
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: 'Користувача не знайдено' });

      if (!user) {
        return null;
      }
    
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ error: 'Невірний пароль' });
      if (!isPasswordValid) {
        return null;
      }

      const payload = { id: user._id };

      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);
      
      await User.findByIdAndUpdate(user._id, { token: accessToken, refreshToken }, { new: true });

      return {
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      };  
  
    } catch (error) {
      throw new Error("Internal server error during login");
    }
  };

export const userLogoutService = async(userId) => {
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

export const getUserInfoServices = async (userId) => {
  try {
    console.log('Searching for user with ID:', userId);  
    const user = await User.findById(userId);
    console.log('Found user:', user);

    if (!user) {
      console.error('User not found!');  
      throw new Error('User not found!');
    }
    console.log('User found:', user);

    return {
      name: user.name,
      email: user.email
    };
  } catch(error) {
    console.error('Error in getUserInfoServices:', error.message);  
    throw new Error(error.message || 'Error retrieving user information');
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