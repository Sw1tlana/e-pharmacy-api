import usersServices, { getUserInfoServices } from "../services/usersServices.js";
import { generateAccessToken, generateRefreshToken } from "../services/usersServices.js";
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
      refreshToken: result.refreshToken,
      user: result.user, 
      message: "Login successful"
    });

  } catch (error) {
    next(error);
  }
};

export const refreshTokens = async (req, res, next) => {
  try {
    const { refreshToken: oldRefreshToken } = req.body;

    // Перевірка на наявність refreshToken у запиті
    if (!oldRefreshToken) {
      return res.status(400).send({ message: "Refresh token is required" });
    }

    // Знаходимо користувача за refreshToken
    const user = await User.findOne({ refreshToken: oldRefreshToken });

    if (!user) {
      return res.status(403).send({ message: "Invalid or expired refresh token" });
    }

    // Генерація нового accessToken і refreshToken
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    // Оновлення токенів у користувача
    user.token = newAccessToken;
    user.refreshToken = newRefreshToken;
    await user.save();

    // Повернення нового accessToken і refreshToken
    return res.status(200).send({
      token: newAccessToken, // Повертаємо тільки новий accessToken
      refreshToken: newRefreshToken,
      message: "Tokens refreshed successfully"
    });

  } catch (error) {
    next(error);  // Передаємо помилку наступному middleware
  }
};

export const logout = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Якщо потрібен лише logout по access token
    if (!userId) {
      console.log('Logout failed: Missing user ID');
      return res.status(400).json({ message: "User ID is missing" });
    }

    // Тут можна зробити додаткові перевірки, якщо ви хочете, щоб refreshToken також було видалено
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Видалення access token (за потреби можна зробити додаткові кроки)
    user.token = null;
    await user.save();

    console.log(`User ${userId} logged out successfully`);

    res.status(200).json({
      message: "Logout successful"
    });

  } catch (error) {
    console.error('Error during logout:', error);
    next(error);
  }

};

export const getUserInfo = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving user information' });
  }
};

export default {
    register,
    login,
    logout,
    refreshTokens,
    getUserInfo
};



