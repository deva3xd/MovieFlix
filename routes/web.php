<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CartController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('/', '/home');
    // home
    Route::get('/home', [HomeController::class, 'index'])->name('home');
    Route::get('/home/movie-detail/id={id}', [HomeController::class, 'show'])->name('detail');
    Route::post('/home/movie-detail/id={id}', [CartController::class, 'store']);

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // cart
    Route::get('/cart', [CartController::class, 'index'])->name('cart');
    // Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
});

require __DIR__.'/auth.php';
