import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.get('/', (_req, res) => {
  res.send('API Restaurante funcionando!');
});

export default app;
