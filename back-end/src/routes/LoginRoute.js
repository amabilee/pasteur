import express from 'express';
import loginController from '../controllers/LoginController.js';

const router = express.Router();

// Rota para obter login
router.post('/login', loginController.login);
// Rota para obter logout
router.get('/login', loginController.logout);

export default router;
