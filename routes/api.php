<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Models\Watchlist;


Route::get('/watchlist', function () {
    $watchlist = Watchlist::all();

    return response()->json(['data' => $watchlist]);
});