<p align="center"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Requirement

- Node.js
- PHP 8
- Composer
- MySql
- Web Server

## Installation

- Clone this project
- Navigate to the project
- Install dependencies `npm install` and `composer install`
- Rename ".env.example" file to ".env"
- In the ".env" file, don't forget to fill API_KEY from TMDB API
- Generate app key `php artisan key:generate`
- Migrate database `php artisan migrate`
- Run project `php artisan serve` and `npm run dev`  
