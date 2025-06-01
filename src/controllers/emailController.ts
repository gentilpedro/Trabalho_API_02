import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
// @ts-ignore
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,      // Ex: smtp.gmail.com
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,                    // true para 465, false para outras portas
  auth: {
    user: process.env.SMTP_USER,   // Seu e-mail
    pass: process.env.SMTP_PASS,   // Sua senha/app password
  },
});

export const enviarRelatorioCliente = async (req: Request, res: Response) => {
  try {
    const clienteId = Number(req.params.id);

    // Buscar cliente e pedidos relacionados
    const cliente = await prisma.cliente.findUnique({
      where: { id: clienteId },
      include: {
        pedidos: {
          include: {
            itens: {
              include: { prato: true },
            },
            pagamento: true,
          },
        },
      },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Montar o corpo do email com a listagem das ações (pedidos)
    let corpoEmail = `Olá ${cliente.nome},\n\nSegue a lista dos seus pedidos realizados:\n\n`;

    if (cliente.pedidos.length === 0) {
      corpoEmail += 'Nenhum pedido registrado.\n';
    } else {
      cliente.pedidos.forEach((pedido: { id: any; data: { toLocaleDateString: () => any; }; status: any; itens: { quantidade: any; prato: { nome: any; }; subtotal: number; }[]; pagamento: { formaPagamento: any; }; }) => {
        corpoEmail += `Pedido #${pedido.id} - Data: ${pedido.data.toLocaleDateString()} - Status: ${pedido.status}\n`;
        pedido.itens.forEach((item: { quantidade: any; prato: { nome: any; }; subtotal: number; }) => {
          corpoEmail += `  - ${item.quantidade}x ${item.prato.nome} (Subtotal: R$${item.subtotal.toFixed(2)})\n`;
        });
        corpoEmail += `Pagamento: ${pedido.pagamento ? pedido.pagamento.formaPagamento : 'Não informado'}\n\n`;
      });
    }

    corpoEmail += '\nObrigado por usar nosso sistema!';

    // Enviar o email
    await transporter.sendMail({
      from: `"Restaurante" <${process.env.SMTP_USER}>`,
      to: cliente.email,
      subject: 'Relatório de Ações - Seus Pedidos',
      text: corpoEmail,
    });

    res.json({ message: 'Email enviado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
