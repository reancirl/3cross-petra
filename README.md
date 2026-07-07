# 3Cross PETRA

Laravel + Inertia React site for PETRA equipment brokerage.

The app is a single Laravel monolith. Laravel serves the routes, Inertia renders React pages, Vite builds the frontend assets, PostgreSQL stores application data, Redis is available for cache/queue support, and Nginx serves the app through Docker Compose.

## Requirements

For the recommended setup you only need:

- Git
- Docker Engine
- Docker Compose v2

Optional host tools:

- Make
- PHP 8.3+
- Composer
- Node 24+
- npm

## Fresh Clone Setup

From a new clone, run this if you have `make`:

```bash
make setup
```

Without `make`, run the same setup manually:

```bash
cp .env.example .env
docker compose build
APP_KEY=$(docker compose run --rm --no-deps app php artisan key:generate --show)
sed -i "s|^APP_KEY=.*|APP_KEY=${APP_KEY}|" .env
docker compose up -d
docker compose exec app php artisan migrate
```

Do not skip `cp .env.example .env`. The key command prints a fresh key from Laravel inside Docker, then the host shell writes that value into `.env`.

If PostgreSQL is still starting when the migration runs, wait a few seconds and run the migrate command again.

If the page shows `No application encryption key has been specified`, confirm that `.env` is a file and has an `APP_KEY` value:

```bash
ls -ld .env
grep '^APP_KEY=' .env
```

If `.env` is a directory, remove that directory, recreate the file, and generate the key through Docker:

```bash
rmdir .env
cp .env.example .env
APP_KEY=$(docker compose run --rm --no-deps app php artisan key:generate --show)
sed -i "s|^APP_KEY=.*|APP_KEY=${APP_KEY}|" .env
docker compose up -d --force-recreate app
```

Do not run `php artisan key:generate` on the host unless you have already run `composer install`. A fresh Docker-only clone will not have `vendor/autoload.php` on the host.

Open the site at:

```text
http://localhost:8000
```

The default port is controlled by `APP_PORT` in `.env`.

## After Pulling Updates

When you pull new changes, refresh the containers and run any new migrations:

```bash
git pull
make update
```

Without `make`, run:

```bash
docker compose build
docker compose up -d
docker compose exec app php artisan migrate
```

If you are using the Vite dev server, restart `make dev` after dependency or frontend changes.

## Development Workflow

Start the Laravel, Nginx, PostgreSQL, and Redis containers:

```bash
docker compose up -d
```

Run the Vite dev server for React/CSS hot reload:

```bash
make dev
```

Then keep both running and visit:

```text
http://localhost:8000
```

If you do not have `make`, run the Vite dev server through Node directly:

```bash
docker run --rm -it -v "$PWD":/app -w /app -p 5173:5173 node:24-alpine sh -c "npm install && npm run dev"
```

## Useful Commands

```bash
# Start containers
docker compose up -d

# Stop containers
docker compose down

# Rebuild and start containers
docker compose up --build -d

# Run migrations
docker compose exec app php artisan migrate

# Rebuild the database from scratch
docker compose down -v
docker compose up --build -d
docker compose exec app php artisan migrate --seed

# View container logs
docker compose logs -f

# Check running services
docker compose ps
```

Makefile shortcuts are also available:

```bash
make env
make up
make down
make build
make setup
make update
make docker-key
make migrate
make fresh
make logs
make ps
make tinker
make dev
make dev-up
```

Note: `make key` runs `php artisan key:generate` on the host, so it requires host PHP and Composer dependencies. Use `make docker-key` if you want to generate the key through Docker.

## Testing And Checks

Install dependencies on the host if you want to run checks directly:

```bash
composer install
npm install
```

Then run:

```bash
composer test
npm run typecheck
npm run build
```

Inside Docker, migrations and Artisan commands should be run through the `app` service:

```bash
docker compose exec app php artisan test
docker compose exec app php artisan route:list
```

## Project Structure

```text
app/                    Laravel application code
bootstrap/              Laravel bootstrapping and Inertia SSR output
config/                 Laravel configuration
database/               Migrations, factories, and seeders
docker/                 Container startup scripts
nginx/                  Nginx site configuration
public/                 Public assets and compiled Vite build output
resources/css/          Tailwind/CSS entry
resources/js/           Inertia React app, pages, layouts, and data
routes/web.php          Web routes and sitemap route
tests/                  PHPUnit tests
```

Current public pages:

- `/`
- `/equipment`
- `/sell-equipment`
- `/sitemap.xml`

## Environment Notes

The included `.env.example` is configured for Docker:

```text
DB_CONNECTION=pgsql
DB_HOST=db
REDIS_HOST=cache
APP_PORT=8000
```

For a different local port, change `APP_PORT` and restart the web container:

```bash
docker compose up -d --force-recreate web
```

Do not commit `.env`, `vendor/`, `node_modules/`, or generated build artifacts.
