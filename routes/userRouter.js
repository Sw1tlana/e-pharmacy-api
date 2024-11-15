import express from 'express';
import UsersControllers from '../controllers/usersControllers.js';


const router = express.Router();

router.post('/register', UsersControllers.register);
router.post('/login', UsersControllers.login);

export default router;