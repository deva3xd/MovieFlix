<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    protected function authProps(Request $request): array
    {
        return ['user' => $request->user()];
    }

    protected function flashProps(Request $request): array
    {
        return [
            'message' => fn() => $request->session()->get('message'),
        ];
    }

    protected function moviegenreProps(): array
    {
        return Cache::remember('tmdb.genres.movie', now()->addDay(), function () {
            $key = config('services.tmdb.key');
            $url = config('services.tmdb.url');

            return Http::get("{$url}/genre/movie/list", [
                'api_key' => $key,
            ])->json('genres', []);
        });
    }

    protected function tvgenreProps(): array
    {
        return Cache::remember('tmdb.genres.tv', now()->addDay(), function () {
            $key = config('services.tmdb.key');
            $url = config('services.tmdb.url');

            return Http::get("{$url}/genre/tv/list", [
                'api_key' => $key,
            ])->json('genres', []);
        });
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => $this->authProps($request),
            'flash' => $this->flashProps($request),
            'moviegenres' => $this->moviegenreProps(),
            'tvgenres' => $this->tvgenreProps(),
        ]);
    }
}
