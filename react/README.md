# Frontend

Interface web do projeto `app_contas`, construída com Next.js e React.

## Visão geral

O frontend está localizado em `react/` e é responsável pela autenticação do usuário, navegação e integração com a API do backend.

## Organização dos módulos

- `src/app/(auth)/` — telas de autenticação, sem sidebar.
- `src/app/(system)/` — telas autenticadas do sistema. O layout desse grupo inclui a sidebar compartilhada.
- `src/components/Sidebar/` — componente e estilos próprios da sidebar, reutilizados pelos módulos autenticados.
- `src/app/(system)/dashboard/` — conteúdo e estilos específicos do dashboard. O grupo `(system)` é ignorado na URL, portanto a rota continua sendo `/dashboard`.

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

No Compose, `NEXT_PUBLIC_API_URL` é passada como argumento de build ao `Dockerfile.frontend` e definida como `http://localhost:${BACKEND_PORT}`, que é acessível pelo navegador. O bloco `environment` também mantém esse valor disponível no container em execução.

O `.env.example` contém valores para desenvolvimento local e não deve ser usado como conjunto de credenciais de produção. O frontend não armazena credenciais de infraestrutura; a sessão de autenticação é recebida em cookie `HttpOnly` emitido pelo backend.

O frontend envia o cookie de sessão Auth.js nas chamadas à API usando `credentials: "include"`. Não armazene tokens de autenticação no `localStorage`. Após o login, a aplicação redireciona para `/dashboard`, cuja sessão é validada pelo backend; sessões inválidas redirecionam o usuário para `/login`.

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

Para execução no navegador, `NEXT_PUBLIC_API_URL` deve apontar para um endereço acessível pelo host, normalmente `http://localhost:3001`. O hostname Docker `backend` não funciona diretamente no navegador.

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

Na primeira execução, ou após alterar `BACKEND_PORT`, `NEXT_PUBLIC_API_URL`, `docker-compose.yml` ou `Dockerfile.frontend`, use `docker compose up --build --detach` na raiz para gerar novamente a build do Next.js. O frontend não deve ser iniciado com `npm install` quando estiver sendo executado pelo Compose.

## Observações

- O ambiente Docker usa o arquivo `.env` localizado na raiz do projeto.
- Quando executado localmente, o frontend usa `react/.env.local` para apontar para a API em `http://localhost:3001`.
