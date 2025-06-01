import { Router } from 'express';
import { criarPedido, listarPedidos } from '../controllers/pedidoController';

const router = Router();

router.post('/', criarPedido);
router.get('/', listarPedidos);

export default router;
