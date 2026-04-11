<?php

namespace App\Http\Controllers;

use App\Events\MediaCacheMissed;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Client\Pool;
use App\Http\Resources\MovieDetailResource;

class MovieController extends Controller
{
    public function index(Request $request)
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
                }

                $data[$type][$endpoint] = $media;
            }
        }

        return Inertia::render('Movies', compact('data'));
    }

    public function show(Request $request, $id)
    {
        $cart = Cart::where('user_id', Auth::id())->where('movie_id', $id)->first();

        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');

        $responses = Http::pool(fn(Pool $pool) => [
            $pool->as('detail')->get("{$url}/movie/{$id}", ['api_key' => $key]),
            $pool->as('credits')->get("{$url}/movie/{$id}/credits", ['api_key' => $key]),
            $pool->as('videos')->get("{$url}/movie/{$id}/videos", ['api_key' => $key]),
        ]);

        $detail = new MovieDetailResource($responses['detail']->json());
        $credits = $responses['credits']->json();
        $videos = $responses['videos']->json();

        return Inertia::render('MovieDetail', compact('cart', 'detail', 'credits', 'videos'));
    }

    public function videos($id)
    {
        $key = config('services.tmdb.key');
        $url = "https://api.themoviedb.org/3/movie/{$id}/videos?language=en-US&api_key={$key}";

        $response = Http::get($url)->json();

        return response()->json($response);
    }
}
