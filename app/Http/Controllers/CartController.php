<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index() {
        $carts = Cart::where('user_id', Auth::id())->get();
        return Inertia::render('Cart/Page', ['carts' => $carts]);
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
