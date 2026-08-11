# Multi-stage Dockerfile for app_contas (frontend: Next.js, backend: Node/Express)

FROM node:20-alpine AS deps
WORKDIR /usr/src/app

# Install build deps for native modules
RUN apk add --no-cache python3 make g++

# Copy package manifests for each subproject and install production deps
COPY node/package*.json ./node/
COPY react/package*.json ./react/

RUN cd node && npm ci --omit=dev
RUN cd react && npm ci --omit=dev

FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY . .

WORKDIR /usr/src/app/react
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copy installed node modules for backend
COPY --from=deps /usr/src/app/node/node_modules ./node/node_modules

# Copy built frontend
COPY --from=builder /usr/src/app/react/.next ./react/.next
COPY --from=builder /usr/src/app/react/public ./react/public
COPY --from=builder /usr/src/app/react/package.json ./react/package.json

# Copy backend source
COPY --from=builder /usr/src/app/node/src ./node/src
COPY --from=builder /usr/src/app/node/package.json ./node/package.json

EXPOSE 3000

# Start backend and frontend (both in same container). For production, consider using a process manager or separate containers.
CMD ["sh","-c","node node/src/server.js & npm --prefix react run start"]
