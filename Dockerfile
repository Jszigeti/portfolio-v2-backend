FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Commande de démarrage
CMD ["node", "dist/main"]
