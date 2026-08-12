# Dockerfile raiz para uso genérico / documentação.
# O projeto usa os Dockerfiles específicos em node/ e react/ via docker-compose.yml.

FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache bash

COPY . .

CMD ["sh", "-lc", "echo 'Use o docker-compose.yml para subir o projeto. Backend: node/Dockerfile.backend; Frontend: react/Dockerfile.frontend'"]
