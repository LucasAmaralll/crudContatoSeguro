.PHONY: up down restart logs ps shell migrate-dev

up:
	@echo "🚀 Iniciando containers..."
	docker-compose up -d --build
	@echo "✅ Containers iniciados com sucesso!"

down:
	@echo "🛑 Parando containers..."
	docker-compose down
	@echo "✅ Containers parados com sucesso!"

restart:
	@make down
	@make up

logs:
	docker-compose logs -f

ps:
	docker-compose ps

shell:
	docker-compose exec api /bin/bash

migrate:
	docker-compose exec api npx prisma migrate deploy
