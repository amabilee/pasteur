import express from 'express';
import UsuarioController from '../controllers/UserController.js';

const router = express.Router();

// Rota para obter todos os usuários
router.get('/usuario', UsuarioController.getAllEntities);
// Rota para obter todos os usuário especifico
router.get('/usuario/:id', UsuarioController.getEntity);
// Rota para criar um novo usuário
router.post('/usuario', UsuarioController.createEntity);

// Rota para atualizar um usuário existente
router.put('/usuario/:id', UsuarioController.updateEntity);


router.delete('/usuario/:id', UsuarioController.deleteEntity);

export default router;
