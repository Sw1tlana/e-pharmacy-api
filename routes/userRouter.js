import express from 'express';
import UsersControllers from '../controllers/usersControllers.js';
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post('/register', UsersControllers.register);
router.post('/login', UsersControllers.login);
router.post('/logout', authMiddleware, UsersControllers.logout);

export default router;