import express from 'express';
import usuarios from './UserRoutes.js';
import login from './LoginRoutes.js';
import pedido from './PedidoRoutes.js';
import Familia from './FamiliaRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../swagger/swagger_output.json' assert { type: 'json' };

const routes = (app) => {
    const swaggerUiOptions = { }; // Defina suas opções do Swagger aqui

    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerUiOptions));
    app.use(express.json());

    // Caminho das rotas
    app.use('/', usuarios);
    app.use('/', login);
    app.use('/', pedido);
    app.use('/', Familia);
};

export default routes;
