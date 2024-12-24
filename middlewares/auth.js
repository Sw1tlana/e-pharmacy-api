import jwt from "jsonwebtoken";
import User from "../models/users.js";
import "dotenv/config"; 

function auth(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  console.log("Authorization Header:", req.headers['authorization']);

  // Пропускаємо перевірку для refresh-token
  if (req.path === "/refresh-tokens") {
    return next(); 
  }

  // Перевірка на правильний тип авторизації
  if (typeof authorizationHeader !== "string") {
    return res.status(401).send({ message: "Not authorized" });
  }

  // Розподіляємо заголовок на тип (Bearer) та токен
  const [bearer, token] = authorizationHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).send({ message: "Token not provided or invalid format" });
  }

  console.log('Token:', token);

  // Верифікація токена
  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      console.error('Token verification error:', err.message);
      return res.status(401).send({ message: "Not authorized" });
    }
    
    try {
      const user = await User.findById(decode.id);

      if (!user) {
        return res.status(401).send({ message: "User not found" });
      }
      
      if (token !== user.token) {
        return res.status(401).send({ message: "Token mismatch" });
      }

      // Додаємо користувача в запит
      req.user = { id: decode.id };
      next();
    } catch (error) {
      console.error("Error during user authentication:", error);
      return res.status(500).send({ message: "Server error during authentication" });
    }
  });
}

export default auth;