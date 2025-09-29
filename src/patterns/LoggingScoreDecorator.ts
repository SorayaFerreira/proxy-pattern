import { IScoreService } from './ScoreProxy';
import { ProxyScoreRequest } from '../models/ProxyScoreRequest';
import { Response } from 'express';

export class LoggingScoreDecorator implements IScoreService {
  private wrapped: IScoreService;

  constructor(wrapped: IScoreService) {
    this.wrapped = wrapped;
  }

  processRequest(request: ProxyScoreRequest, res: Response): void {
    console.log(`[DECORATOR] Processando requisição: client-id=${request.clientId}, cpf=${request.cpf}`);
    this.wrapped.processRequest(request, res);
  }
}
