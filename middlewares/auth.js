import jwt from "jsonwebtoken";
import User from "../models/users.js";
import "dotenv/config"; 

async function auth(req, res, next) {
  if (req.path === '/refresh-tokens') {
    return next();
}
const { authorization = "" } = req.headers;

// Перевіряємо, чи є заголовок
if (!authorization) {
  return res.status(401).json({ message: "Unauthorized: Token missing or malformed" });
}

console.log("Authorization header (original):", authorization);

const trimmedAuthorization = authorization.replace(/\s+/g, " ").trim();
console.log("Authorization header (trimmed):", trimmedAuthorization);

const [bearer, token] = trimmedAuthorization.split(" ");
console.log("Split parts:", bearer, token);

if (bearer !== "Bearer" || !token) {
  return res.status(401).json({ message: "Unauthorized: Token missing or malformed" });
}
try {
  // Декодувати токен
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  console.log(`Decoded ID: ${id}`);

  // Знайти користувача в базі
  const user = await User.findById(id);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized: User not found" });
  }

  if (!user.token || user.token !== token) {
    return res.status(401).json({ message: "Unauthorized: Token mismatch" });
  }

  req.user = user; // Додати користувача в req
  next();
} catch (error) {
  if (error.name === "TokenExpiredError") {
    console.log("Token expired");
    return res.status(401).json({ message: "Token expired. Please refresh your token." });
  } else if (error.name === "JsonWebTokenError") {
    console.log("Invalid token");
    return res.status(401).json({ message: "Invalid token" });
  }

  console.error("Auth error:", error.message);
  res.status(500).json({ message: "Internal server error" });
}
};

export default auth;