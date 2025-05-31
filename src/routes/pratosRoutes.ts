import { Router } from 'express';
import { criarPrato, listarPratos } from '../controllers/pratoController';

const router = Router();

router.post('/', criarPrato);
router.get('/', listarPratos);

export default router;
