import usersServices, { getUserInfoServices } from "../services/usersServices.js";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const register = async (req, res, next) => {
    try {
   const { name, email, phone, password } = req.body;

   const result = await usersServices.userRegistersServices({
      name,
      email,
      phone,
      password,
   });

   if (result === null) {
    return res.status(409).send({ message: "Email in use" });
  };


    return res.status(201).send({
      message: "Registration successfully!",
      user: result.user, 
      token: result.token 
    });

    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    const result = await usersServices.userLoginServices(email, password);

    if (result === null) {
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    if (result === false) {
      return res.status(401).send({ message: "Please verify your email" });
    }

    return res.status(200).send({
      token: result.token,
      user: result.user, 
      message: "Login successful"
    });

  } catch (error) {
    next(error);
  }
};

export const refreshTokens = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    console.error("No refresh token provided");
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    console.log("Decoded token:", decoded);

    // Перевірте, чи існує користувач із цим refreshToken
    const user = await User.findOne({ _id: decoded.id });
    console.log("Refresh token in DB:", user.refreshToken);

    if (!user || user.refreshToken !== refreshToken) {
      console.error("Invalid refresh token or mismatch");
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Створіть нові токени
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    // Оновіть refreshToken у користувача
    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
      message: "Tokens refreshed successfully"
    });

  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const logout = async (req, res, next) => {
  try {
    const userId = req.user.id; 
    await userLogoutService(userId);  

    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.query;

    const userInfo = await getUserInfoServices(userId);

  res.json(userInfo);
  } catch (error) {
   return res.status(500).json({message: 'Error retrieving user information'});
  }
};

export default {
    register,
    login,
    logout,
    refreshTokens,
    getUserInfo
};



