import express from 'express';
import UsuarioController from '../controllers/UserController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/usuario', authorizationMiddleware, UsuarioController.getAllEntities);
router.get('/usuario/:matricula', authorizationMiddleware, UsuarioController.getEntity);
router.post('/usuario', authorizationMiddleware, UsuarioController.createEntity);
router.put('/usuario/:matricula', authorizationMiddleware, UsuarioController.updateEntity);
router.delete('/usuario/:matricula', authorizationMiddleware, UsuarioController.deleteEntity);

export default router;
