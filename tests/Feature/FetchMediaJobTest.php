<?php

namespace Tests\Feature;

use App\Jobs\FetchMediaJob;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class FetchMediaJobTest extends TestCase
{
    public function test_it_fetches_media_with_bearer_token_and_caches_successful_results(): void
    {
        config([
            'cache.default' => 'array',
            'services.tmdb.key' => 'header.payload.signature',
            'services.tmdb.url' => 'https://api.themoviedb.org/3',
        ]);

        Http::fake([
            'api.themoviedb.org/3/movie/popular' => Http::response([
                'results' => [
                    [
                        'id' => 1,
                        'title' => 'Example Movie',
                        'poster_path' => '/poster.jpg',
                        'backdrop_path' => '/backdrop.jpg',
                        'overview' => 'Overview',
                        'release_date' => '2026-06-28',
                        'vote_average' => '6.5',
                        'original_language' => 'EN',
                    ],
                ],
            ]),
        ]);

        (new FetchMediaJob('movie', 'popular'))->handle();

        Http::assertSent(fn(Request $request) => $request->hasHeader('Authorization', 'Bearer header.payload.signature')
            && $request->url() === 'https://api.themoviedb.org/3/movie/popular');

        $this->assertSame([
            [
                'id' => 1,
                'title' => 'Example Movie',
                'poster_path' => '/poster.jpg',
                'backdrop_path' => '/backdrop.jpg',
                'overview' => 'Overview',
                'release_date' => '2026-06-28',
                'vote_average' => '6.5',
                'original_language' => 'EN',
            ],
        ], Cache::get('media:movie:popular'));
    }

    public function test_it_does_not_cache_failed_api_responses(): void
    {
        config([
            'cache.default' => 'array',
            'services.tmdb.key' => 'header.payload.signature',
            'services.tmdb.url' => 'https://api.themoviedb.org/3',
        ]);

        Http::fake([
            'api.themoviedb.org/3/tv/popular' => Http::response(['status_message' => 'Invalid token'], 401),
        ]);

        try {
            (new FetchMediaJob('tv', 'popular'))->handle();

            $this->fail('Expected the failed response to be thrown for queue retry.');
        } catch (RequestException) {
            $this->assertFalse(Cache::has('media:tv:popular'));
        }
    }
}
