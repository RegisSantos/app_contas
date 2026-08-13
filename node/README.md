# Backend - API Node.js

API Express responsável por fornecer funcionalidades de autenticação e comunicação com o frontend.

## Visão geral

Este serviço está localizado em `node/` e usa Express para servir a API. Ele carrega variáveis de ambiente com `dotenv`, autenticação com Auth.js e pode ser executado em desenvolvimento ou via Docker Compose.

## Tecnologias utilizadas

- Node.js
- Express
- Auth.js
- CORS
- dotenv
- nodemon (desenvolvimento)

## Requisitos

- Node.js v24.11.0 ou superior
- npm 11 ou superior
- Git

## Criação do backend

Para estruturar o backend do zero em Node.js + Express + Auth.js, execute:

```bash
cd app_contas && mkdir -p node/src && cd node && npm init -y && npm install express cors dotenv @auth/express @auth/core
```

## Clone do repositório

No terminal, execute:

```bash
git clone https://github.com/RegisSantos/app_contas.git
cd app_contas
```

## Estrutura relevante

- `node/` - código do backend Express
- `react/` - código do frontend Next.js
- `docker-compose.yml` - orquestração de contêineres

## Instalação e execução local do backend

1. Acesse a pasta do backend:

```bash
cd node
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo de ambiente:

Copie `node/.env.example` para `node/.env` e ajuste conforme necessário.

Exemplo mínimo:

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

4. Inicie em modo de desenvolvimento:

```bash
npm run dev
```

5. Inicie em modo de produção:

```bash
npm start
```

## Módulo de autenticação

A validação de credenciais mockadas foi separada em um módulo do backend em `node/src/modules/auth/validateUser.js`.

Essa estrutura é a base para futuras integrações com autenticação real em banco de dados e Auth.js.

## Rotas disponíveis

### `GET /`

Retorna um texto simples para confirmar que a API está ativa.

### `POST /login`

Recebe email e senha e retorna um token mock quando as credenciais são válidas.

Exemplo de request:

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

Resposta de sucesso:

```json
{
  "token": "fake-jwt-token"
}
```

Resposta de falha:

```json
{
  "error": "Credenciais inválidasASD"
}
```

## Variáveis de ambiente

Configure `node/.env` com base em `node/.env.example`.

- `PORT` - porta em que a API escuta (padrão `3001`)
- `MYSQL_HOST` - host do MySQL
- `MYSQL_PORT` - porta do MySQL
- `MYSQL_DATABASE` - nome do banco de dados
- `MYSQL_USER` - usuário do banco de dados
- `MYSQL_PASSWORD` - senha do banco de dados
- `RABBITMQ_HOST` - host do RabbitMQ
- `REDIS_HOST` - host do Redis
- `AUTH_SECRET` - chave secreta usada pelo Auth.js

## Execução com Docker Compose

A orquestração está definida em `docker-compose.yml` na raiz do projeto. Ela levanta os serviços:

- `mysql-v8`
- `rabbitmq-v4`
- `redis-v8`
- `backend`
- `frontend`

Para rodar em contêineres:

```bash
docker compose up --build --detach
```

Para orientação completa sobre execução e limpeza do ambiente Docker, consulte o `README.md` raiz do projeto.

## Regra de documentação de novas bibliotecas

Sempre que uma nova biblioteca ou tecnologia for adicionada ao backend, atualize este README com:

- objetivo da tecnologia
- dependências necessárias
- como usar a funcionalidade no ambiente local
- exemplos de configuração, se aplicável

## Migrations e Seeders (Banco de Dados)

Este backend utiliza `knex` para gerenciar migrations e seeders. As migrations criam as tabelas principais (`si_users`, `si_session`) e os seeders inserem dados iniciais (usuário padrão).

- Rodar migrations localmente:

```bash
cd node
npx knex migrate:latest --knexfile ./knexfile.js
```

- Rodar seeders localmente:

```bash
cd node
npx knex seed:run --knexfile ./knexfile.js
```

- Comandos npm equivalentes:

```bash
cd node
npm run migrate
npm run seed
```

Obs: o seed padrão cria o usuário `admin@contasgo.com` com senha `adminsenha0` (hash aplicado).

### Ferramentas de desenvolvimento (scripts dev)

Para evitar a criação das tabelas de metadados do Knex (`knex_migrations`, `knex_migrations_lock`) durante a execução automática, o repositório inclui runners "dev-only" que aplicam as migrations e seeds diretamente sem usar a infraestrutura de metadados do Knex.

- `node/scripts/dev/run-migrations-no-meta.js` — aplica as migrations em ordem executando os `exports.up` manualmente.
- `node/scripts/dev/run-seeds-no-meta.js` — executa os seeders manualmente.
- `node/scripts/dev/db-verify.js` — ferramenta ad-hoc para listar e verificar tabelas e o usuário admin.

Esses scripts são mantidos como ferramentas de desenvolvimento e não são destinados à execução automática em produção.

### Execução condicional no Docker

O `docker-entrypoint.sh` do backend foi atualizado para executar as migrations/seeds apenas quando apropriado:

- Se a variável de ambiente `DEV_MIGRATE` estiver definida como `true`, o entrypoint executará os scripts em `node/scripts/dev/` antes de iniciar o servidor.
- Se `NODE_ENV` for `production` e `DEV_MIGRATE` não estiver definido/true, os scripts serão ignorados.

Para desenvolvimento local com Compose (com migrations/seeds automáticas), deixe `DEV_MIGRATE=true` no serviço `backend` do `docker-compose.yml` (o `docker-compose.yml` de exemplo já define isso para conveniência). Em produção, não defina `DEV_MIGRATE`.

Exemplo — rodar tudo em ambiente de desenvolvimento:

```bash
docker compose up --build --detach
```

Se preferir executar manualmente os scripts de desenvolvimento dentro do container backend:

```bash
docker compose exec backend node ./scripts/dev/run-migrations-no-meta.js
docker compose exec backend node ./scripts/dev/run-seeds-no-meta.js
```

