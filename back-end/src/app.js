import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import cors from 'cors';
import seed from './util/index.js';
import dotenv from 'dotenv';

dotenv.config();

try {
    await db.sync();
    console.warn('All models were synchronized successfully.');
} catch (error) {
    console.error(error);
}

const app = express();

app.use(cors());

app.use(express.json());

seed()
    .then(() => {
        console.log('Seeds feitas com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao fazer seeds: ', error);
    });

routes(app);

export default app;
