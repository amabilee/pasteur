import express from 'express';
import FamiliaController from '../controllers/FamiliaController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

/* #swagger.tags = ['Família'] */
router.get('/familia', authorizationMiddleware, authenticationMiddleware({ cargo: [1, 2, 3] }), FamiliaController.getAllEntities);
router.get('/familia/:id', authorizationMiddleware, authenticationMiddleware({ cargo: [1, 2, 3] }), FamiliaController.getEntity);
router.post('/familia', authorizationMiddleware, authenticationMiddleware({ cargo: [1, 2] }), FamiliaController.createEntity);
router.put('/familia/:id', authorizationMiddleware, authenticationMiddleware({ cargo: [1, 2] }), FamiliaController.updateEntity);
router.delete('/familia/:id', authorizationMiddleware, authenticationMiddleware({ cargo: [1] }), FamiliaController.deleteEntity);

export default router;
