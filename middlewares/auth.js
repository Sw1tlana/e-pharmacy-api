import jwt from "jsonwebtoken";
import User from "../models/users.js";

function auth(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (typeof authorizationHeader !== "string") {
    return res.status(401).send({ message: "Not authorized" });
  }

  const [bearer, token] = authorizationHeader.split(" ", 2);
  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Not authorized" });
    }
    try {
      const user = await User.findById(decode.id);
      if (user === null) {
        console.log(`User with ID ${decode.id} not found.`);
        return res.status(401).send({ message: "Not authorized" });
      }
      if (token !== user.token) {
        console.log("Token does not match the stored token for the user.");
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