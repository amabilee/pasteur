import express from 'express';
import FamiliaController from '../controllers/FamiliaController.js';
import authorizationMiddleware  from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

// Rota para obter todos os usuários
router.get('/Familia',authorizationMiddleware, FamiliaController.getAllEntities);
// Rota para obter todos os usuário especifico
router.get('/Familia/:id', authorizationMiddleware,FamiliaController.getEntity);
// Rota para criar um novo usuário
router.post('/Familia', authorizationMiddleware,FamiliaController.createEntity);

// Rota para atualizar um usuário existente
router.put('/Familia/:matricula',authorizationMiddleware, FamiliaController.updateEntity);


router.delete('/Familia/:matricula',authorizationMiddleware, FamiliaController.deleteEntity);

export default router;
