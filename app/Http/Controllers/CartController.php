<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class CartController extends Controller
{
    public function index() {
        $key = env('API_KEY');
        $url = env('API_URL');
        $carts = Cart::where('user_id', Auth::id())->pluck('movie_id')->map(function ($movieId) use ($url, $key) {
            return Http::get("{$url}/movie/{$movieId}?api_key={$key}")->json();
         });;
        $cartCount = Cart::where('user_id', Auth::id())->count();
        return Inertia::render('Cart', ['carts' => $carts, 'cartCount' => $cartCount]);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'user_id' => ["required", "integer"],
            'movie_id' => ["required", "integer"],
            'price' => ["required", "integer"],
            'count' => ["required", "integer"],
        ]);

        Cart::create($data);
        return back()->with('message', 'Data Added');
    }

    public function destroy($id) {
        $cart = Cart::where('movie_id', $id)->delete();
        
        return redirect()->route('cart')->with('success', 'Delete Data');
    }
}