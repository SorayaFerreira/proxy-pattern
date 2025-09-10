"use strict";
/**
 * Nesta atividade você deverá submeter a base do serviço proxy do desafio.
 * Você deverá já propor uma base da aplicação com a aplicação de padrões de projeto.
 * Alguns padrões de destaque neste início (sugestões, que podem ou não ser empregados):
 * - Command: encapsulamento das requisições
 * - Singleton: garantir a existência de um único cliente do serviço ou fila
 * - Decorator: adição de capacidades dinâmicas ao serviço, como organização das chamadas, cache, etc.
 * - Iterator: iteração sobre a fila de requisições, inclusive, podendo ser usado para priorizações
 * - Observer: para notificação de atividades.
 *
 * DICAS:
 * - Comece criando apenas algo que recebe e repassa a requisição.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();

app.use(express_1.default.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// const url = "https://score.hsborges.dev/api"
