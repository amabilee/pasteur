import express from 'express';
import ColaboradorController from '../controllers/ColaboradorController.js ';

const router = express.Router();

// Rota para obter todos os usuários
router.get('/colaborador', ColaboradorController.getAllEntities);
// Rota para obter todos os usuário especifico
router.get('/colaborador/:id', ColaboradorController.getEntity);
// Rota para criar um novo usuário
router.post('/colaborador', ColaboradorController.createEntity);

// Rota para atualizar um usuário existente
router.put('/colaborador/:id', ColaboradorController.updateEntity);


router.delete('/colaborador/:id', ColaboradorController.deleteEntity);

export default router;
