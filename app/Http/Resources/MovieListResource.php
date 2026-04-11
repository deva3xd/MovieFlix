<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MovieListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this['id'] ?? null,
            'title' => $this['title'] ?? null,
            'poster_path' => $this['poster_path'] ?? null,
            'backdrop_path' => $this['backdrop_path'] ?? null,
            'overview' => $this['overview'] ?? null,
            'release_date' => $this['release_date'] ?? null,
        ];
    }
}
