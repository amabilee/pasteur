import express from 'express';
import PedidoController from '../controllers/PedidoController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';
import authoricationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pedido
 *   description: Operações relacionadas aos pedidos.
 */

/**
 * @swagger
 * /pedido:
 *   get:
 *     summary: Obtém todos os pedidos.
 *     tags: [Pedido]
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Erro interno do servidor.
 *   post:
 *     summary: Cria um novo pedido.
 *     tags: [Pedido]
 *     security:
 *       - apiKey: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */

router.get('/pedido', authorizationMiddleware, authoricationMiddleware({ requiredRoles: ['admin', 'colaborador', 'aluno'] }), PedidoController.getAllEntities);
router.get('/pedido/:id', authorizationMiddleware, authoricationMiddleware({ requiredRoles: ['admin', 'colaborador', 'aluno'] }), PedidoController.getEntity);
router.post('/pedido', authorizationMiddleware, authoricationMiddleware({ requiredRoles: ['admin', 'colaborador', 'aluno'] }), PedidoController.createEntity);
router.put('/pedido/:id', authorizationMiddleware, authoricationMiddleware({ requiredRoles: ['admin', 'colaborador', 'aluno'] }), PedidoController.updateEntity);
router.delete('/pedido/:id', authorizationMiddleware, authoricationMiddleware({ requiredRoles: ['admin', 'colaborador'] }), PedidoController.deleteEntity);

export default router;
