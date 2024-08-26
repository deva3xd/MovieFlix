<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;

class HomeController extends Controller
{
    public function index() {
        return Inertia::render('Home/Page');
    }

    public function show($id) {
        $items = Cart::where('user_id', auth()->user()->id)->get();
        return Inertia::render('Home/Detail', ['id' => $id, 'items' => $items]);
    }
}