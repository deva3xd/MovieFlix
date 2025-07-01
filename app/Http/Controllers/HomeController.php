<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use App\Http\Resources\MovieResource;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $key = env('API_KEY');
        $url = env('API_URL');
        $upcomingURL = Http::get("{$url}/movie/upcoming?api_key={$key}");
        $ongoingURL = Http::get("{$url}/movie/now_playing?api_key={$key}");
        $genres = Http::get("{$url}/genre/movie/list?api_key={$key}")->json()['genres'];

        $upcoming = MovieResource::collection($upcomingURL->json()['results'])->toArray($request);
        $ongoing = MovieResource::collection($ongoingURL->json()['results'])->toArray($request);

        return Inertia::render('Home', ['upcoming' => $upcoming, 'ongoing' => $ongoing, 'genres' => $genres]);
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

    public function genre(Request $request, $genre)
    {
        $key = env('API_KEY');
        $url = env('API_URL');
        $ongoingURL = Http::get("{$url}/movie/now_playing?api_key={$key}");

        $ongoing = MovieResource::collection($ongoingURL->json()['results'])->toArray($request);

        return Inertia::render("Genre", ['ongoing' => $ongoing]);
    }

    public function search(Request $request) {
        $query = $request->input('query');
        $response = Http::get("https://api.themoviedb.org/3/search/movie", [
            'api_key' => env('TMDB_API_KEY'),
            'query' => $query,
        ]);
        return response()->json($response->json()['results']);
    }
}
