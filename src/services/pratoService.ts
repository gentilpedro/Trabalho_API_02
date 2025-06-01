// @ts-ignore
import { PrismaClient, Prato } from '@prisma/client';

const prisma = new PrismaClient();

export const criarPrato = async (data:Prato) => {
  return await prisma.prato.create({ data });
};

export const listarPratos = async () => {
  return await prisma.prato.findMany();
};
