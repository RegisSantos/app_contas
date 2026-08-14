# Frontend

Interface web do projeto `app_contas`, construída com Next.js e React.

## Visão geral

O frontend está localizado em `react/` e é responsável pela autenticação do usuário, navegação e integração com a API do backend.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Requisitos

- Node.js 20+
- npm
- Docker Compose (opcional)

## Instalação local

```bash
cd react
npm install
```

Crie o arquivo de ambiente local, se necessário:

```bash
cp .env.example .env.local
```

Exemplo de configuração:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
BACKEND_PORT=3001
FRONTEND_PORT=3000
```

## Execução local

```bash
npm run dev
```

A aplicação fica disponível em:

```text
http://localhost:3000
```

## Scripts disponíveis

No `react/package.json`, os comandos oficiais do frontend são:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

- `npm run dev` — inicia a aplicação em desenvolvimento
- `npm run build` — gera a build de produção
- `npm run start` — executa a aplicação em modo produção
- `npm run lint` — valida o código com o ESLint

## Execução com Docker Compose

Na raiz do projeto:

```bash
docker compose up --build --detach
```

O frontend será exposto em `http://localhost:3000` e se comunicará com o backend em `http://localhost:3001`.

## Observações

- O ambiente Docker usa o arquivo `.env` localizado na raiz do projeto.
- Quando executado localmente, o frontend pode usar `react/.env.local` para apontar para a API local.
