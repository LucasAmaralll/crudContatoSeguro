# Estágio de Produção
FROM node:20-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --omit=dev

COPY . .

RUN npx prisma generate

EXPOSE 3333

CMD ["npm", "run", "dev"]

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3333

# Script para rodar migrações e iniciar o servidor
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
