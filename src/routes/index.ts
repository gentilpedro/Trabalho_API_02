import { Router } from 'express';
import clienteRoutes from './clientesRoutes';
import pratoRoutes from './pratosRoutes';
import pedidoRoutes from './pedidosRoutes';

const router = Router();

router.use('/clientes', clienteRoutes);
router.use('/pratos', pratoRoutes);
router.use('/pedidos', pedidoRoutes);

export default router;
