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
    public function index(Request $request) {
        $key = env('API_KEY');
        $url = env('API_URL');
        $upcomingURL = Http::get("{$url}/upcoming?api_key={$key}");
        $ongoingURL = Http::get("{$url}/now_playing?api_key={$key}");

        $upcoming = MovieResource::collection($upcomingURL->json()['results'])->toArray($request);
        $ongoing = MovieResource::collection($ongoingURL->json()['results'])->toArray($request);

        return Inertia::render('Home/Page', ['upcoming' => $upcoming, 'ongoing' => $ongoing]);
    }
    
    public function show($id, $ongoing) {
        $key = env('API_KEY');
        $url = env('API_URL');
        $detailURL = Http::get("{$url}/{$id}?api_key={$key}");
        
        $detail = $detailURL->json();
        $items = Cart::where('user_id', Auth::id())->where('movie_id', $id)->get();
        
        return Inertia::render('Home/Detail', ['id' => $id, 'items' => $items, 'ongoing' => $ongoing, 'detail' => $detail]);
    }
}