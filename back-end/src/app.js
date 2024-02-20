import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import cors from 'cors';

try {
	await db.sync(); 
	console.warn('All models were synchronized successfully.');
} catch (error) {
	console.error(error);
}

const app = express();

cors(app);
app.use(express.json());

routes(app);

export default app;