<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::redirect('/', '/home');
    // home
    Route::get('/home', [HomeController::class, 'index'])->name('home');
    Route::get('/home/{id}', [HomeController::class, 'search'])->name('search');
    Route::get('/home/detail/{id}/{ongoing}', [HomeController::class, 'show'])->name('detail');
    Route::post('/home/detail/{id}', [CartController::class, 'store'])->name('cart.store');

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // cart
    Route::get('/cart', [CartController::class, 'index'])->name('cart');
    Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
});

require __DIR__.'/auth.php';
