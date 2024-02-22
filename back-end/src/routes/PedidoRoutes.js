import express from 'express';
import UsuarioController from '../controllers/UserController.js';
import authorizationMiddleware  from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

// Rota para obter todos os pedidos
router.get('/pedido',authorizationMiddleware, UsuarioController.getAllEntities);
// Rota para obter um pedido especifico
router.get('/pedido/:id', authorizationMiddleware,UsuarioController.getEntity);
// Rota para criar um novo pedido
router.post('/pedido', authorizationMiddleware,UsuarioController.createEntity);
// Rota para atualizar um pedido existente
router.put('/pedido/:id',authorizationMiddleware, UsuarioController.updateEntity);
//Rota para deletar o pedido
router .delete('/pedido/:id',authorizationMiddleware, UsuarioController.deleteEntity);

export default router;
