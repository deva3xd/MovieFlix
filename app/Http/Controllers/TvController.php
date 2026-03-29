<?php

namespace App\Http\Controllers;

use App\Events\MediaCacheMissed;
use App\Http\Resources\TvDetailResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Client\Pool;
use Inertia\Inertia;

class TvController extends Controller
{
    public function index(Request $request)
    {
        $mediaEndpoints = [
            'tv' => ['airing_today', 'on_the_air', 'popular', 'top_rated'],
        ];

        $data = [];

        foreach ($mediaEndpoints as $type => $endpoints) {
            foreach ($endpoints as $endpoint) {
                $cacheKey = "media:$type:$endpoint";
                $media = Cache::get($cacheKey);

                if (!$media) {
                    event(new MediaCacheMissed($type, $endpoint));
                }

                $data[$type][$endpoint] = $media;
            }
        }

        return Inertia::render('TvShows', compact('data'));
    }

    public function show(Request $request, $id)
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');

        $responses = Http::pool(fn(Pool $pool) => [
            $pool->as('detail')->get("{$url}/tv/{$id}", ['api_key' => $key]),
            $pool->as('credits')->get("{$url}/tv/{$id}/credits", ['api_key' => $key]),
            $pool->as('videos')->get("{$url}/tv/{$id}/videos", ['api_key' => $key]),
        ]);

        $detail = new TvDetailResource($responses['detail']->json());
        $credits = $responses['credits']->json();
        $videos = $responses['videos']->json();

        return Inertia::render('TvDetail', compact('detail', 'credits', 'videos'));
    }
}
