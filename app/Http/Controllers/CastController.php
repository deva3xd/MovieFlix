<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CastController extends Controller
{
    public function __invoke($media, $id)
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');
        $mediaType = match ($media) {
            'tv-shows' => 'tv',
            default => Str::singular($media),
        };
        
        $data = Http::get("{$url}/{$mediaType}/{$id}/credits", ['api_key' => $key])->json();
        
        return Inertia::render('Cast', compact('data'));
    }
}
