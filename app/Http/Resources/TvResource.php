<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TvResource extends JsonResource
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
            'name' => $this['name'],
            'poster_path' => $this['poster_path'],
            'backdrop_path' => $this['backdrop_path'],
            'overview' => $this['overview'],
            'first_air_date' => $this['first_air_date']
        ];
    }
}
