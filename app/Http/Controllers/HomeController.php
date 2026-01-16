<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use App\Http\Resources\MovieListResource;
use App\Http\Resources\MovieDetailResource;
use App\Http\Resources\TvResource;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');
        $nowPlayingURL = Http::get("{$url}/movie/now_playing", [
            'api_key' => $key
        ]);
        $nowPlaying = MovieListResource::collection($nowPlayingURL->json()['results'])->toArray($request);
        $todayTvURL = Http::get("{$url}/tv/airing_today", [
            'api_key' => $key
        ]);
        $todayTv = TvResource::collection($todayTvURL->json()['results'])->toArray($request);

        return Inertia::render('Home', compact('nowPlaying', 'todayTv'));
    }

    public function show($id)
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
        $videos = Http::get("{$url}/movie/{$id}/videos", [
            'api_key' => $key
        ])->json();

        return Inertia::render('Detail', compact('cart', 'detail', 'credits', 'videos'));
    }

    public function search(Request $request)
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');
        $category = $request->input('category');
        $queryInput = $request->input('query');
        $response = Http::get("{$url}/search/{$category}", [
            'query' => $queryInput,
            'api_key' => $key,
        ]);

        $results = response()->json($response->json()['results'] ?? []);

        return Inertia::render('Search', compact('results', 'queryInput'));
    }

    public function videos($id)
    {
        $key = config('services.tmdb.key');
        $url = "https://api.themoviedb.org/3/movie/{$id}/videos?language=en-US&api_key={$key}";

        $response = Http::get($url)->json();

        return response()->json($response);
    }

    public function genre($genre)
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');
        $movies = Http::get("{$url}/discover/movie?api_key={$key}&with_genres={$genre}")->json()['results'];

        return Inertia::render("Genre", ['movies' => $movies]);
    }
}
