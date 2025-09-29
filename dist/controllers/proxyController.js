"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyScoreController = void 0;
const ScoreProxy_1 = require("../patterns/ScoreProxy");
const LoggingScoreDecorator_1 = require("../patterns/LoggingScoreDecorator");
const proxyScoreController = (req, res) => {
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
    const proxyRequest = {
        clientId,
        cpf
    };
    // Instancia o serviço real (poderia ser um ScoreService)
    // Aqui, para exemplo, vamos usar o proxy e o decorator
    const scoreProxy = new ScoreProxy_1.ScoreProxy();
    const decoratedProxy = new LoggingScoreDecorator_1.LoggingScoreDecorator(scoreProxy);
    // Processa a requisição usando o decorator (que usa o proxy internamente)
    decoratedProxy.processRequest(proxyRequest, res);
};
exports.proxyScoreController = proxyScoreController;
