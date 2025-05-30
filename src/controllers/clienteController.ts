import { Request, Response } from 'express';
import * as clienteService from '../services/clienteService';

export const criarCliente = async (req: Request, res: Response) => {
  try {
    const cliente = await clienteService.criarCliente(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const listarClientes = async (_req: Request, res: Response) => {
  try {
    const clientes = await clienteService.listarClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
