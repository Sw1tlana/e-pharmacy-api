import jwt from "jsonwebtoken";
import User from "../models/users.js";
import "dotenv/config"; 

async function auth(req, res, next) {
  if (req.path === '/refresh-tokens') {
    return next();
}

const { authorization = "" } = req.headers;
console.log("req.headers", req.headers);
console.log(req.headers.authorization);
const [bearer, token] = authorization.split(" ");

if (bearer !== "Bearer") {
    console.log('bearer', bearer);
    return next();
}

try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`Decoded ID: ${id}`);
    const user = await User.findById(id);
    console.log(user);

    if (!user || user.token !== token || !user.token) {
        return next();
    }

    req.user = user;
    console.log('req.user', req.user);
    next();
} catch (error) {
    if (error.name === "TokenExpiredError") {
        console.log("Token expired, need refresh");
        return res.status(401).json({ message: "Token expired. Please refresh your token." });
      }
    console.log("Auth error:", error); 
    next();
}
};

export default auth;