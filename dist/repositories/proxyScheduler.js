"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios")); // ajuda a fazer requisições HTTP para serviços externos
const proxyQueue_1 = require("../repositories/proxyQueue");
// Scheduler: processa 1 requisição por segundo
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    // pega uma requisição da fila a cada 1 segundo e manda pro serviço de consulta de score. 
    // também repassa a mensagem para o cliente de origem.
    const item = proxyQueue_1.proxyQueue.dequeue();
    if (!item)
        return;
    const { request, res } = item;
    console.log('[SCHEDULER] Item da fila:', item);
    try {
        const response = yield axios_1.default.get('https://score.hsborges.dev/score', {
            headers: { 'client-id': request.clientId },
            params: { cpf: request.cpf },
            timeout: 5000
        });
        console.log('Dados recebidos do upstream:', response.data);
        res.status(response.status).json(response.data);
    }
    catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        }
        else {
            res.status(500).json({ error: 'Erro ao comunicar com o serviço externo' });
        }
    }
}), 1000);
