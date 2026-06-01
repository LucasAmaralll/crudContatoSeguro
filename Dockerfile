FROM node:20-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3333

# Usamos um script shell para garantir que as migrações rodem antes de iniciar o servidor
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]

