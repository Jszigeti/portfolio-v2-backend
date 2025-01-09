FROM node:22-alpine AS builder

WORKDIR /app

# Ajouter la variable DATABASE_URL pendant la construction
ENV DATABASE_URL="file:./prisma/db/portfolio.db"


# Copie des fichiers package.json et pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Installer pnpm et les dépendances
RUN npm install -g pnpm
RUN pnpm install

# Copier tout le reste
COPY . .

# Appliquer les migrations Prisma pendant la phase de build
RUN npx prisma migrate deploy
RUN npx prisma generate

# Construire l'application
RUN pnpm run build


# Étape finale pour exécuter l'application
FROM node:22-alpine

WORKDIR /app

# Copier les fichiers nécessaires pour l'application
COPY package.json pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma/db ./prisma/db 

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["node", "dist/main"]

