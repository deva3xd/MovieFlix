<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TvDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $tv = is_array($this->resource) ? $this->resource : [];

        return [
            'id' => $tv['id'] ?? null,
            'name' => $tv['name'] ?? null,
            'poster_path' => $tv['poster_path'] ?? null,
            'backdrop_path' => $tv['backdrop_path'] ?? null,
            'overview' => $tv['overview'] ?? null,
            'first_air_date' => $tv['first_air_date'] ?? null,
            'genres' => $tv['genres'] ?? [],
            'vote_average' => $tv['vote_average'] ?? null,
            'original_language' => $tv['original_language'] ?? null,
            'episode_run_time' => $tv['episode_run_time'] ?? null,
        ];
    }
}
