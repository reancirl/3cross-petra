.PHONY: env setup update up down build key docker-key migrate fresh logs ps tinker dev dev-up

env:
	@test ! -d .env || (echo ".env is a directory. Delete it and run 'cp .env.example .env' before generating the key."; exit 1)
	@test -f .env || cp .env.example .env

setup: env
	docker compose build
	KEY=$$(docker compose run --rm --no-deps app php artisan key:generate --show); sed -i "s|^APP_KEY=.*|APP_KEY=$$KEY|" .env
	docker compose up -d
	docker compose exec app php artisan migrate

update:   ; docker compose build; docker compose up -d; docker compose exec app php artisan migrate
up:       ; docker compose up -d
down:     ; docker compose down
build:    ; docker compose up --build -d
# APP_KEY is passed to the app container via compose (.env -> ${APP_KEY}),
# so generate it on the host .env, then re-up to apply it.
key:      ; php artisan key:generate && docker compose up -d --force-recreate app
docker-key: env
	KEY=$$(docker compose run --rm --no-deps app php artisan key:generate --show); sed -i "s|^APP_KEY=.*|APP_KEY=$$KEY|" .env
	docker compose up -d --force-recreate app

migrate:  ; docker compose exec app php artisan migrate
fresh:    ; docker compose down -v && docker compose up --build -d && sleep 8 && docker compose exec app php artisan migrate --seed
logs:     ; docker compose logs -f
ps:       ; docker compose ps
tinker:   ; docker compose exec app php artisan tinker
# Local workflow: `make up`, then keep `make dev` running for React/CSS hot reload.
dev:      ; docker run --rm -it -v "$(PWD)":/app -w /app -p 5173:5173 node:24-alpine sh -c "npm install && npm run dev"
dev-up:   ; docker compose up -d && $(MAKE) dev
