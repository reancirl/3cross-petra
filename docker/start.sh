#!/bin/sh
set -e

# Refresh public/ from the image's pristine copy.
#
# Without this the shared named volume keeps the assets it was first created with,
# so a rebuilt image serves a stale Vite manifest and every CSS/JS URL 404s — the
# page renders as unstyled HTML. Skipped when public/ is bind-mounted for HMR
# (public-dist is absent from the dev bind), so it never clobbers a dev checkout.
if [ -d /var/www/html/public-dist ]; then
    # Drop build/ first so old hashed files do not accumulate forever.
    rm -rf /var/www/html/public/build
    cp -a /var/www/html/public-dist/. /var/www/html/public/
fi

mkdir -p storage/logs storage/framework/cache/data storage/framework/sessions storage/framework/views bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
chmod -R ug+rwX storage bootstrap/cache

php artisan inertia:start-ssr &

exec php-fpm
