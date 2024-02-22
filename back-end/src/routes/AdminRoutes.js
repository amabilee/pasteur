import express from 'express';
import adminController from '../controllers/AdminController.js';
import authorizationMiddleware  from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

// Rota para obter todos os usuários
router.get('/admin',authorizationMiddleware, adminController.getAllEntities);
// Rota para obter todos os usuário especifico
router.get('/admin/:id', authorizationMiddleware,adminController.getEntity);
// Rota para criar um novo usuário
router.post('/admin', authorizationMiddleware,adminController.createEntity);

// Rota para atualizar um usuário existente
router.put('/admin/:matricula',authorizationMiddleware, adminController.updateEntity);


router.delete('/admin/:matricula',authorizationMiddleware, adminController.deleteEntity);

export default router;
