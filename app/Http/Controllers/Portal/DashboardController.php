<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request, string $userType): Response
    {
        return Inertia::render('Portal/Dashboard', [
            'portal' => $this->portalData($request, $userType),
        ]);
    }

    public function placeholder(Request $request, string $section, string $userType): Response
    {
        return Inertia::render('Portal/Placeholder', [
            'portal' => $this->portalData($request, $userType),
            'section' => $section,
        ]);
    }

    /**
     * @return array<string, string>
     */
    private function portalData(Request $request, string $userType): array
    {
        $role = $userType === User::TYPE_SELLER ? 'Seller' : 'Buyer';

        return [
            'userType' => $userType,
            'roleLabel' => $role,
            'dashboardUrl' => route("portal.{$userType}.dashboard"),
            'summary' => $userType === User::TYPE_SELLER
                ? 'Your seller activity will appear here as listings, quotes, and offer workflows come online.'
                : 'Your buyer activity will appear here as watched equipment, quotes, and offer workflows come online.',
            'profileName' => $request->user()->name,
        ];
    }
}
