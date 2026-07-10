<?php

namespace App\Http\Controllers;

use App\Events\MediaCacheMissed;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    public function index()
    {
        $mediaEndpoints = [
            'movie' => ['now_playing', 'top_rated', 'popular'],
            'tv' => ['airing_today', 'top_rated', 'popular']
        ];

        $data = [];

        foreach ($mediaEndpoints as $type => $endpoints) {
            foreach ($endpoints as $endpoint) {
                $cacheKey = "media:$type:$endpoint";
                $hasMedia = Cache::has($cacheKey);
                $media = Cache::get($cacheKey);

                if (!$hasMedia) {
                    event(new MediaCacheMissed($type, $endpoint));
                    $media = Cache::get($cacheKey);
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
        $response = $this->tmdbRequest($key)->get("{$url}/search/{$category}", [
            'query' => $queryInput,
            ...$this->queryParameters($key),
        ])->throw();

        $results = response()->json($response->json()['results'] ?? []);

        return Inertia::render('Search', compact('results', 'queryInput'));
    }

    protected function tmdbRequest(string $key): PendingRequest
    {
        $request = Http::acceptJson()->timeout(15);

        return $this->usesBearerToken($key)
            ? $request->withToken($key)
            : $request;
    }

    protected function queryParameters(string $key): array
    {
        return $this->usesBearerToken($key) ? [] : ['api_key' => $key];
    }

    protected function usesBearerToken(string $key): bool
    {
        return substr_count($key, '.') === 2;
    }
}
