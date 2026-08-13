# app_contas

Projeto full-stack para controle de contas mensais, com frontend em Next.js e backend em Node.js + Express + Auth.js.

## Stack principal

- Frontend: Next.js + React + TypeScript + Tailwind CSS
- Backend: Node.js + Express
- Autenticação: Auth.js
- Infraestrutura: MySQL, RabbitMQ, Redis

## Estrutura do repositório

- `node/` - backend API Express
- `react/` - frontend Next.js
- `docker-compose.yml` - orquestração de containers Docker

## Criar o backend Node.js + Express + Auth.js

No terminal, execute:

```bash
cd app_contas && mkdir -p node/src && cd node && npm init -y && npm install express cors dotenv @auth/express @auth/core
```

Esse comando cria a estrutura inicial do backend e instala as dependências principais para API Express e autenticação com Auth.js.

## Executar o projeto com Docker Compose

A partir da raiz do projeto, execute:

```bash
docker compose up --build --detach
```

Esse comando faz tudo em uma vez:

- constrói e inicia o backend
- constrói e inicia o frontend
- inicia MySQL, RabbitMQ e Redis
- cria uma rede Docker interna específica para o projeto

Nota sobre migrations/seeders em desenvolvimento

O backend inclui scripts de desenvolvimento para aplicar migrations e seeds sem criar as tabelas de metadados do Knex (`knex_migrations*`). Por conveniência o `docker-compose.yml` define `DEV_MIGRATE=true` no serviço `backend` — isso faz com que o `docker-entrypoint.sh` execute as migrations/seeds durante o startup do container apenas em ambientes de desenvolvimento.

Em produção não defina `DEV_MIGRATE` (ou defina como `false`) para evitar alterações automáticas no esquema de banco de dados.

### Observações sobre a rede

O `docker-compose.yml` foi configurado para que o Docker Compose crie e gerencie automaticamente a rede do projeto.

Isso significa que o avaliador não precisa criar manualmente nenhuma rede antes de rodar o comando.

## Parar e remover containers / rede

Para parar o projeto e remover os containers e a rede criada pelo Compose, use:

```bash
docker compose down
```

Se quiser remover também volumes anônimos criados pelo Compose, rode:

```bash
docker compose down --volumes
```

> `docker compose down` remove a rede interna criada automaticamente pelo projeto, desde que ela não seja marcada como externa.

## Backend e frontend

- Backend: `node/`
- Frontend: `react/`

Cada um também tem seu próprio README com instruções de instalação local, mas para o avaliador a forma mais simples é usar Docker Compose.
