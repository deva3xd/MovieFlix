<?php

use App\Http\Controllers\CastController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WatchlistController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TvController;
use Illuminate\Support\Facades\Route;

// home
Route::get('/', [HomeController::class, 'index'])->name('browse');
Route::get('/search', [HomeController::class, 'search'])->name('search');

// movie
Route::prefix('movies')->group(function () {
    Route::get('/', [MovieController::class, 'index'])->name('movie');
    Route::get('/{id}', [MovieController::class, 'show'])->name('movie.show');
    Route::get('/{id}/videos', [MovieController::class, 'videos']);
});

// tv
Route::prefix('tv-shows')->group(function () {
    Route::get('/', [TvController::class, 'index'])->name('tv');
    Route::get('/{id}', [TvController::class, 'show'])->name('tv.show');
});

// cast
Route::get('/{media}/{id}/cast', CastController::class)->name('cast');

Route::middleware('auth')->group(function () {
    // watchlist
    Route::prefix('watchlist')->group(function () {
        Route::get('/', [WatchlistController::class, 'index'])->name('watchlist');
        Route::post('/', [WatchlistController::class, 'store'])->name('watchlist.store');
        Route::delete('/{id}', [WatchlistController::class, 'destroy'])->name('watchlist.destroy');
    });

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
