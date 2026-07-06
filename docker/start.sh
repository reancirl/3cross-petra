#!/bin/sh
set -e

php artisan inertia:start-ssr &

exec php-fpm
