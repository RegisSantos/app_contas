# app_contas

Projeto full-stack para controle de contas mensais, com backend em Node.js e frontend em Next.js.

## Estrutura do repositório

- `node/` - backend API Express
- `react/` - frontend Next.js
- `docker-compose.yml` - orquestração de containers Docker

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
