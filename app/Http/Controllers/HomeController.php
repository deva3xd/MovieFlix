<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use App\Http\Resources\MovieListResource;
use App\Http\Resources\MovieDetailResource;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $key = config('services.tmdb.key');
        $apiKey = config('services.tmdb.key');
        $url = config('services.tmdb.url');
        $cart = Cart::where('user_id', Auth::id())->get();
        $movieURL = Http::get("{$url}/movie/now_playing", [
            'api_key' => $key
        ]);
        $movie = MovieListResource::collection($movieURL->json()['results'])->toArray($request);

        return Inertia::render('Home', compact('movie', 'apiKey', 'cart'));
    }

    public function show($status, $id)
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');
        $detailURL = Http::get("{$url}/movie/{$id}", [
            'api_key' => $key
        ]);
        $detail = new MovieDetailResource($detailURL->json());
        $cart = Cart::where('user_id', Auth::id())->where('movie_id', $id)->first();
        $credits = Http::get("{$url}/movie/{$id}/credits", [
            'api_key' => $key
        ])->json();

        return Inertia::render('Detail', compact('cart', 'detail', 'credits', 'status'));
    }

    public function search(Request $request)
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');
        $category = $request->input('category');
        $query = $request->input('query');
        $response = Http::get("{$url}/search/{$category}", [
            'query' => $query,
            'api_key' => $key,
        ]);

        $results = response()->json($response->json()['results'] ?? []);
        return Inertia::render('Search', compact('results'));
    }
}
