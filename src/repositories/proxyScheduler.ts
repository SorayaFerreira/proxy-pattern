import axios from 'axios';
import { proxyQueue } from '../repositories/proxyQueue';

// Scheduler: processa 1 requisição por segundo
setInterval(async () => {
  const item = proxyQueue.dequeue();
  if (!item) return;

  const { request, res } = item;
  try {
    const response = await axios.get('https://score.hsborges.dev/score', {
      headers: { 'client-id': request.clientId },
      params: { cpf: request.cpf },
      timeout: 5000
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Erro ao comunicar com o serviço externo' });
    }
  }
}, 1000);
