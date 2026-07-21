<?php

namespace App\Http\Middleware;

use App\Models\Thread;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'appName' => config('app.name'),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'company_name' => $user->company_name,
                    'user_type' => $user->user_type,
                    'user_type_label' => $user->userTypeLabel(),
                    'dashboard_url' => route($user->portalRouteName()),
                ] : null,
            ],
            'status' => $request->session()->get('status'),
            // Phone/email/hours/service area for the Talk to a Broker sidebar. A plain
            // config read, so it costs nothing to share app-wide and any page that needs
            // to print a contact detail can, without a controller passing it down.
            'siteContact' => config('petra.contact'),
            // The Messages nav badge. A closure so guests and public marketplace
            // pages never pay for the query, and so the 45s poll can refresh it on
            // its own via router.reload({ only: ['unreadMessageThreads'] }) without
            // re-serializing the whole page.
            //
            // It is one indexed EXISTS-per-thread aggregate on every authed request.
            // That is affordable at the current scale and consistent with how the
            // rest of the portal loads data; if the inbox ever grows past a few
            // thousand threads this is the first thing to turn into a cached counter.
            'unreadMessageThreads' => fn (): int => $user === null
                ? 0
                : Thread::unreadThreadCountFor($user),
        ];
    }
}
