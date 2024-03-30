import express from 'express';
import PedidoController from '../controllers/PedidoController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/pedido/:id', authorizationMiddleware, PedidoController.getEntity);
router.get('/pedido', authorizationMiddleware, PedidoController.getAllEntities);
router.post('/pedido', authorizationMiddleware,PedidoController.createEntity);
router.put('/pedido/:id', authorizationMiddleware,PedidoController.updateEntity);
router.delete('/pedido/:id', authorizationMiddleware,PedidoController.deleteEntity);

export default router;