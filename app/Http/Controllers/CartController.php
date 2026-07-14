<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartRequest;
use App\Models\Cart;
use Illuminate\Http\Client\PendingRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class CartController extends Controller
{
    public function index()
    {
        $key = config('services.tmdb.key');
        $url = config('services.tmdb.url');
        $tmdb = $this->tmdbRequest($key);
        $query = $this->queryParameters($key);
        
        $carts = Cart::where('user_id', Auth::id())->pluck('movie_id')->map(function ($movieId) use ($url, $tmdb, $query) {
            return $tmdb->get("{$url}/movie/{$movieId}", $query)->throw()->json();
        });
        $cartCount = Cart::where('user_id', Auth::id())->count();

        return Inertia::render('Cart', compact('carts', 'cartCount'));
    }

    public function store(CartRequest $request)
    {
        Cart::create($request->validated());

        return back();
    }

    public function destroy(string $id)
    {
        $cart = Cart::where('movie_id', $id);
        $cart->delete();

        return redirect()->route('cart');
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
