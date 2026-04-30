Este é um projeto criado para controle de contas mensais;

## Tecnologias
- [React.js];
- [Next.js];
- [TailwindCSS];
- [React-Hot-Toast];
- [Heroicons];

## Requisitos
 - Node.js v24.11.0 (ou superior);

## Acessando o projeto
- caso não tenha o [Node.js] instalado na sua máquina, siga o passo a passo do item 'Instalando o Node.js na sua máquina', neste mesmo documento;

## Clonando o projeto
- acesse em 'https://github.com/RegisSantos/app_contas.git', clicando no botão "Code" e copiando o link do projeto;
- em sua máquina, crie um diretório raiz para o projeto clonado, com localização de fácil acesso (ex: Documentos); 
- acesse o diretório raíz que criou para o projeto, inicie um novo terminal a partir dele e rode o comando 'git clone https://github.com/RegisSantos/app_contas.git';

## Inicializando o projeto
- após o projeto clonado, volte ao terminal e acesse o diretório 'app_contas/react' (cd app_contas/react);
    -> estando no diretório 'app_contas/react', rode os seguinte comandos:
        -> 'npm install' - instala as dependências do projeto;
        -> 'npm run dev' - inicia o servidor;







## Instalando o Node.js na sua máquina
[Windows]: 
    -> via insatalador (.msi), em https://nodejs.org/en/download;
        ou
    -> via terminal (como administrador), rodando o seguinte comando: 'winget install OpenJS.NodeJS';
    -> após a instalação, abra um novo terminal e rode o comando 'node -v';
        -> se aparecer a versão do Node.js (ex: v24.11.0), foi executado com sucesso;
    -> ainda no novo terminal, rode o comando 'npm -v';
        -> se aparecer a versão do NPM (ex: 11.6.1), foi executado com sucesso;
[Linux] e [MaCOS]:
    -> abra o terminal;
    -> instale o NVM (Node Version Manager), rodando o seguinte comando: 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash';
    -> após a instalação do NVM, abra um novo terminal;
    -> rode o comando 'nvm install node' (instala a versão mais recente do Node);
    -> em seguida, rode o comando 'nvm use node' (ativa essa versão no terminal atual);

    -> após a instalação do Node.js:
        -> abra um novo terminal, e rode o seguinte comando: 'command -v nvm'
            -> se aparecer apenas 'nvm', o NVM foi instalado com sucesso e está pronto para uso;
        -> ainda no novo terminal, rode o comando 'node -v';
            -> se aparecer a versão do Node.js (ex: v24.11.0), o Node.js foi instalado com sucesso e está pronto para uso;
        -> ainda no novo terminal, rode o comando 'npm -v';
            -> se aparecer a versão do NPM (ex: 11.6.1), o NPM foi instalado com sucesso e está pronto para uso;




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
