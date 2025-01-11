import jwt from "jsonwebtoken";
import User from "../models/users.js";
import "dotenv/config"; 

async function auth(req, res, next) {
  if (req.path === '/refresh-tokens') {
    return next();
}
const { authorization = "" } = req.headers;
const [bearer, token] = authorization.split(" ");
console.log("Authorization header:", authorization);
console.log("Bearer:", bearer, "Token:", token); 


if (bearer !== "Bearer") {
    return next();
}

try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    console.log(user);

    if (!user || user.token !== token || !user.token) {

      console.log("User not found or token mismatch");
        return next();
    }

    req.user = user;
    next();
} catch (error) {
    next();
}
};

export default auth;