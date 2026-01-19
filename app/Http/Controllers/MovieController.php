<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use App\Http\Resources\MovieListResource;
use App\Http\Resources\MovieDetailResource;

class MovieController extends Controller
{
    public function index(Request $request)
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

    public function show(Request $request, $id)
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');
        $detailURL = Http::get("{$url}/movie/{$id}", [
            'api_key' => $key
        ]);
        $detail = new MovieDetailResource($detailURL->json());
        $cart = Cart::where('user_id', Auth::id())->where('movie_id', $id)->first();
        $credits = Http::get("{$url}/movie/{$id}/credits", [
            'api_key' => $key
        ])->json();
        $videos = Http::get("{$url}/movie/{$id}/videos", [
            'api_key' => $key
        ])->json();
        $source = $request->input('source');

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
