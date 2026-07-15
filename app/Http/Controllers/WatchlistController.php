<?php

namespace App\Http\Controllers;

use App\Http\Requests\WatchlistRequest;
use App\Models\Watchlist;
use Illuminate\Http\Client\PendingRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class WatchlistController extends Controller
{
    public function index()
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');
        $tmdb = $this->tmdbRequest($key);
        $query = $this->queryParameters($key);
        
        $watchlist = Watchlist::where('user_id', Auth::id())->pluck('movie_id')->map(function ($movieId) use ($url, $tmdb, $query) {
            return $tmdb->get("{$url}/movie/{$movieId}", $query)->throw()->json();
        });

        return Inertia::render('Watchlist', compact('watchlist'));
    }

    public function store(WatchlistRequest $request)
    {
        Watchlist::create($request->validated());

        return back();
    }

    public function destroy(string $id)
    {
        $watchlist = Watchlist::where('movie_id', $id);
        $watchlist->delete();

        return redirect()->route('watchl$watchlist');
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
