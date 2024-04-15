import express from 'express';
import UsuarioController from '../controllers/UserController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

/* #swagger.tags = ['Usuario'] */
router.get('/usuario', authorizationMiddleware, authenticationMiddleware({ cargo: [1] }), UsuarioController.getAllEntities);
router.get('/usuario/:matricula', authorizationMiddleware, authenticationMiddleware({ cargo: [1, 2, 3] }), UsuarioController.getEntity);
router.post('/usuario', authorizationMiddleware, authenticationMiddleware({ cargo: [1] }), UsuarioController.createEntity);
router.put('/usuario/:matricula', authorizationMiddleware, authenticationMiddleware({ cargo: [1, 2, 3] }), UsuarioController.updateEntity);
router.put('/usuario/modificar/:matricula', UsuarioController.updateEntity);
router.delete('/usuario/:matricula', authorizationMiddleware, authenticationMiddleware({ cargo: [1] }), UsuarioController.deleteEntity);

export default router;
