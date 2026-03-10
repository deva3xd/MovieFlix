<?php

namespace App\Http\Controllers;

use App\Http\Resources\TvResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Pool;
use Inertia\Inertia;

class TvController extends Controller
{
    public function __invoke(Request $request)
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');

        $responses = Http::pool(fn(Pool $pool) => [
            $pool->as('airingToday')->get("{$url}/tv/airing_today", ['api_key' => $key]),
            $pool->as('onTheAir')->get("{$url}/tv/on_the_air", ['api_key' => $key]),
            $pool->as('popular')->get("{$url}/tv/popular", ['api_key' => $key]),
            $pool->as('topRated')->get("{$url}/tv/top_rated", ['api_key' => $key]),
        ]);

        $airingToday = TvResource::collection($responses['airingToday']->json()['results'])->toArray($request);
        $onTheAir = TvResource::collection($responses['onTheAir']->json()['results'])->toArray($request);
        $popular = TvResource::collection($responses['popular']->json()['results'])->toArray($request);
        $topRated = TvResource::collection($responses['topRated']->json()['results'])->toArray($request);

        return Inertia::render('TvShows', compact('airingToday', 'onTheAir', 'popular', 'topRated'));
    }
}
