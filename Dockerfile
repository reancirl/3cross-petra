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
    libzip-dev libonig-dev libxml2-dev libpq-dev nodejs \
    && docker-php-ext-install pdo pdo_pgsql mbstring zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
WORKDIR /var/www/html
COPY --from=vendor /var/www/html/vendor ./vendor
COPY --from=vendor /var/www/html .
COPY --from=assets /app/node_modules ./node_modules
COPY --from=assets /app/public/build ./public/build
COPY --from=assets /app/bootstrap/ssr ./bootstrap/ssr
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache \
    && chmod +x docker/start.sh
EXPOSE 9000
CMD ["docker/start.sh"]
