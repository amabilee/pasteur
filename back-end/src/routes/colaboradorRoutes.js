import express from 'express';
import ColaboradorController from '../controllers/ColaboradorController.js';
import authentizationMiddleware  from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

// Rota para obter todos os usuários
router.get('/colaborador',authentizationMiddleware, ColaboradorController.getAllEntities);
// Rota para obter todos os usuário especifico
router.get('/colaborador/:id', authentizationMiddleware,ColaboradorController.getEntity);
// Rota para criar um novo usuário
router.post('/colaborador', authentizationMiddleware,ColaboradorController.createEntity);

// Rota para atualizar um usuário existente
router.put('/colaborador/:id', authentizationMiddleware,ColaboradorController.updateEntity);


router.delete('/colaborador/:id', authentizationMiddleware,ColaboradorController.deleteEntity);

export default router;
