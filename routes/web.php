<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TvController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    // home
    Route::get('/', [HomeController::class, 'index'])->name('browse');
    Route::get('/search', [HomeController::class, 'search'])->name('search');
    
    // movie
    Route::prefix('movies')->group(function() {
        Route::get('/', [MovieController::class, 'index'])->name('movie');
        Route::get('/{id}', [MovieController::class, 'show'])->name('detail');
        Route::post('/{id}', [CartController::class, 'store'])->name('cart.store');
        Route::get('/{id}/videos', [MovieController::class, 'videos']);
    });
    
    // tv
    Route::prefix('tv-shows')->group(function() {
        Route::get('/', TvController::class)->name('tv');    
    });
    
    // cart
    Route::prefix('cart')->group(function() { 
        Route::get('/', [CartController::class, 'index'])->name('cart');
        Route::delete('/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
    });

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
