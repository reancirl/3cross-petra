<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * The in-app notification feed, for all three portals.
 *
 * One controller rather than a customer/broker pair because the only difference between
 * a seller's feed and the broker's is which rows it scopes to, and that lives in
 * Notification::scopeForRecipient — a broker reads the shared broker feed, a customer
 * reads their own. Everything else (pagination, deep links, mark-read) is identical, and
 * the scope is the whole authorization boundary: a request can only ever touch rows in
 * the caller's own feed.
 */
class NotificationController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $paginator = Notification::query()
            ->forRecipient($user)
            // The broker feed is unread-first — staff triage a queue. A customer's feed
            // is a plain reverse chronology; the unread dot marks what is new.
            ->when($user->isBroker(), fn ($query) => $query->orderByRaw('read_at is null desc'))
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->paginate(Notification::PER_PAGE)
            ->withQueryString();

        return Inertia::render('Portal/Notifications', [
            'portal' => $this->portalData($user),
            'notifications' => [
                'items' => collect($paginator->items())
                    ->map(fn (Notification $notification): array => $this->serialize($notification, $user))
                    ->all(),
                'currentPage' => $paginator->currentPage(),
                'lastPage' => $paginator->lastPage(),
                'total' => $paginator->total(),
            ],
        ]);
    }

    /**
     * Mark one notification read. The scope makes a foreign id a 404 rather than a
     * cross-account write — a buyer cannot clear a seller's dot.
     */
    public function markRead(Request $request, Notification $notification): RedirectResponse
    {
        $this->authorizeAccess($request->user(), $notification);

        $notification->markRead();

        return back();
    }

    public function markAllRead(Request $request): RedirectResponse
    {
        Notification::query()
            ->forRecipient($request->user())
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return back();
    }

    private function authorizeAccess(User $user, Notification $notification): void
    {
        abort_unless(
            Notification::query()->forRecipient($user)->whereKey($notification->id)->exists(),
            404,
        );
    }

    /**
     * @return array<string, mixed>
     */
    private function serialize(Notification $notification, User $user): array
    {
        return [
            'id' => $notification->id,
            'type' => $notification->type,
            'icon' => $notification->notificationType()->icon(),
            'title' => $notification->title,
            'url' => $notification->deepLinkFor($user),
            'isRead' => $notification->isRead(),
            'createdAt' => $notification->created_at?->toIso8601String(),
        ];
    }

    /**
     * @return array<string, string>
     */
    private function portalData(User $user): array
    {
        return [
            'userType' => $user->user_type,
            'roleLabel' => $user->userTypeLabel(),
            'dashboardUrl' => route($user->portalRouteName()),
            'profileName' => $user->name,
        ];
    }
}
