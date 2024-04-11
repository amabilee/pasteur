import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../swagger/swagger_output.json' assert { type: 'json' };
import usuarios from './UserRoutes.js';
import login from './LoginRoutes.js';
import pedido from './PedidoRoutes.js';
import Familia from './FamiliaRoutes.js';


const routes = (app) => {
	const swaggerUiOptions = {
		    customJs: '../../swagger/custom.js'
	};

	app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerUiOptions));

	app.use(express.json());
    app.use('/', usuarios);
    app.use('/', login);
    app.use('/', pedido);
    app.use('/', Familia);
};

export default routes;
