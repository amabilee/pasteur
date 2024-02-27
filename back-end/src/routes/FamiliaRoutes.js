import express from 'express';
import FamiliaController from '../controllers/FamiliaController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /Familia:
 *   get:
 *     summary: Obtém todas as famílias.
 *     description: Rota para obter todas as famílias.
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Lista de famílias obtida com sucesso.
 *       401:
 *         description: Não autorizado.
 */
router.get('/Familia', authorizationMiddleware, authenticationMiddleware({ requiredRoles: ['admin', 'colaborador', 'aluno'] }), FamiliaController.getAllEntities);

/**
 * @swagger
 * /Familia/{id}:
 *   get:
 *     summary: Obtém uma família pelo ID.
 *     description: Rota para obter uma família específica pelo ID.
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da família a ser obtida.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Família obtida com sucesso.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Família não encontrada.
 */
router.get('/Familia/:id', authorizationMiddleware, authenticationMiddleware({ requiredRoles: ['admin', 'colaborador', 'aluno'] }), FamiliaController.getEntity);

/**
 * @swagger
 * /Familia:
 *   post:
 *     summary: Cria uma nova família.
 *     description: Rota para criar uma nova família.
 *     security:
 *       - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Familia'
 *     responses:
 *       201:
 *         description: Família criada com sucesso.
 *       401:
 *         description: Não autorizado.
 */
router.post('/Familia', authorizationMiddleware, authenticationMiddleware({ requiredRoles: ['admin'] }), FamiliaController.createEntity);

/**
 * @swagger
 * /Familia/{id}:
 *   put:
 *     summary: Atualiza uma família pelo ID.
 *     description: Rota para atualizar uma família existente pelo ID.
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da família a ser atualizada.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Familia'
 *     responses:
 *       200:
 *         description: Família atualizada com sucesso.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Família não encontrada.
 */
router.put('/Familia/:id', authorizationMiddleware, authenticationMiddleware({ requiredRoles: ['admin'] }), FamiliaController.updateEntity);

/**
 * @swagger
 * /Familia/{id}:
 *   delete:
 *     summary: Deleta uma família pelo ID.
 *     description: Rota para deletar uma família existente pelo ID.
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da família a ser deletada.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Família deletada com sucesso.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Família não encontrada.
 */
router.delete('/Familia/:id', authorizationMiddleware, authenticationMiddleware({ requiredRoles: ['admin'] }), FamiliaController.deleteEntity);

export default router;
