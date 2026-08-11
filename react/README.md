# Frontend - Next.js

Aplicação frontend construída com Next.js e React, responsável pela interface de login e comunicação com a API backend.

## Visão geral

Este serviço está localizado em `react/` e usa Next.js para renderização do aplicativo, Tailwind CSS para estilização e bibliotecas adicionais para animações, notificações e ícones.

## Tecnologias utilizadas

- Next.js 16.2.4
- React 19.2.4
- TypeScript
- Tailwind CSS 4
- Framer Motion
- React Hot Toast
- Heroicons

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

## Instalação e execução local do frontend

1. Acesse o diretório do frontend:

```bash
cd react
```

2. Instale as dependências:

```bash
npm install
```

3. Configure variáveis de ambiente:

Crie `react/.env.local` com o conteúdo:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
BACKEND_PORT=3001
FRONTEND_PORT=3000
```

4. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

5. Abra o navegador em:

```text
http://localhost:3000
```

## Scripts disponíveis

- `npm run dev` - executa o servidor de desenvolvimento
- `npm run build` - cria a versão de produção
- `npm run start` - executa a aplicação em produção
- `npm run lint` - verifica o código com ESLint

## Funcionalidades e bibliotecas

### Next.js

Usado como framework React para rotas, renderização e construção de páginas. O projeto está configurado com o App Router (`app/`).

### React

Biblioteca base para a construção da interface.

### Tailwind CSS

Usado para estilização com classes utilitárias. O frontend usa Tailwind para layout, formulários e responsividade.

### Framer Motion

Usado para animações de transição e interação.

Exemplos de uso:

- `AnimatePresence` e `motion` em `react/src/app/(auth)/login/page.tsx`
- animações de carregamento em `react/src/components/Loading.tsx`

### React Hot Toast

Usado para exibir notificações de sucesso e erro no fluxo de login e validações.

Exemplos de uso:

- `toast.success` e `toast.error` em `react/src/app/(auth)/login/page.tsx`
- validações em `react/src/utils/validateRecoveryMethod.ts`

### Heroicons

Usado para ícones de interface em SVG.

Exemplo de uso:

- `EyeIcon` e `EyeSlashIcon` em `react/src/components/PasswordInput.tsx`

## Integração com o backend

O frontend consome a API backend através de `NEXT_PUBLIC_API_URL`.

O endpoint de autenticação é `POST /login` e valida as credenciais usando um mock local.

## Uso com Docker Compose

A orquestração do projeto está definida em `docker-compose.yml` na raiz do repositório.

Para subir todos os serviços em contêineres:

```bash
docker compose up --build --detach
```

Para orientação completa sobre execução e limpeza do ambiente Docker, consulte o `README.md` raiz do projeto.

## Regra de documentação de bibliotecas

Sempre que uma nova biblioteca ou tecnologia for adicionada ao frontend, atualize este README com:

- objetivo da tecnologia
- dependências necessárias
- como usar a funcionalidade no ambiente local
- exemplos de configuração, se aplicável
