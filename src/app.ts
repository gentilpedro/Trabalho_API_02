import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas principais
app.use('/api', router);

// Rota de teste
app.get('/', (_req, res) => {
  res.send('API de Pedidos de Restaurante funcionando!');
});

export default app;
