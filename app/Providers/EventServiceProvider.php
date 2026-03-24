<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Automatically discover events & listeners.
     */
    public function shouldDiscoverEvents(): bool
    {
        return true;
    }
}