<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use App\Http\Resources\MovieResource;

class MovieController extends Controller
{
    public function index(Request $request)
    {
        $key = env('API_KEY');
        $url = env('API_URL');
        $carts = Cart::all();
        $upcomingURL = Http::get("{$url}/movie/upcoming?api_key={$key}");
        $ongoingURL = Http::get("{$url}/movie/now_playing?api_key={$key}");
        $genres = Http::get("{$url}/genre/movie/list?api_key={$key}")->json()['genres'];

        $upcoming = MovieResource::collection($upcomingURL->json()['results'])->toArray($request);
        $ongoing = MovieResource::collection($ongoingURL->json()['results'])->toArray($request);

        return Inertia::render('Home', ['upcoming' => $upcoming, 'ongoing' => $ongoing, 'genres' => $genres, 'url' => $url, 'apiKey' => $key, 'carts' => $carts]);
    }

    public function show($status, $id)
    {
        $key = env('API_KEY');
        $url = env('API_URL');
        $detail = Http::get("{$url}/movie/{$id}?api_key={$key}")->json();
        $items = Cart::where('user_id', Auth::id())->where('movie_id', $id)->get();
        $credits = Http::get("{$url}/movie/{$id}/credits?api_key={$key}")->json();

        return Inertia::render('Detail', ['id' => $id, 'items' => $items, 'status' => $status, 'detail' => $detail, 'credits' => $credits]);
    }

    public function genre($genre)
    {
        $key = env('API_KEY');
        $url = env('API_URL');

        $movies = Http::get("{$url}/discover/movie?api_key={$key}&with_genres={$genre}")->json()['results'];

        return Inertia::render("Genre", ['movies' => $movies]);
    }

    public function search($query) {
        $key = env('API_KEY');
        $response = Http::get("https://api.themoviedb.org/3/search/movie?query={$query}&api_key={$key}");
        return response()->json($response->json()['results']);
    }
}
