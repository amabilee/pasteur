// Importações
import express from 'express';
import FamiliaController from '../controllers/FamiliaController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/familia/:id', authorizationMiddleware, FamiliaController.getEntity);
router.post('/familia', authorizationMiddleware, FamiliaController.createEntity);
router.put('/familia/:id', authorizationMiddleware, FamiliaController.updateEntity);
router.delete('/familia/:id', authorizationMiddleware, FamiliaController.deleteEntity);

export default router;
