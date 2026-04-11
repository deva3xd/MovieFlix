<?php

namespace App\Jobs;

use App\Http\Resources\MovieListResource;
use App\Http\Resources\TvListResource;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FetchMediaJob implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public string $type;
    public string $endpoint;
    public int $tries = 3;
    public int $uniqueFor = 300;

    public function __construct(string $type, string $endpoint)
    {
        $this->type = $type;
        $this->endpoint = $endpoint;
    }

    public function uniqueId(): string
    {
        return "{$this->type}:{$this->endpoint}";
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $url = config('services.tmdb.url');
        $key = config('services.tmdb.key');

        if (!$url || !$key) {
            Log::warning('Skipping media fetch because TMDB configuration is incomplete.', [
                'type' => $this->type,
                'endpoint' => $this->endpoint,
            ]);

            $this->storeFallbackCache();

            return;
        }

        try {
            $response = Http::timeout(15)->get(
                "{$url}/{$this->type}/{$this->endpoint}",
                ['api_key' => $key]
            );
        } catch (ConnectionException $exception) {
            Log::warning('TMDB media fetch failed due to a connection problem.', [
                'type' => $this->type,
                'endpoint' => $this->endpoint,
                'message' => $exception->getMessage(),
            ]);

            $this->storeFallbackCache();

            return;
        }

        if ($response->failed()) {
            Log::warning('TMDB media fetch returned an unsuccessful response.', [
                'type' => $this->type,
                'endpoint' => $this->endpoint,
                'status' => $response->status(),
                'body' => $response->json() ?? $response->body(),
            ]);

            $this->storeFallbackCache();

            return;
        }

        $payload = $response->json();
        $results = is_array($payload['results'] ?? null) ? $payload['results'] : [];

        $data = match ($this->type) {
            'movie' => MovieListResource::collection($results)->resolve(),
            'tv' => TvListResource::collection($results)->resolve(),
        };

        Cache::put(
            "media:{$this->type}:{$this->endpoint}",
            $data,
            now()->addDay()
        );
    }
    
    protected function storeFallbackCache(): void
    {
        Cache::put(
            "media:{$this->type}:{$this->endpoint}",
            [],
            now()->addMinutes(10)
        );
    }
}
