import jwt from "jsonwebtoken";
import User from "../models/users.js";
import "dotenv/config"; 

async function auth(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  if (req.path === "/refresh-tokens") {
    return next();
  }

  if (typeof authorizationHeader !== "string") {
    return res.status(401).send({ message: "Not authorized" });
  }

  const [bearer, token] = authorizationHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).send({ message: "Token not provided or invalid format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    if (token !== user.token) {
      return res.status(401).send({ message: "Token mismatch" });
    }

    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error('Token verification or database query error:', err.message);
    return res.status(401).send({ message: "Not authorized" });
  }
}

export default auth;