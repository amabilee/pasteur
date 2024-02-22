import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import cors from 'cors';
import seed from './util/index.js';
import dotenv from 'dotenv';

// Configuração do dotenv para carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Inicialização do banco de dados
try {
    await db.sync();
    console.warn('All models were synchronized successfully.');
} catch (error) {
    console.error(error);
}

// Inicialização do servidor Express
const app = express();

// Middleware para lidar com CORS
app.use(cors());

// Middleware para análise do corpo da solicitação em JSON
app.use(express.json());

// Seed para criar um usuário admin
seed()
    .then(() => {
        console.log('Seeds feitas com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao fazer seeds: ', error);
    });
    
// Configuração das rotas
routes(app);

// Exporta o aplicativo para ser usado em outros lugares
export default app;
