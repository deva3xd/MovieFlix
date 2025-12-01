<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    // home
    Route::redirect('/', '/browse');
    
    Route::get('/browse', [HomeController::class, 'index'])->name('browse');
    Route::get('/search', [HomeController::class, 'search'])->name('search');
    Route::get('/detail/{status}/{id}', [HomeController::class, 'show'])->name('detail');
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
