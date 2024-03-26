import express from 'express';
import loginController from '../controllers/LoginController.js';

const router = express.Router();

router.post('/login', loginController.login);
router.get('/login', loginController.logout);

export default router;
