<?php

namespace App\Jobs;

use App\Http\Resources\MovieListResource;
use App\Http\Resources\TvListResource;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FetchMediaJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public string $type;
    public string $endpoint;

    public function __construct(string $type, string $endpoint)
    {
        $this->type = $type;
        $this->endpoint = $endpoint;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $url = config('services.tmdb.url');
        $key = config('services.tmdb.key');
        
        $response = Http::get("$url/{$this->type}/{$this->endpoint}", ['api_key' => $key]);
        $results = $response->json()['results'] ?? [];

        $data = match ($this->type) {
            'movie' => MovieListResource::collection($results)->resolve(),
            'tv' => TvListResource::collection($results)->resolve(),
        };

        Cache::put(
            "media:{$this->type}:{$this->endpoint}",
            $data,
            now()->addHour()
        );
    }
}
