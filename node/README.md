# Backend API

API do projeto `app_contas`, responsável pela lógica de negócio, autenticação e integração com o banco de dados.

## Visão geral

O backend está localizado em `node/` e utiliza Express para expor a API, Knex para acesso ao banco e integração com MySQL, além de RabbitMQ e Redis para infraestrutura complementar.

## Stack

- Node.js
- Express
- Knex.js
- MySQL
- RabbitMQ
- Redis
- bcryptjs

## Requisitos

- Node.js 20+
- npm
- Docker Compose (opcional)

## Instalação local

```bash
cd node
npm install
```

Se necessário, copie o arquivo de ambiente de exemplo:

```bash
cp .env.example .env
```

Exemplo mínimo de configuração:

```env
PORT=3001
MYSQL_HOST=mysql-v8
MYSQL_PORT=3306
MYSQL_DATABASE=app_contas
MYSQL_USER=root
MYSQL_PASSWORD=root
RABBITMQ_HOST=rabbitmq-v4
REDIS_HOST=redis-v8
AUTH_SECRET=change-me-in-production
```

## Execução local

### Desenvolvimento

```bash
npm run dev
```

### Produção

```bash
npm start
```

## Scripts disponíveis

No `node/package.json`, os comandos oficiais do backend são:

```bash
npm run dev
npm run start
npm run migrate
npm run seed
npm run migrate-and-seed
```

- `npm run dev` — inicia o backend em modo desenvolvimento com Node + nodemon
- `npm run start` — inicia a API em produção
- `npm run migrate` — aplica as migrations do Knex
- `npm run seed` — executa os seeders
- `npm run migrate-and-seed` — executa migrations e seeders em sequência

## Execução com Docker Compose

Na raiz do projeto:

```bash
docker compose up --build --detach
```

O serviço do backend fica disponível em `http://localhost:3001`.

## Banco de dados

O banco `app_contas` é criado automaticamente pelo container MySQL ao iniciar o serviço, conforme a variável `MYSQL_DATABASE` definida no ambiente do Compose. As migrations do backend criam as tabelas dentro do banco, e os seeders podem ser usados em desenvolvimento para popular dados iniciais.

## Migrations e seeders

O backend usa Knex para aplicar migrações e seeders.

Executar migrations:

```bash
cd node
npm run migrate
```

Executar seeders:

```bash
cd node
npm run seed
```

Em desenvolvimento, o projeto também inclui scripts utilitários em `node/scripts/dev/` para aplicar migrations e seeders sem criar tabelas de metadados do Knex (`knex_migrations`, `knex_migrations_lock`). Esses scripts são acionados pelo entrypoint quando `DEV_MIGRATE=true`.

## Observações

- Em desenvolvimento, `DEV_MIGRATE=true` habilita a execução automática de migrations e seeders no container.
- Em produção, esse comportamento deve ser desabilitado para evitar alterações automáticas no esquema do banco.

