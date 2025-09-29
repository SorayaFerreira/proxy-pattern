"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreProxy = void 0;
const proxyQueue_1 = require("../repositories/proxyQueue");
class ScoreProxy {
    processRequest(request, res) {
        // Controle de acesso, validação, etc. podem ser feitos aqui
        proxyQueue_1.proxyQueue.enqueue({ request, res });
    }
}
exports.ScoreProxy = ScoreProxy;
