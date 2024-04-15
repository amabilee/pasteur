import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';
const endpointsFile = [
    '../src/routes/FamiliaRoutes.js',
    '../src/routes/LoginRoutes.js',
    '../src/routes/PedidoRoutes.js',
    '../src/routes/UserRoutes.js'

];

const doc = {
	info: {
		version: '1.2.0',
		title: 'SCA Backend',
		description: 'Sistema de controle de acesso'
	},
	host: 'localhost:3000',
	basePath: '/',
	consumes: ['application/json'],
	produces: ['application/json'],
	securityDefinitions: {
		apiKey: {
			type: 'apiKey',
			name: 'Authentication',
			in:'header'
		},
		accessLevel: {
			type: 'apiKey',
			name: 'access-level',
			in: 'header'
		}
	},
	security: [
		{ apiKey: [] },
		{ accessLevel: [] }
	]
};

swaggerAutogen(outputFile, endpointsFile, doc);

