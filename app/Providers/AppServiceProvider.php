<?php

namespace App\Providers;

use App\Enums\ThreadSubjectType;
use App\Models\EquipmentRequest;
use App\Models\EquipmentSubmission;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Threads store 'listing' / 'buyer_request' in subject_type rather than a
        // fully-qualified class name, so the column stays readable and survives a
        // model rename. morphMap (not enforceMorphMap) because nothing else in the
        // app is polymorphic and we do not want to break future morphs that opt out.
        Relation::morphMap([
            ThreadSubjectType::Listing->value => EquipmentSubmission::class,
            ThreadSubjectType::BuyerRequest->value => EquipmentRequest::class,
        ]);
    }
}
