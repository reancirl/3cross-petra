<?php

namespace App\Support;

use App\Models\EquipmentSubmission;

/**
 * The public submission form's location dropdown, and the mapping from what a seller picks
 * back onto the listing's region + Wyoming sub-region columns.
 *
 * The content doc presents locations the way a seller thinks about them ("Powder River",
 * "North Dakota (Bakken)"), which is finer-grained inside Wyoming and coarser outside it
 * than the stored REGIONS vocabulary. This class is the single seam between the two, so the
 * form, its validation, and the controller can never disagree about what an option means.
 *
 * One deliberate divergence from the doc: its combined "Utah & New Mexico Producing Regions"
 * option is split in two, because Utah and New Mexico are separate stored regions and a
 * listing has to land in exactly one. Flagged for client sign-off.
 */
class PublicLocationOptions
{
    public const GROUP_WYOMING = 'Wyoming Oilfields';

    public const GROUP_OTHER = 'Other Regions';

    /**
     * @return array<int, array{value: string, label: string, group: string, region: string, wyoming_subregion: string|null}>
     */
    public static function all(): array
    {
        return [
            self::option('wyoming_powder_river', 'Powder River', self::GROUP_WYOMING, 'Wyoming', 'powder_river'),
            self::option('wyoming_jonah', 'Jonah', self::GROUP_WYOMING, 'Wyoming', 'jonah'),
            self::option('wyoming_green_river_basin', 'Green River Basin', self::GROUP_WYOMING, 'Wyoming', 'green_river_basin'),
            self::option('wyoming_other', 'Wyoming — Other Areas', self::GROUP_WYOMING, 'Wyoming', null),
            self::option('north_dakota', 'North Dakota (Bakken)', self::GROUP_OTHER, 'North Dakota', null),
            self::option('colorado', 'Colorado Energy Corridors', self::GROUP_OTHER, 'Colorado', null),
            self::option('utah', 'Utah Producing Regions', self::GROUP_OTHER, 'Utah', null),
            self::option('new_mexico', 'New Mexico Producing Regions', self::GROUP_OTHER, 'New Mexico', null),
            self::option('montana', 'Montana Industrial Yards', self::GROUP_OTHER, 'Montana', null),
            self::option('other', 'Regional Surplus Equipment Yards & Private Sellers', self::GROUP_OTHER, 'Other', null),
        ];
    }

    /**
     * Accepted form values, for the validation rule.
     *
     * @return array<int, string>
     */
    public static function values(): array
    {
        return array_column(self::all(), 'value');
    }

    /**
     * Resolve a submitted option onto the columns a listing actually stores. Falls back to
     * the catch-all region so an unknown value can never write a null into region.
     *
     * @return array{region: string, wyoming_subregion: string|null}
     */
    public static function resolve(?string $value): array
    {
        foreach (self::all() as $option) {
            if ($option['value'] === $value) {
                return [
                    'region' => $option['region'],
                    'wyoming_subregion' => $option['wyoming_subregion'],
                ];
            }
        }

        return [
            'region' => EquipmentSubmission::REGION_FALLBACK,
            'wyoming_subregion' => null,
        ];
    }

    /**
     * @return array{value: string, label: string, group: string, region: string, wyoming_subregion: string|null}
     */
    private static function option(string $value, string $label, string $group, string $region, ?string $subregion): array
    {
        return [
            'value' => $value,
            'label' => $label,
            'group' => $group,
            'region' => $region,
            'wyoming_subregion' => $subregion,
        ];
    }
}
