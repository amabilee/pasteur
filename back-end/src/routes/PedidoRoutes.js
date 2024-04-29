import express from 'express';
import PedidoController from '../controllers/PedidoController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

/* #swagger.tags = ['Pedido'] */
router.get('/pedido/:id', authorizationMiddleware, authenticationMiddleware({ cargo: [1, 2, 3] }), PedidoController.getEntity);
router.get('/pedido', authorizationMiddleware, authenticationMiddleware({ cargo: [1, 2, 3] }), PedidoController.getAllEntities);
router.post('/pedido', authorizationMiddleware, authenticationMiddleware({ cargo: [1, 2, 3] }), PedidoController.createEntity);
router.put('/pedido/:id', authorizationMiddleware, authenticationMiddleware({ cargo: [1, 2, 3] }), PedidoController.updateEntity);
router.delete('/pedido/:id', authorizationMiddleware, authenticationMiddleware({ cargo: [1] }), PedidoController.deleteEntity);

export default router;
