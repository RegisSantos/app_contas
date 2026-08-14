# app_contas

Aplicação full-stack para gestão de contas mensais, com frontend em Next.js e backend em Node.js.

## Visão geral

Este repositório contém a aplicação completa do projeto, dividida em:

- `node/` — API backend em Express
- `react/` — interface web em Next.js
- `docker-compose.yml` — orquestração dos serviços de infraestrutura e aplicação
- `.env` — variáveis de ambiente para o ambiente Docker

## Stack principal

- Frontend: Next.js + React + TypeScript
- Backend: Node.js + Express
- Banco de dados: MySQL
- Mensageria: RabbitMQ
- Cache: Redis

## Requisitos

- Docker
- Docker Compose
- Node.js 20+
- npm

## Execução com Docker Compose

Na raiz do projeto, execute:

```bash
docker compose up --build --detach
```

Isso inicia os serviços de:

- backend em `http://localhost:3001`
- frontend em `http://localhost:3000`
- MySQL em `localhost:3306`
- RabbitMQ em `localhost:5672` e painel em `http://localhost:15672`
- Redis em `localhost:6379`

Para interromper a execução dos containers:

```bash
docker compose down
```

Para remover também os volumes persistidos:

```bash
docker compose down --volumes
```

## Banco de dados

O banco `app_contas` é criado automaticamente pelo container MySQL ao iniciar o serviço, a partir da variável `MYSQL_DATABASE` configurada no ambiente do Compose. As migrations do backend criam as tabelas dentro desse banco, e os seeders podem ser usados em desenvolvimento para popular dados iniciais.

## Execução local

### Backend

```bash
cd node
npm install
npm run dev
```

### Frontend

```bash
cd react
npm install
npm run dev
```

## Scripts disponíveis

### Backend (`node/package.json`)

- `npm run dev` — inicia o servidor em modo desenvolvimento com nodemon
- `npm run start` — inicia o servidor em modo produção
- `npm run migrate` — aplica as migrations do Knex
- `npm run seed` — executa os seeders
- `npm run migrate-and-seed` — executa migrations e seeders em sequência

### Frontend (`react/package.json`)

- `npm run dev` — inicia o app Next.js em desenvolvimento
- `npm run build` — gera a build de produção
- `npm run start` — inicia a build de produção
- `npm run lint` — executa a validação do ESLint

> Os nomes dos scripts foram mantidos como estão para preservar a compatibilidade atual do sistema e evitar alterações no comportamento do Docker Compose.

## Observações importantes

- O ambiente Docker utiliza o arquivo `.env` localizado na raiz do projeto.
- O frontend executado localmente pode usar `react/.env.local` para apontar para a API local.
- Em desenvolvimento, o backend pode executar migrations e seeders automaticamente usando `DEV_MIGRATE=true`; em produção, esse comportamento deve ser desabilitado.
