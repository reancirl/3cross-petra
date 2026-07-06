# Setup — Laravel + Inertia (React) monolith

A from-scratch setup guide for a **monolith**: one Laravel app where controllers
return Inertia responses that render React pages. No separate API, no CORS,
session-based auth, one deploy.

```
Browser
  │
  └── http://localhost:8000 ── Nginx ── PHP-FPM (Laravel)
                                            │  Inertia::render('Page', props)
                                            ▼
                                   React page (Vite-built assets)
                                            │
                                       PostgreSQL + Redis
```

**Choose this when:** one team ships both front and back, you want server-side
routing + session auth, no API/CORS overhead, and a single image to deploy.

---

## Final layout

```
my-app/                         (the Laravel app lives at the root)
├── app/Http/Middleware/HandleInertiaRequests.php
├── bootstrap/app.php
├── routes/web.php
├── resources/
│   ├── js/app.tsx
│   ├── js/Pages/Welcome.tsx
│   └── views/app.blade.php
├── vite.config.js
├── public/                     (built assets land in public/build)
├── Dockerfile
├── .dockerignore
├── nginx/default.conf
├── docker-compose.yml
├── Makefile
├── .env.example
└── .gitignore
```

---

## Prerequisites

| Tool              | Check                    |
|-------------------|--------------------------|
| Docker Engine     | `docker --version`       |
| Docker Compose v2 | `docker compose version` |
| Git               | `git --version`          |
| Make (optional)   | `make --version`         |

---

## Step 1 — Scaffold Laravel + Inertia React

**Fastest path — official starter kit** (Laravel installer, scaffolds Inertia +
React + Tailwind + auth for you):

```bash
laravel new my-app --react
cd my-app
```

> If you use the starter kit, skip Step 2 (it's already wired) and jump to
> Step 3. The rest of this guide shows the **manual** wiring so you understand
> every moving part and can reproduce it on a plain `laravel/laravel` install.

**Manual path — on a plain Laravel app:**

```bash
composer create-project laravel/laravel my-app
cd my-app

# Server-side Inertia adapter
composer require inertiajs/inertia-laravel

# Client-side Inertia + React + TypeScript + the Vite React plugin
npm install @inertiajs/react react react-dom @vitejs/plugin-react
npm install --save-dev typescript @types/react @types/react-dom
```

> No Composer/Node on the host? Run the same commands in `composer:latest` /
> `node:24-alpine` containers (`docker run --rm -v "$PWD":/app -w /app …`).

---

## Step 2 — Wire up Inertia (manual path)

**`vite.config.js`** — point Vite at the React entry and enable the React plugin:

```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
    ],
});
```

**`resources/js/app.tsx`** — the Inertia client bootstrap:

```tsx
import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';

type InertiaPageModule = {
    default: ComponentType<Record<string, unknown>>;
};

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob<InertiaPageModule>('./Pages/**/*.tsx', { eager: true });
        return pages[`./Pages/${name}.tsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
```

**`resources/views/app.blade.php`** — the single root HTML view Inertia mounts into:

```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
```

> Delete the default `resources/views/welcome.blade.php` and
> `resources/js/app.js` — `app.blade.php` and `app.tsx` replace them.

**`app/Http/Middleware/HandleInertiaRequests.php`** — sets the root view and
shares global props (or generate it with `php artisan inertia:middleware`):

```php
<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'appName' => config('app.name'),
        ];
    }
}
```

**`bootstrap/app.php`** — register the middleware in the `web` group:

```php
<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
```

**`routes/web.php`** — return an Inertia page instead of a Blade view:

```php
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Welcome', [
    'message' => 'Hello from Laravel + Inertia 👋',
]));
```

**`resources/js/Pages/Welcome.tsx`** — a sample page (props come from the controller):

```tsx
type WelcomeProps = {
    appName: string;
    message: string;
};

export default function Welcome({ appName, message }: WelcomeProps) {
    return (
        <main style={{ maxWidth: '40rem', margin: '4rem auto', textAlign: 'center', fontFamily: 'system-ui' }}>
            <h1>{appName}</h1>
            <p>{message}</p>
            <p>Edit <code>resources/js/Pages/Welcome.tsx</code> and <code>routes/web.php</code>.</p>
        </main>
    );
}
```

---

## Step 3 — Docker files

In a monolith, **one image** holds the PHP app *and* the built React assets.
This Dockerfile builds the assets in a Node stage, installs Composer deps in a
PHP stage, then assembles a lean runtime image.

**`Dockerfile`**

```dockerfile
# ── Stage 1: build frontend assets (→ public/build) ──
FROM node:24-alpine AS assets
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# ── Stage 2: install PHP dependencies ──
FROM php:8.3-fpm AS vendor
RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev libonig-dev libxml2-dev libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql mbstring zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --optimize-autoloader --no-scripts
COPY . .

# ── Stage 3: runtime ──
FROM php:8.3-fpm AS release
RUN apt-get update && apt-get install -y \
    libzip-dev libonig-dev libxml2-dev libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql mbstring zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
WORKDIR /var/www/html
COPY --from=vendor /var/www/html/vendor ./vendor
COPY --from=vendor /var/www/html .
COPY --from=assets /app/public/build ./public/build
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache
EXPOSE 9000
CMD ["php-fpm"]
```

> Run `composer require inertiajs/inertia-laravel` (Step 1) **before** building so
> `composer.lock` is in sync — the Dockerfile uses `composer install`.

**`.dockerignore`**

```gitignore
.env
vendor
node_modules
public/build
public/hot
*.log
storage/logs/*.log
.phpunit.result.cache
.git
.gitignore
Dockerfile
.dockerignore
```

**`nginx/default.conf`** — serves `public/` (incl. built assets) and forwards PHP:

```nginx
server {
    listen 80;
    server_name localhost;
    root /var/www/html/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

---

## Step 4 — Compose, env, and Make

The `app` (PHP-FPM) container owns the code + built assets; the `web` (Nginx)
container shares `public/` through a named volume that Docker seeds from the
image on first start.

**`docker-compose.yml`**

```yaml
name: laravel-inertia-react

services:
  app:                       # Laravel (PHP-FPM) + built assets
    build: .
    environment:
      DB_CONNECTION: ${DB_CONNECTION:-pgsql}
      DB_HOST: ${DB_HOST:-db}
      DB_PORT: ${DB_PORT:-5432}
      DB_DATABASE: ${POSTGRES_DB:-laravel}
      DB_USERNAME: ${POSTGRES_USER:-laravel}
      DB_PASSWORD: ${POSTGRES_PASSWORD:-secret}
      REDIS_HOST: ${REDIS_HOST:-cache}
      REDIS_PORT: ${REDIS_PORT:-6379}
    volumes:
      - app_public:/var/www/html/public     # share public/ with Nginx
    depends_on: [db, cache]

  web:                       # Nginx
    image: nginx:alpine
    ports:
      - "${APP_PORT:-8000}:80"
    volumes:
      - app_public:/var/www/html/public:ro
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on: [app]

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ${POSTGRES_DB:-laravel}
      POSTGRES_USER: ${POSTGRES_USER:-laravel}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-secret}
    volumes:
      - db_data:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine

volumes:
  db_data:
  app_public:
```

> **Rebuilt the frontend?** The `app_public` volume is seeded once. After
> changing assets, refresh it with:
> `docker compose up --build -d --force-recreate app && docker compose restart web`
> (or `docker volume rm <project>_app_public` while stopped).

**`.env.example`** (copy to `.env`)

```env
# PostgreSQL
POSTGRES_DB=laravel
POSTGRES_USER=laravel
POSTGRES_PASSWORD=secret

# Laravel ↔ services
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
REDIS_HOST=cache
REDIS_PORT=6379

# Host port
APP_PORT=8000          # app → http://localhost:8000
```

**`.gitignore`** (additions to Laravel's default)

```gitignore
/.env
/vendor
/node_modules
/public/build
/public/hot
/storage/*.key
```

**`Makefile`**

```makefile
.PHONY: up down build key migrate fresh logs ps tinker dev

up:       ; docker compose up -d
down:     ; docker compose down
build:    ; docker compose up --build -d
key:      ; docker compose exec app php artisan key:generate
migrate:  ; docker compose exec app php artisan migrate
fresh:    ; docker compose down -v && docker compose up --build -d && sleep 8 && docker compose exec app php artisan migrate --seed
logs:     ; docker compose logs -f
ps:       ; docker compose ps
tinker:   ; docker compose exec app php artisan tinker
# Hot-reload dev server (run alongside `make up`): http://localhost:5173
dev:      ; docker run --rm -it -v "$(PWD)":/app -w /app -p 5173:5173 node:24-alpine sh -c "npm install && npm run dev -- --host"
```

---

## Step 5 — Run it

```bash
cp .env.example .env

make build                                   # build the image + start
docker compose exec app php artisan key:generate
sleep 10                                      # let PostgreSQL initialize on first boot
make migrate
```

Open **http://localhost:8000** — you should see the `Welcome` page rendered by
React with the message passed from `routes/web.php`.

---

## Development with hot reload (optional)

The image ships **pre-built** assets (great for "does it run" and production).
For live editing with HMR, run the Vite dev server next to the stack:

```bash
make up            # PHP + Nginx + DB + Redis
make dev           # Vite dev server on :5173 (writes public/hot)
```

While `public/hot` exists, the `@vite` directive loads assets from the dev server
and React Fast Refresh works. Stop `make dev` (removes `public/hot`) to fall back
to the built assets.

---

## Adding more pages

1. Create `resources/js/Pages/About.tsx` exporting a React component.
2. Add a route: `Route::get('/about', fn () => Inertia::render('About'));`
3. Link to it with Inertia's `<Link href="/about">` (`import { Link } from '@inertiajs/react'`).

No API endpoint, no `fetch`, no CORS — the controller passes props straight into
the page.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Connection refused` on `make migrate` | PostgreSQL still starting — wait ~10s and retry. |
| Blank page / `@vite` manifest error | Assets weren't built. Rebuild (`make build`) or run `make dev`. |
| Page shows raw `@inertia` text | `inertiajs/inertia-laravel` not installed or middleware not registered (Step 2). |
| CSS/JS 404 after editing the frontend | The `app_public` volume is stale — recreate it (see note under the Compose file). |
| `No application encryption key` | `docker compose exec app php artisan key:generate`. |
| Port already in use | Change `APP_PORT` in `.env`, then `make down && make up`. |
| `composer install` fails on build | You added Inertia but didn't update `composer.lock` — run `composer require inertiajs/inertia-laravel` locally first. |
