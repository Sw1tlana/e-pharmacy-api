import User from '../models/users.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

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
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

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

      if (!user) {
        return null;
      }
    
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return null;
      }

      const payload = { id: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
      
      await User.findByIdAndUpdate(user._id, { token, refreshToken }, { new: true });

      return {
        token,
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

  export const refreshTokensServices = async (req, res, next) => {
    try {
      const { refreshToken: oldRefreshToken } = req.body;
  
      let payload;
      try {
        payload = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);
      } catch (error) {
        throw new Error("Refresh token is invalid or expired");
      }
  
      const user = await User.findById(payload.id);
  
      if (!user) {
        throw new Error("User not found");
      }
      
      const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const newRefreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  
      user.token = newToken;
      user.refreshToken = newRefreshToken;
      await user.save();
  
      await user.save();
      return res.status(200).send({
        token: newToken,
        refreshToken: newRefreshToken,
        message: "Tokens refreshed successfully"
      });
  
    } catch (error) {
      next(error);  
    }
  };

export const userLogoutService = async(userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
     throw new Error('User not found!');
    }

    user.token = null;
    user.refreshToken = null;
    await user.save();

    return {
      message: "User logged out successfully",
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
 refreshTokensServices
};