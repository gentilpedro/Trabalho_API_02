// @ts-ignore
import { PrismaClient, Cliente } from '@prisma/client';

const prisma = new PrismaClient();

export const criarCliente = async (data: Cliente) => {
  return await prisma.cliente.create({
    data,
  });
};

export const listarClientes = async () => {
  return await prisma.cliente.findMany();
};
