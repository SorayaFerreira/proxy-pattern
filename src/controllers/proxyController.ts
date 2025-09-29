import { Request, Response } from 'express';
import { ProxyScoreRequest } from '../models/ProxyScoreRequest';
import { proxyQueue } from '../repositories/proxyQueue';
import { ScoreProxy } from '../patterns/ScoreProxy';
import { LoggingScoreDecorator } from '../patterns/LoggingScoreDecorator';

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

  // Instancia o serviço real (poderia ser um ScoreService)
  // Aqui, para exemplo, vamos usar o proxy e o decorator
  const scoreProxy = new ScoreProxy();
  const decoratedProxy = new LoggingScoreDecorator(scoreProxy);

  // Processa a requisição usando o decorator (que usa o proxy internamente)
  decoratedProxy.processRequest(proxyRequest, res);
};
