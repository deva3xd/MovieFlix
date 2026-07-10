<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CastController extends Controller
{
    public function __invoke(string $media, string $id)
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');
        $tmdb = $this->tmdbRequest($key);
        $query = $this->queryParameters($key);
        $mediaType = match ($media) {
            'tv-shows' => 'tv',
            default => Str::singular($media),
        };

        $detail = $tmdb->get("{$url}/{$mediaType}/{$id}", $query)->throw()->json();
        $cast = $tmdb->get("{$url}/{$mediaType}/{$id}/credits", $query)->throw()->json();
        
        return Inertia::render('Cast', compact('detail', 'cast'));
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
