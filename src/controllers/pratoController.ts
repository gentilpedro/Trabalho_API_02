import { Request, Response } from 'express';
import * as pratoService from '../services/pratoService';

export const criarPrato = async (req: Request, res: Response) => {
  try {
    const prato = await pratoService.criarPrato(req.body);
    res.status(201).json(prato);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const listarPratos = async (_req: Request, res: Response) => {
  try {
    const pratos = await pratoService.listarPratos();
    res.json(pratos);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
