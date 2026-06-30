<?php

namespace App\Jobs;

use App\Http\Resources\MovieListResource;
use App\Http\Resources\TvListResource;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
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
    public array $backoff = [10, 30, 60];

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

            return;
        }

        try {
            $response = $this->tmdbRequest($key)
                ->get("{$url}/{$this->type}/{$this->endpoint}", $this->queryParameters($key))
                ->throw();
        } catch (ConnectionException|RequestException $exception) {
            Log::warning('TMDB media fetch failed.', [
                'type' => $this->type,
                'endpoint' => $this->endpoint,
                'message' => $exception->getMessage(),
            ]);

            throw $exception;
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
