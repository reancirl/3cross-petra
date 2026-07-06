.PHONY: up down build key migrate fresh logs ps tinker dev dev-up

up:       ; docker compose up -d
down:     ; docker compose down
build:    ; docker compose up --build -d
# APP_KEY is passed to the app container via compose (.env -> ${APP_KEY}),
# so generate it on the host .env, then re-up to apply it.
key:      ; php artisan key:generate && docker compose up -d --force-recreate app
migrate:  ; docker compose exec app php artisan migrate
fresh:    ; docker compose down -v && docker compose up --build -d && sleep 8 && docker compose exec app php artisan migrate --seed
logs:     ; docker compose logs -f
ps:       ; docker compose ps
tinker:   ; docker compose exec app php artisan tinker
# Local workflow: `make up`, then keep `make dev` running for React/CSS hot reload.
dev:      ; docker run --rm -it -v "$(PWD)":/app -w /app -p 5173:5173 node:24-alpine sh -c "npm install && npm run dev"
dev-up:   ; docker compose up -d && $(MAKE) dev
