import express from 'express';
import usuarios from './usuarioRoutes.js';
import colaboradores from './colaboradorRoutes.js';


const routes = (app) => {
	app.use(express.json());

	app.use('/', usuarios);
	app.use('/', colaboradores);
};

export default routes;

