import express from 'express';
import UsuarioController from '../controllers/UserController.js';
import authorizationMiddleware  from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

// Rota para obter todos os usuários
router.get('/usuario',authorizationMiddleware, UsuarioController.getAllEntities);
// Rota para obter todos os usuário especifico
router.get('/usuario/:id', authorizationMiddleware,UsuarioController.getEntity);
// Rota para criar um novo usuário
router.post('/usuario', authorizationMiddleware,UsuarioController.createEntity);

// Rota para atualizar um usuário existente
router.put('/usuario/:matricula',authorizationMiddleware, UsuarioController.updateEntity);


router.delete('/usuario/:matricula',authorizationMiddleware, UsuarioController.deleteEntity);

export default router;
