<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use App\Http\Resources\MovieListResource;

class MovieController extends Controller
{
    public function __invoke(Request $request)
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');
        $nowPlayingURL = Http::get("{$url}/movie/now_playing", [
            'api_key' => $key
        ]);
        $nowPlaying = MovieListResource::collection($nowPlayingURL->json()['results'])->toArray($request);

        $popularURL = Http::get("{$url}/movie/popular", [
            'api_key' => $key
        ]);
        $popular = MovieListResource::collection($popularURL->json()['results'])->toArray($request);

        $topRatedURL = Http::get("{$url}/movie/top_rated", [
            'api_key' => $key
        ]);
        $topRated = MovieListResource::collection($topRatedURL->json()['results'])->toArray($request);

        $upcomingURL = Http::get("{$url}/movie/upcoming", [
            'api_key' => $key
        ]);
        $upcoming = MovieListResource::collection($upcomingURL->json()['results'])->toArray($request);

        return Inertia::render('Movies', compact('nowPlaying', 'popular', 'topRated', 'upcoming'));
    }
}
