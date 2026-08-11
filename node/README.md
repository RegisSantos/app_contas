# Backend - API Node.js

API Express responsável por fornecer funcionalidades de autenticação e comunicação com o frontend.

## Visão geral

Este serviço está localizado em `node/` e usa Express para servir a API. Ele carrega variáveis de ambiente com `dotenv` e permite desenvolvimento com `nodemon`.

## Tecnologias utilizadas

- Node.js
- Express
- CORS
- dotenv
- nodemon (desenvolvimento)

## Requisitos

- Node.js v24.11.0 ou superior
- npm 11 ou superior
- Git

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
```

4. Inicie em modo de desenvolvimento:

```bash
npm run dev
```

5. Inicie em modo de produção:

```bash
npm start
```

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
  "error": "Credenciais inválidas"
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
