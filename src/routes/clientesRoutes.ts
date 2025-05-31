import { Router } from 'express';
import { criarCliente, listarClientes } from '../controllers/clienteController';

const router = Router();

router.post('/', criarCliente);
router.get('/', listarClientes);

export default router;
