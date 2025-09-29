import { ProxyScoreRequest } from '../models/ProxyScoreRequest';
import { Response } from 'express';
import { proxyQueue } from '../repositories/proxyQueue';

export interface IScoreService {
  processRequest(request: ProxyScoreRequest, res: Response): void;
}

export class ScoreProxy implements IScoreService {
  processRequest(request: ProxyScoreRequest, res: Response): void {
    // Controle de acesso, validação, etc. podem ser feitos aqui
    proxyQueue.enqueue({ request, res });
  }
}
