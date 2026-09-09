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
- `@auth/core` para a sessão criptografada
- Helmet e `express-rate-limit` para proteção HTTP da API

## Requisitos

- Node.js 20+
- npm
- Docker Compose (opcional; obrigatório se o MySQL não estiver instalado no host)

## Variáveis de ambiente

| Como o backend sobe | Arquivo | Observação |
|---|---|---|
| Docker Compose | `.env` na **raiz** do repositório | copie de `.env.example` (raiz). O container **não** lê `node/.env`. |
| `npm run dev` / `npm start` neste diretório | `node/.env` | copie de `node/.env.example`. Hosts em `localhost` (portas do Compose no host). |

`node/.env` não é versionado. `node/.env.example` é o modelo no Git.

## Instalação local

```bash
cd node
npm install
cp .env.example .env
```

Exemplo (`node/.env.example`) para backend no host e MySQL no Docker:

```env
PORT=3001
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=app_contas
MYSQL_USER=root
MYSQL_PASSWORD=root
RABBITMQ_HOST=localhost
REDIS_HOST=localhost
AUTH_SECRET=dev-auth-secret-not-for-production
FRONTEND_URL=http://localhost:3000
```

Não use `MYSQL_HOST=mysql-v8` neste arquivo: esse hostname só existe na rede Docker.

`AUTH_SECRET` é obrigatório para criar e validar as sessões Auth.js. Use um segredo aleatório com pelo menos 32 caracteres em ambientes compartilhados. `FRONTEND_URL` define a origem permitida pelo CORS; ajuste-a quando o frontend não estiver em `http://localhost:3000`.

Os valores de exemplo são apenas para desenvolvimento local. Em ambiente compartilhado ou produção, substitua `MYSQL_PASSWORD`, `AUTH_SECRET` e as credenciais de RabbitMQ por valores fortes. O Redis utilizado atualmente não exige senha; a configuração de autenticação do Redis será tratada em uma tarefa futura de infraestrutura.

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
npm run migrate:check
npm run seed
npm run verify:login
npm run migrate-and-seed
```

- `npm run dev` — inicia o backend em modo desenvolvimento com Node + nodemon
- `npm run start` — inicia a API em produção
- `npm run migrate` — aplica as migrations do Knex
- `npm run migrate:check` — valida a estrutura das migrations sem conectar ao banco
- `npm run seed` — executa os seeders
- `npm run verify:login` — valida o login integrado do usuário padrão contra a API em execução
- `npm run migrate-and-seed` — executa migrations e seeders em sequência

## Execução com Docker Compose

Na raiz do projeto (não neste diretório):

```bash
cp .env.example .env
docker compose up --build --detach
```

O `.env` da raiz é obrigatório antes do Compose. O serviço do backend fica disponível em `http://localhost:3001`. Na primeira execução, o RabbitMQ pode levar mais tempo para ficar saudável; o Compose aguarda os healthchecks do MySQL, RabbitMQ e Redis antes de iniciar o backend, e o entrypoint ainda verifica a conexão com o banco. Com `DEV_MIGRATE=true`, o entrypoint aplica migrations e o seeder ao subir o container. Em produção ou ambiente compartilhado, não mantenha migrations automáticas habilitadas.

RabbitMQ e Redis estão declarados como infraestrutura do projeto, mas ainda não são consumidos pelo código do backend. Eles permanecem disponíveis para as próximas funcionalidades.

### Autenticação

`POST /api/v1/login` consulta usuários ativos em `si_users`, valida a senha com bcrypt e cria uma sessão Auth.js em cookie `HttpOnly`. O cliente deve enviar credenciais nas requisições (`credentials: "include"` no `fetch`). `GET /api/v1/session` retorna o usuário da sessão atual ou HTTP 401 quando não autenticado. `POST /api/v1/logout` encerra a sessão e `GET /health` informa a saúde da API.

Para executar a verificação manualmente, mantenha a API em execução em outro terminal e rode `npm run verify:login`. O comando espera `/health`, valida o usuário padrão criado pelo seeder, confirma o cookie `HttpOnly` e verifica uma senha inválida.

O login possui limite de 10 tentativas por IP a cada 15 minutos. As respostas de erro usam o formato `{ "success": false, "error": "..." }`.

## Banco de dados

O banco `app_contas` é criado automaticamente pelo container MySQL ao iniciar o serviço, conforme a variável `MYSQL_DATABASE` definida no ambiente do Compose. As migrations do backend criam as tabelas dentro do banco, e os seeders podem ser usados em desenvolvimento para popular dados iniciais.

O Compose **não** configura o MySQL Workbench. Crie a conexão no cliente local depois que o MySQL estiver rodando:

| Campo | Valor (desenvolvimento; ver `.env.example` da raiz) |
|---|---|
| Hostname | `127.0.0.1` |
| Port | `3306` |
| Username | `root` |
| Password | `root` |
| Schema | `app_contas` |

Use `127.0.0.1`, não `mysql-v8`. Tabelas (`si_users`, `si_session`) só existem após o backend aplicar migrations.

## Migrations e seeders

O backend usa Knex para aplicar migrações e seeders.

No host (com `node/.env` apontando para o MySQL acessível):

```bash
cd node
npm run migrate
npm run seed
```

Em desenvolvimento no Docker, o entrypoint executa `npm run migrate` e `npm run seed` quando `DEV_MIGRATE=true`. O Knex mantém as tabelas `knex_migrations` e `knex_migrations_lock`, permitindo saber quais migrations já foram aplicadas.

## Observações

- Em desenvolvimento, `DEV_MIGRATE=true` habilita a execução automática de migrations e seeders no container.
- Em produção, esse comportamento deve ser desabilitado para evitar alterações automáticas no esquema do banco.
- O backend não possui testes automatizados configurados neste momento.
- O backend continua em JavaScript; o frontend usa TypeScript. Uma migração integral do backend para TypeScript é uma decisão arquitetural futura, não uma conversão parcial feita automaticamente.
- A recuperação de senha ainda não possui endpoint, persistência de token ou provedor de email/SMS; a UI correspondente não deve ser considerada funcional.
