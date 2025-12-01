<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Models\Cart;


Route::get('/cart', function () {
    $cart = Cart::all();

    return response()->json(['data' => $cart]);
});