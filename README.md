# app_contas

Aplicação full-stack para gestão de contas mensais, com frontend em Next.js e backend em Node.js.

## Visão geral

Este repositório contém a aplicação completa do projeto, dividida em:

- `node/` — API backend em Express
- `react/` — interface web em Next.js
- `docker-compose.yml` — orquestração dos serviços de infraestrutura e aplicação
- `.env.example` — modelo de variáveis para o Docker Compose (copie para `.env` na raiz)

## Stack principal

- Frontend: Next.js + React + TypeScript
- Backend: Node.js + Express
- Banco de dados: MySQL
- Mensageria: RabbitMQ
- Cache: Redis

## Requisitos

- Docker
- Docker Compose
- Node.js 20+ (apenas para execução local, fora do Docker)
- npm (apenas para execução local, fora do Docker)

## Variáveis de ambiente

Há **três contextos** distintos. Cada um usa o seu arquivo:

| Como você sobe o projeto | Arquivo obrigatório | Origem |
|---|---|---|
| Docker Compose (recomendado) | `.env` na **raiz** | copie de `.env.example` |
| Backend no host (`cd node && npm run dev`) | `node/.env` | copie de `node/.env.example` |
| Frontend no host (`cd react && npm run dev`) | `react/.env.local` | copie de `react/.env.example` |

Os arquivos `.env` e `.env.local` **não** entram no Git. Os `.env.example` **entram** no repositório como modelo.

- No Compose, o backend e o frontend leem o `.env` da raiz (`env_file` + interpolação no `docker-compose.yml`). Os arquivos em `node/` e `react/` **não** são usados pelos containers.
- `MYSQL_HOST=mysql-v8` no `.env` da raiz é o nome do **serviço** na rede Docker. No MySQL Workbench use `127.0.0.1` e a porta `3306`.
- Em `node/.env` (processo no host) use `MYSQL_HOST=localhost`, porque o Node no Ubuntu não resolve o hostname `mysql-v8`.

## Execução com Docker Compose

Na raiz do projeto, **antes** de subir os containers, crie o `.env` da raiz (obrigatório):

```bash
cp .env.example .env
```

Ajuste as senhas se quiser. Em seguida:

```bash
docker compose up --build --detach
```

Isso inicia, na mesma execução:

- imagens e containers (MySQL, RabbitMQ, Redis, backend e frontend)
- o schema MySQL `app_contas` (vazio no primeiro start do volume)
- migrations e seeder do backend (`DEV_MIGRATE=true` no Compose)
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

Com o Compose, não é necessário executar `npm run migrate` / `npm run seed` no host: o entrypoint do backend já faz isso quando `DEV_MIGRATE=true`.

O `docker compose up` **não** cria conexão no MySQL Workbench. O Workbench é um cliente no seu PC: a conexão deve ser criada **manualmente** uma vez, depois que o container MySQL estiver no ar.

Nova conexão (valores iguais aos de `.env.example` / `.env` da raiz, em desenvolvimento local):

| Campo | Valor |
|---|---|
| Hostname | `127.0.0.1` |
| Port | `3306` |
| Username | `root` |
| Password | `root` (`MYSQL_ROOT_PASSWORD` / `MYSQL_PASSWORD`) |
| Schema | `app_contas` |

Não use o hostname `mysql-v8` no Workbench: ele só existe na rede Docker. Se o schema aparecer vazio, aguarde o backend terminar migrations e seeders e use Refresh no navigator.

## Execução local

Infraestrutura (MySQL, RabbitMQ, Redis) ainda pode subir pelo Compose. API e interface rodam no host.

Pré-requisitos de ambiente:

```bash
cp .env.example .env
cp node/.env.example node/.env
cp react/.env.example react/.env.local
```

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

- Sem o `.env` na raiz, `docker compose up` não recebe senha do MySQL, portas nem credenciais do RabbitMQ.
- Em desenvolvimento, o backend no container executa migrations e seeders automaticamente com `DEV_MIGRATE=true`; em produção, esse comportamento deve ser desabilitado.
