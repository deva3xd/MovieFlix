<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Pool;
use App\Http\Resources\MovieListResource;
use App\Http\Resources\MovieDetailResource;

class MovieController extends Controller
{
    public function index(Request $request)
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');

        $responses = Http::pool(fn(Pool $pool) => [
            $pool->as('now_playing')->get("{$url}/movie/now_playing", ['api_key' => $key]),
            $pool->as('popular')->get("{$url}/movie/popular", ['api_key' => $key]),
            $pool->as('top_rated')->get("{$url}/movie/top_rated", ['api_key' => $key]),
            $pool->as('upcoming')->get("{$url}/movie/upcoming", ['api_key' => $key]),
        ]);

        $nowPlaying = MovieListResource::collection($responses['now_playing']->json()['results'])->toArray($request);
        $popular = MovieListResource::collection($responses['popular']->json()['results'])->toArray($request);
        $topRated = MovieListResource::collection($responses['top_rated']->json()['results'])->toArray($request);
        $upcoming = MovieListResource::collection($responses['upcoming']->json()['results'])->toArray($request);

        return Inertia::render('Movies', compact('nowPlaying', 'popular', 'topRated', 'upcoming'));
    }

    public function show(Request $request, $id)
    {
        $cart = Cart::where('user_id', Auth::id())->where('movie_id', $id)->first();
        $source = $request->input('source');

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

        return Inertia::render('Detail', compact('cart', 'detail', 'credits', 'videos', 'source'));
    }

    public function videos($id)
    {
        $key = config('services.tmdb.key');
        $url = "https://api.themoviedb.org/3/movie/{$id}/videos?language=en-US&api_key={$key}";

        $response = Http::get($url)->json();

        return response()->json($response);
    }
}
