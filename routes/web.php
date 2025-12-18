<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\TvController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    // home
    Route::redirect('/', '/browse');
    Route::get('/browse', [HomeController::class, 'index'])->name('browse');
    Route::get('/movie-trailer/{id}/videos', [HomeController::class, 'videos']);
    Route::get('/search', [HomeController::class, 'search'])->name('search');
    Route::get('/detail/{status}/{id}', [HomeController::class, 'show'])->name('detail');
    Route::post('/detail/{status}/{id}', [CartController::class, 'store'])->name('cart.store');
    Route::get('/movies', MovieController::class)->name('movie');
    Route::get('/tv-shows', TvController::class)->name('tv');
    Route::get('/genre/{genre}', [HomeController::class, 'genre'])->name('genre');

    // cart
    Route::get('/cart', [CartController::class, 'index'])->name('cart');
    Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
