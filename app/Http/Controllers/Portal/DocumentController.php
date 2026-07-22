<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Support\DocumentPresenter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * The customer Documents hub, shared by the buyer and seller portals.
 *
 * One controller for both, because the access question is identical — it is
 * Document::scopeVisibleTo, which already knows the difference between a seller
 * looking at their own listing and a buyer looking at one they inquired on. Splitting
 * it per role would mean two places to forget a rule.
 *
 * Read-only in v1: no upload, no delete, no rename. Customers receive documents here;
 * they send files by attaching them to a message, which is a conversation and belongs
 * in one.
 */
class DocumentController extends Controller
{
    public function index(Request $request, string $userType): Response
    {
        $user = $request->user();

        $groups = DocumentPresenter::groupedForUser($user);

        // Stamped after the payload is built, so documents added before this request
        // still render with their "new" badge on the visit that clears it. Marking
        // first would mean the user is told there is something new and then shown a
        // page with nothing highlighted.
        $user->markDocumentsViewed();

        return Inertia::render('Portal/Documents', [
            'portal' => [
                'userType' => $userType,
                'roleLabel' => $userType === User::TYPE_SELLER ? 'Seller' : 'Buyer',
                'dashboardUrl' => route("portal.{$userType}.dashboard"),
                'profileName' => $user->name,
            ],
            'groups' => $groups,
        ]);
    }
}
