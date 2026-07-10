<?php

namespace App\Http\Controllers;

use App\Events\MediaCacheMissed;
use Inertia\Inertia;
use App\Models\Cart;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use App\Http\Resources\MovieDetailResource;

class MovieController extends Controller
{
    public function index()
    {
        $mediaEndpoints = [
            'movie' => ['now_playing', 'popular', 'top_rated', 'upcoming'],
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

        return Inertia::render('Movies', compact('data'));
    }

    public function show(string $id)
    {
        $cart = Cart::where('user_id', Auth::id())->where('movie_id', $id)->first();

        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');
        $tmdb = $this->tmdbRequest($key);
        $query = $this->queryParameters($key);

        $detail = (new MovieDetailResource(
            $tmdb->get("{$url}/movie/{$id}", $query)->throw()->json()
        ))->resolve();
        $credits = $tmdb->get("{$url}/movie/{$id}/credits", $query)->throw()->json();
        $videos = $tmdb->get("{$url}/movie/{$id}/videos", $query)->throw()->json();

        return Inertia::render('Detail', compact('cart', 'detail', 'credits', 'videos'));
    }

    public function videos(string $id)
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');

        $response = $this->tmdbRequest($key)
            ->get("{$url}/movie/{$id}/videos", $this->queryParameters($key))
            ->throw()
            ->json();

        return response()->json($response);
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
