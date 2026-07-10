<?php

namespace App\Listeners;

use App\Events\MediaCacheMissed;
use App\Jobs\FetchMediaJob;

class MediaCacheMissedListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MediaCacheMissed $event): void
    {
        FetchMediaJob::dispatchSync($event->type, $event->endpoint);
    }
}
