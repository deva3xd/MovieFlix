<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class HomeController extends Controller
{
    public function index() {
        $res = Http::get('https://api.themoviedb.org/3/movie/now_playing?api_key=1768ded8bc2a22c8c989b581e2c276e6');
        // dd($res->collect());
        return Inertia::render('Home/Page', [
            'res' => $res
        ]);
    }

    public function detail($id) {
        return Inertia::render('Home/Detail', [
            'id' => $id
        ]);
    }
}
