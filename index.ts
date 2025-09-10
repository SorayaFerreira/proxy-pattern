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

const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const url = "https://score.hsborges.dev/api"