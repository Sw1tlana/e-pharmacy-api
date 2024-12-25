import jwt from "jsonwebtoken";
import User from "../models/users.js";
import "dotenv/config"; 

async function auth(req, res, next) {
  if (req.path === '/refresh-tokens') {
    return next();
}

const { authorization = "" } = req.headers;
const [bearer, token] = authorization.split(" ");

if (bearer !== "Bearer") {
    return next();
}

try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || user.token !== token || !user.token) {
        return next();
    }

    req.user = user;
    next();
} catch (error) {
    next();
}
};

export default auth;