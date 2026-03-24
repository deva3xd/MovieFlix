<?php

namespace App\Http\Controllers;

use App\Events\MediaCacheMissed;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $mediaEndpoints = [
            'movie' => ['now_playing'],
            'tv' => ['airing_today']
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

        return Inertia::render('Home', compact('data'));
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
