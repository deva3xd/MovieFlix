# =========================
# Base Image
# =========================
FROM php:8.2-apache

# =========================
# Apache Config
# =========================
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

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
  && docker-php-ext-install gd pdo pdo_mysql intl zip

# =========================
# Install Node.js 24 + pnpm
# =========================
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm

# =========================
# Enable Apache rewrite
# =========================
RUN a2enmod rewrite

# =========================
# Set Working Directory
# =========================
WORKDIR /var/www/html

# =========================
# Install Composer
# =========================
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# =========================
# Copy Laravel App (artisan must exist)
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
# Permissions (Laravel requirement)
# =========================
RUN chown -R www-data:www-data storage bootstrap/cache \
  && chmod -R 775 storage bootstrap/cache

# =========================
# Expose Apache Port
# =========================
EXPOSE 80
