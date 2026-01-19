<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use App\Http\Resources\MovieListResource;
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
}
