<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index() {
        $cart = Cart::all();
        return Inertia::render('Cart/Page', ['carts' => $cart]);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'user_id' => ["required", "integer"],
            'movie_id' => ["required", "integer"],
            'price' => ["required", "integer"],
            'count' => ["required", "integer"],
        ]);

        Cart::create($data);
        return back()->with('message', 'data added');
    }
}
