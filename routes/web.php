<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    // movie
    Route::redirect('/', '/movie');
    Route::get('/movie', [MovieController::class, 'index'])->name('movie');
    Route::get('/movie/{query}', [MovieController::class, 'search'])->name('movie.search');
    Route::get('/movie/genre/{genre}', [MovieController::class, 'genre'])->name('movie.genre');
    Route::get('/movie/{status}/{id}', [MovieController::class, 'show'])->name('movie.detail');
    Route::post('/movie/{status}/{id}', [CartController::class, 'store'])->name('cart.store');

    // cart
    Route::get('/cart', [CartController::class, 'index'])->name('cart');
    Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
