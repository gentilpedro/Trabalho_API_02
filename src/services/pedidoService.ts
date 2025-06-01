// @ts-ignore
import { PrismaClient, Pedido } from '@prisma/client';

const prisma = new PrismaClient();

export const criarPedido = async (data:Pedido) => {
  return await prisma.pedido.create({
    data,
    include: {
      cliente: true,
      itens: true,
      pagamento: true,
    },
  });
};

export const listarPedidos = async () => {
  return await prisma.pedido.findMany({
    include: {
      cliente: true,
      itens: {
        include: {
          prato: true,
        },
      },
      pagamento: true,
    },
  });
};
