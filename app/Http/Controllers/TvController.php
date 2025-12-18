<?php

namespace App\Http\Controllers;

use App\Http\Resources\TvResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class TvController extends Controller
{
    public function __invoke(Request $request)
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');
        $airingTodayURL = Http::get("{$url}/tv/airing_today", [
            'api_key' => $key
        ]);
        $airingToday = TvResource::collection($airingTodayURL->json()['results'])->toArray($request);

        $onTheAirURL = Http::get("{$url}/tv/on_the_air", [
            'api_key' => $key
        ]);
        $onTheAir = TvResource::collection($onTheAirURL->json()['results'])->toArray($request);

        $popularURL = Http::get("{$url}/tv/popular", [
            'api_key' => $key
        ]);
        $popular = TvResource::collection($popularURL->json()['results'])->toArray($request);

        $topRatedURL = Http::get("{$url}/tv/top_rated", [
            'api_key' => $key
        ]);
        $topRated = TvResource::collection($topRatedURL->json()['results'])->toArray($request);

        return Inertia::render('TvShows', compact('airingToday', 'onTheAir', 'popular', 'topRated'));
    }
}
