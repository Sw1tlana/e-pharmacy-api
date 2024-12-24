import express from 'express';
import UsersControllers from '../controllers/usersControllers.js';
import validateBody from "../helpers/validateBody.js";
import authMiddlewares from "../middlewares/auth.js";
import { registersSchema, loginSchema, refreshTokenSchema } from "../schemas/usersShemas.js";

const router = express.Router();

router.post('/register', 
    validateBody(registersSchema), 
    UsersControllers.register);

router.post('/login',
    validateBody(loginSchema), 
    UsersControllers.login);

router.post('/logout', authMiddlewares, 
    UsersControllers.logout);

router.post("/refresh-tokens", 
    validateBody(refreshTokenSchema),  
    UsersControllers.refreshTokens);
    
router.get('/user-info',
    authMiddlewares,
    UsersControllers.getUserInfo)

export default router;