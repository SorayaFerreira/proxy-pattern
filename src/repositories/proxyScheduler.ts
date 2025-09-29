import axios from 'axios'; // ajuda a fazer requisições HTTP para serviços externos
import { proxyQueue } from '../repositories/proxyQueue';

// Scheduler: processa 1 requisição por segundo
setInterval(async () => {    
// pega uma requisição da fila a cada 1 segundo e manda pro serviço de consulta de score. 
// também repassa a mensagem para o cliente de origem.


const item = proxyQueue.dequeue();
if (!item) return;

const { request, res } = item;

console.log('[SCHEDULER] Item da fila:', item);  

  try {
    const response = await axios.get('https://score.hsborges.dev/score', {
      headers: { 'client-id': request.clientId },
      params: { cpf: request.cpf },
      timeout: 5000
    });

    console.log('Dados recebidos do upstream:', response.data);
    res.status(response.status).json(response.data);

  } catch (error: any) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);

    } else {
      res.status(500).json({ error: 'Erro ao comunicar com o serviço externo' });

    }
  }
}, 1000);
