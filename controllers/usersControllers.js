import usersServices, { getUserInfoServices } from "../services/usersServices.js";

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
      user: {
        email: result.email,
      },
      message: "Login successful"
    });

  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
   await usersServices.userLogoutService(req.user.id);

   return res.status(204).end();
   
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
    getUserInfo
};



