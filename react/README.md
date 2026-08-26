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

## Variáveis de ambiente

| Como o frontend sobe | Arquivo | Observação |
|---|---|---|
| Docker Compose | `.env` na **raiz** do repositório | copie de `.env.example` (raiz). O container **não** lê `react/.env.local`. |
| `npm run dev` neste diretório | `react/.env.local` | copie de `react/.env.example`. A API no browser deve ser `http://localhost:3001`. |

`react/.env.local` não é versionado. `react/.env.example` é o modelo no Git.

No Compose, `NEXT_PUBLIC_API_URL` também é definido no `docker-compose.yml` para o serviço `frontend`.

## Instalação local

```bash
cd react
npm install
cp .env.example .env.local
```

Exemplo (`react/.env.example`):

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

Na raiz do projeto (não neste diretório):

```bash
cp .env.example .env
docker compose up --build --detach
```

O `.env` da raiz é obrigatório antes do Compose. O frontend é exposto em `http://localhost:3000`.

## Observações

- O ambiente Docker usa o arquivo `.env` localizado na raiz do projeto.
- Quando executado localmente, o frontend usa `react/.env.local` para apontar para a API em `http://localhost:3001`.
