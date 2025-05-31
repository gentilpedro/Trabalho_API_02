// @ts-ignore
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const criarPrato = async (data: Prisma.PratoCreateInput) => {
  return await prisma.prato.create({ data });
};

export const listarPratos = async () => {
  return await prisma.prato.findMany();
};
