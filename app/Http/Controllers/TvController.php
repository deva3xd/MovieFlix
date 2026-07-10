<?php

namespace App\Http\Controllers;

use App\Events\MediaCacheMissed;
use App\Http\Resources\TvDetailResource;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use App\Models\Cart;

class TvController extends Controller
{
    public function index()
    {
        $mediaEndpoints = [
            'tv' => ['airing_today', 'on_the_air', 'popular', 'top_rated'],
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

        return Inertia::render('TvShows', compact('data'));
    }

    public function show(string $id)
    {
        $cart = Cart::where('user_id', Auth::id())->where('movie_id', $id)->first();

        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');
        $tmdb = $this->tmdbRequest($key);
        $query = $this->queryParameters($key);

        $detail = (new TvDetailResource(
            $tmdb->get("{$url}/tv/{$id}", $query)->throw()->json()
        ))->resolve();
        $credits = $tmdb->get("{$url}/tv/{$id}/credits", $query)->throw()->json();
        $videos = $tmdb->get("{$url}/tv/{$id}/videos", $query)->throw()->json();

        return Inertia::render('Detail', compact('cart', 'detail', 'credits', 'videos'));
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
