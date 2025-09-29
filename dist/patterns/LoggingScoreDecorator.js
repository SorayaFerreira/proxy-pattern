"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingScoreDecorator = void 0;
class LoggingScoreDecorator {
    constructor(wrapped) {
        this.wrapped = wrapped;
    }
    processRequest(request, res) {
        console.log(`[DECORATOR] Processando requisição: client-id=${request.clientId}, cpf=${request.cpf}`);
        this.wrapped.processRequest(request, res);
    }
}
exports.LoggingScoreDecorator = LoggingScoreDecorator;
