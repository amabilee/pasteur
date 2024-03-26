import express from 'express';
import UsuarioController from '../controllers/UserController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';
import authoricationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Operações relacionadas aos usuários.
 */

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Obtém todos os usuários.
 *     tags: [Usuario]
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Erro interno do servidor.
 *   post:
 *     summary: Cria um novo usuário.
 *     tags: [Usuario]
 *     security:
 *       - apiKey: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */

router.get('/usuario', authorizationMiddleware, authoricationMiddleware({ requiredRoles: ['admin', 'colaborador'] }), UsuarioController.getAllEntities);
router.get('/usuario/:matricula', authoricationMiddleware({ requiredRoles: ['admin', 'colaborador'] }), UsuarioController.getEntity);
router.post('/usuario', authorizationMiddleware, authoricationMiddleware({ requiredRoles: ['admin'] }), UsuarioController.createEntity);
router.put('/usuario/:matricula', authorizationMiddleware, authoricationMiddleware({ requiredRoles: ['admin'] }), UsuarioController.updateEntity);
router.delete('/usuario/:matricula', authorizationMiddleware, authoricationMiddleware({ requiredRoles: ['admin'] }), UsuarioController.deleteEntity);

export default router;
