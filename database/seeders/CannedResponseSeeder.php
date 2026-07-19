<?php

namespace Database\Seeders;

use App\Models\CannedResponse;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

/**
 * The five default broker replies.
 *
 * Keyed on title with updateOrCreate so re-running the seeder is idempotent. Only
 * `position` is force-updated: the body is deliberately left alone on re-run,
 * because brokers can edit these from the inbox and a seeder should not silently
 * revert their wording.
 */
class CannedResponseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        foreach ($this->responses() as $position => $response) {
            $existing = CannedResponse::query()->where('title', $response['title'])->first();

            if ($existing !== null) {
                $existing->forceFill(['position' => $position])->save();

                continue;
            }

            CannedResponse::create($response + ['position' => $position]);
        }
    }

    /**
     * @return array<int, array{title: string, body: string}>
     */
    private function responses(): array
    {
        return [
            [
                'title' => 'Request data-plate photos',
                'body' => "Thanks for the details. Could you send a clear photo of the data plate or nameplate? "
                    ."We need the model and serial number to confirm the specs before we take this to buyers.",
            ],
            [
                'title' => 'Request more photos',
                'body' => "Could you send a few more photos when you get a chance? Wide shots of all four sides, "
                    ."plus anything that shows wear or damage, help us represent the unit accurately.",
            ],
            [
                'title' => 'Confirm availability',
                'body' => "Checking in to confirm this unit is still available and the details we have on file are "
                    ."current. Let us know either way and we'll update the listing.",
            ],
            [
                'title' => 'Request location and access details',
                'body' => "Where is the equipment currently located, and what does site access look like? "
                    ."We'd like to know whether a buyer can inspect it and what's involved in loading it out.",
            ],
            [
                'title' => 'Closing follow-up',
                'body' => "We're wrapping up on our end. If anything else comes up on this one, reply here and "
                    ."the thread reopens — otherwise we'll be in touch when there's news.",
            ],
        ];
    }
}
