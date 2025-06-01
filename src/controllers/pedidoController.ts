import { Request, Response } from 'express';
import * as pedidoService from '../services/pedidoService';

export const criarPedido = async (req: Request, res: Response) => {
  try {
    const pedido = await pedidoService.criarPedido(req.body);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const listarPedidos = async (_req: Request, res: Response) => {
  try {
    const pedidos = await pedidoService.listarPedidos();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
