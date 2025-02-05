import usersServices from "../services/usersServices.js";
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

   if (result.message) {
    return res.status(409).send({ message: result.message });
}

    return res.status(201).send({
      message: "Registration successfully!",
      user: result.user, 
      token: result.token,
      refreshToken: result.refreshToken,
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

    return res.status(200).send({
      token: result.token,
      refreshToken: result.refreshToken,
      user: result.user, 
      message: "Login successful"
    });

  } catch (error) {
    console.error("Error during login:", error);
    next(error);
  }
};

export const refreshTokens = async (req, res, next) => {
  try {

    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    const result = await usersServices.refreshTokensServices(refreshToken);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.token = null;
    await user.save();

    res.status(200).json({
      message: "Logout successful"
    });

  } catch (error) {
    next(error);
  }

};

export const getUserInfo = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userInfo = await usersServices.getUserInfoServices(req.user._id);

    if (!userInfo) {
      return res.status(404).json({ message: 'User info not found' });
    }

    return res.status(200).json(userInfo); 
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



