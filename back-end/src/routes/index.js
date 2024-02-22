import express from 'express';
import usuarios from './UserRoutes.js';
import login from './LoginRoute.js'
import colaboradores from './ColaboradorRoutes.js';
import pedido from './pedidoRoutes.js';
import Familia from './FamiliaRoutes.js';
import admin from './AdminRoutes.js';



const routes = (app) => {
	app.use(express.json());
//caminho das rotas
	app.use('/',usuarios,);
	app.use('/', colaboradores);
	app.use('/', login);
	app.use('/',pedido);
	app.use("/",Familia)
	app.use("/",admin)
}
export default routes;

