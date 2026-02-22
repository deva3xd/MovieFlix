# =========================
# Base Image (FrankenPHP)
# =========================
FROM dunglas/frankenphp:php8.2

# =========================
# System Dependencies
# =========================
RUN apt-get update && apt-get install -y \
  libpng-dev \
  libjpeg-dev \
  libfreetype6-dev \
  zip \
  unzip \
  git \
  curl \
  libzip-dev \
  libicu-dev \
  ca-certificates \
  gnupg \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install gd pdo pdo_mysql intl zip pcntl

# =========================
# Install Node.js + pnpm
# =========================
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g pnpm

# =========================
# Set Working Directory
# =========================
WORKDIR /app

# =========================
# Install Composer
# =========================
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# =========================
# Copy Application
# =========================
COPY . .

# =========================
# Install PHP dependencies
# =========================
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# =========================
# Install frontend dependencies & build
# =========================
RUN pnpm install --frozen-lockfile && pnpm build

# =========================
# Permissions (Laravel)
# =========================
RUN chown -R www-data:www-data storage bootstrap/cache \
  && chmod -R 775 storage bootstrap/cache

# =========================
# Install Laravel Octane
# =========================
RUN composer require laravel/octane \
  && php artisan octane:install --server=frankenphp

# =========================
# Expose FrankenPHP Port
# =========================
EXPOSE 8000

# =========================
# Start Octane Server
# =========================
CMD ["php", "artisan", "octane:start", "--server=frankenphp", "--host=0.0.0.0", "--port=8000"]
