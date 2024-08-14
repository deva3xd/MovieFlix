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
    Route::get('/home/movie-detail/id={id}', [HomeController::class, 'detail'])->name('detail');

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // cart
    Route::get('/cart', [CartController::class, 'index'])->name('cart');
});

require __DIR__.'/auth.php';
