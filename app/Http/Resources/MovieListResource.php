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
            'id' => $this['id'],
            'title' => $this['title'],
            'poster_path' => $this['poster_path'],
            'backdrop_path' => $this['backdrop_path'],
            'overview' => $this['overview'],
            'release_date' => $this['release_date']
        ];
    }
}