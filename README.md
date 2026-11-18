# Cypress Lab – TaskBoard

Projeto prático para aprender testes End-to-End (E2E) com [Cypress](https://www.cypress.io).

A pasta `app/` contém o **TaskBoard**, uma pequena aplicação com login e lista de tarefas, pronta a ser testada. Os testes vão para `cypress/e2e/`, que começa vazia.

## Requisitos

- [Node.js](https://nodejs.org) 20 ou superior
- Git
- Google Chrome

## Como começar

```bash
git clone https://github.com/professordiogodev/cypress-lab.git
cd cypress-lab
npm install
```

## Comandos

| Comando | O que faz |
|---|---|
| `npm start` | Arranca a app em http://localhost:8080 |
| `npm run cy:open` | Abre o Cypress com interface gráfica (a app tem de estar a correr) |
| `npm run cy:run` | Corre todos os testes no terminal (a app tem de estar a correr) |
| `npm run test:e2e` | Arranca a app, corre todos os testes e desliga a app (é o que corre no CI) |

Credenciais de teste da app: `ana@empresa.pt` / `cypress123`

## Soluções

As soluções dos exercícios estão no branch [`solucoes`](https://github.com/professordiogodev/cypress-lab/tree/solucoes):

```bash
git switch solucoes
```
