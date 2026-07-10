<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TvListResource extends JsonResource
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
            'first_air_date' => $tv['first_air_date'] ?? null,
        ];
    }
}
