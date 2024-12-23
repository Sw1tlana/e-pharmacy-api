import jwt from "jsonwebtoken";
import User from "../models/users.js";
import "dotenv/config"; 

function auth(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  console.log('Authorization Header:', authorizationHeader);

  if (typeof authorizationHeader !== "string") {
    return res.status(401).send({ message: "Not authorized" });
  }

  const [bearer, token] = authorizationHeader.split(" ", 1);
  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Not authorized" });
  }

  console.log('Token:', token);
  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(401).send({ message: "Not authorized" });
    }
    try {
      const user = await User.findById(decode.id);

      if (user === null) {
        return res.status(401).send({ message: "Not authorized" });
      }
      if (token !== user.token) {
        return res.status(401).send({ message: "Not authorized" });
      }

      req.user = { id: decode.id };
      next();
    } catch (error) {
      console.error("Error during user authentication:", error);
      next(error);
    }
  });
}
export default auth;