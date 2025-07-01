<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Http\Resources\MovieResource;
use App\Models\Cart;

// Route::get('/movie', function (Request $request) {
//     $key = env('API_KEY');
//     $url = env('API_URL');
//     $response = Http::get("{$url}/now_playing?api_key={$key}");
//     $data = MovieResource::collection($response->json()['results'])->toArray($request);

//     return $data;
// });

Route::get('/cart', function () {
    $cart = Cart::all();

    return response()->json(['data' => $cart]);
});