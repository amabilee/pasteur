import express from 'express';
import loginController from '../controllers/LoginController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Operações relacionadas ao login e logout.
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login do usuário.
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matricula:
 *                 type: string
 *                 example: "12345"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *       401:
 *         description: Não autorizado.
 *       500:
 *         description: Erro interno do servidor.
 *   get:
 *     summary: Realiza o logout do usuário.
 *     tags: [Login]
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso.
 *       401:
 *         description: Não autorizado.
 */
router.post('/login', loginController.login);
router.get('/login', loginController.logout);

export default router;
