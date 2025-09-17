import { Request, Response } from 'express';
import { ProxyScoreRequest } from '../models/ProxyScoreRequest';
import { proxyQueue } from '../repositories/proxyQueue';

export const proxyScoreController = (req: Request, res: Response) => {
  const clientId = req.header('client-id');
  const cpf = req.query.cpf;

  if (!clientId) {
    return res.status(401).json({ error: 'Client ID não informado ou inválido' });
  }
  if (!cpf || typeof cpf !== 'string') {
    return res.status(400).json({ error: 'CPF inválido ou não fornecido' });
  }


  // Log detalhado da requisição recebida
  console.log(`[PROXY] Requisição recebida: client-id=${clientId}, cpf=${cpf}`);

  // Parsing OK, criar objeto de requisição estruturado
  const proxyRequest: ProxyScoreRequest = {
    clientId,
    cpf
  };

  // Enfileira a requisição para o scheduler
  proxyQueue.enqueue({ request: proxyRequest, res });
  return res.status(202).json({
    message: 'Requisição recebida e será processada pelo proxy',
    request: proxyRequest
  });
};
