<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}

// "id" => $this['id'],
// "title" => $this['title'],
// "poster_path" => $this['poster_path'],
// "backdrop_path" => $this['backdrop_path'],
// "vote_average" => $this['vote_average'],
// "original_language" => $this['original_language'],
// "release_date" => $this['release_date'],
// "genres" => $this['genres'],
// "popularity" => $this['popularity'],
// "overview" => $this['overview']
