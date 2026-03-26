<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class CastController extends Controller
{
    public function __invoke($media, $id)
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');
        
        $data = Http::get("{$url}/{$media}/{$id}/credits", ['api_key' => $key])->json();
        
        return Inertia::render('Cast', compact('data'));
    }
}
