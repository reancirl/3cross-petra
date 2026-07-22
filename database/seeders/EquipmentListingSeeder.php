<?php

namespace Database\Seeders;

use App\Enums\ListingStatus;
use App\Models\EquipmentSubmission;
use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Seeds realistic listings through the real pipeline: each starts as a seller
 * submission, then a broker enriches and publishes it. No dummy JSON.
 */
class EquipmentListingSeeder extends Seeder
{
    public function run(): void
    {
        $seller = User::where('email', 'seller@example.com')->first()
            ?? User::factory()->seller()->create(['email' => 'seller@example.com']);

        $photo = $this->demoPhoto();

        foreach ($this->listings() as $index => $data) {
            $submission = $seller->equipmentSubmissions()->updateOrCreate(
                ['title' => $data['title']],
                [
                    'category' => $data['category'],
                    'region' => $data['region'],
                    'city' => $data['city'],
                    'condition' => $data['condition'],
                    'condition_notes' => $data['condition_notes'],
                    'asking_price' => $data['asking_price'],
                    'needs_valuation' => false,
                    'photos' => [$photo],
                    'status' => ListingStatus::UnderReview,
                ],
            );

            // Broker enrichment + publish.
            $submission->update([
                'public_id' => $submission->public_id ?? EquipmentSubmission::generatePublicId(),
                'manufacturer' => $data['manufacturer'],
                'model' => $data['model'],
                'year' => $data['year'],
                'capacity' => $data['capacity'],
                'public_description' => $data['public_description'],
                'featured' => $data['featured'],
                'status' => $data['status'],
                'published_at' => now()->subDays($index),
                'sold_at' => $data['status'] === ListingStatus::Sold ? now()->subDays($index) : null,
            ]);
        }
    }

    /**
     * Demo listings reuse the bundled hero image, which is served straight from
     * public/ — no storage symlink needed, so seeded cards render in any environment.
     *
     * @return array<string, mixed>
     */
    private function demoPhoto(): array
    {
        return [
            'name' => 'equipment-yard.png',
            'path' => 'images/petra-equipment-yard-hero.png',
            'url' => '/images/petra-equipment-yard-hero.png',
            'size' => null,
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function listings(): array
    {
        return [
            [
                'title' => '3-Phase Production Separator',
                'category' => 'Separators',
                'region' => 'Wyoming',
                'city' => 'Casper',
                'condition' => EquipmentSubmission::CONDITION_OPERATIONAL_BUT_IDLE,
                'condition_notes' => 'Pulled from production 2025, stored above grade.',
                'asking_price' => 42500,
                'manufacturer' => 'Production Package',
                'model' => 'Horizontal 3-phase',
                'year' => 2020,
                'capacity' => '36 in x 10 ft, 1440 WP',
                'public_description' => 'Field-proven 3-phase production separator with known service history, available for inspection-led redeployment across Wyoming and the Rockies.',
                'featured' => true,
                'status' => ListingStatus::Published,
            ],
            [
                'title' => 'Ariel JGK/4 Compressor Package',
                'category' => 'Compressors',
                'region' => 'North Dakota',
                'city' => 'Williston',
                'condition' => EquipmentSubmission::CONDITION_REMOVED_FROM_SERVICE,
                'condition_notes' => 'Low hours, recently pulled from gas lift service.',
                'asking_price' => 180000,
                'manufacturer' => 'Ariel',
                'model' => 'JGK/4',
                'year' => 2018,
                'capacity' => '3550 HP, 2-stage',
                'public_description' => 'Two-stage Ariel JGK/4 compressor package with low operating hours, suited for gas lift and gathering applications in the Bakken.',
                'featured' => true,
                'status' => ListingStatus::Published,
            ],
            [
                'title' => 'Storage Tank Battery (4 x 400 BBL)',
                'category' => 'Tanks & Tank Batteries',
                'region' => 'Colorado',
                'city' => 'Greeley',
                'condition' => EquipmentSubmission::CONDITION_OPERATING,
                'condition_notes' => 'Cleaned and internally coated fiberglass tanks.',
                'asking_price' => 96000,
                'manufacturer' => 'Fiberglass',
                'model' => '400 BBL Battery',
                'year' => 2019,
                'capacity' => '400 BBL x 4',
                'public_description' => 'Cleaned fiberglass tank battery with internal coating, ready for redeployment in Colorado energy corridors.',
                'featured' => false,
                'status' => ListingStatus::Published,
            ],
            [
                'title' => 'Vertical Heater Treater',
                'category' => 'Production Equipment',
                'region' => 'New Mexico',
                'city' => 'Hobbs',
                'condition' => EquipmentSubmission::CONDITION_OPERATIONAL_BUT_IDLE,
                'condition_notes' => 'Yard stored, minor external wear.',
                'asking_price' => 58000,
                'manufacturer' => 'Production Package',
                'model' => 'Vertical Treater',
                'year' => 2017,
                'capacity' => '4 ft x 20 ft',
                'public_description' => 'Vertical heater treater staged in a Permian-adjacent yard, positioned for operators sourcing verified production equipment.',
                'featured' => false,
                'status' => ListingStatus::Pending,
            ],
            [
                'title' => 'Reciprocating Pump Package',
                'category' => 'Pumps',
                'region' => 'Montana',
                'city' => 'Sidney',
                'condition' => EquipmentSubmission::CONDITION_NEEDS_REPAIR,
                'condition_notes' => 'Functional, recommend seal service before redeployment.',
                'asking_price' => 24000,
                'manufacturer' => 'Gardner Denver',
                'model' => 'Triplex',
                'year' => 2015,
                'capacity' => '165 GPM',
                'public_description' => 'Triplex reciprocating pump package available for inspection; a practical fit for operators comfortable with light seal service.',
                'featured' => false,
                'status' => ListingStatus::Sold,
            ],
        ];
    }
}
