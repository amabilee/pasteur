import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

const outputFile = './swagger_output.json';
const endpointsFile = [
    '../src/routes/FamiliaRoutes.js',
    '../src/routes/index.js',
    '../src/routes/LoginRoutes.js',
    '../src/routes/PedidoRoutes.js',
    '../src/routes/UserRoutes.js',
];

// Obter a chave secreta JWT do arquivo .env
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Verificar se a chave JWT foi carregada corretamente
if (!jwtSecretKey) {
    console.error("Chave JWT não encontrada no arquivo .env.");
    process.exit(1); // Encerrar o processo com erro
}

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
            name: 'Authorization',
            in: 'header'
        }
    },
    // Passar a chave secreta JWT para o Swagger
    security: [{ apiKey: [] }],
    // Adicionar a chave JWT como variável global
    securitySchemes: {
        apiKey: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            value: jwtSecretKey
        }
    }
};

// Gerar a documentação do Swagger
swaggerAutogen(outputFile, endpointsFile, doc);
