<?php

namespace App\Http\Controllers\Portal;

use App\Enums\ThreadSide;
use App\Http\Controllers\Controller;
use App\Http\Requests\Portal\StoreMessageRequest;
use App\Models\Message;
use App\Models\Thread;
use App\Models\User;
use App\Support\MessageThreadService;
use App\Support\ThreadPresenter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * The customer side of messaging — one screen shared by the buyer and seller
 * portals, the way Portal\ProfileController is shared by all three.
 *
 * Every thread lookup goes through Thread::visibleTo, so a customer can only ever
 * reach their own rows. This is the codebase's existing "scope through the user"
 * pattern rather than fetch-then-check: an id that is not theirs 404s at the query,
 * with no branch that could be forgotten.
 */
class MessageThreadController extends Controller
{
    public const MESSAGES_PER_PAGE = 50;

    public function __construct(private readonly MessageThreadService $threads) {}

    public function index(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Portal/Messages', [
            'portal' => $this->portalData($user),
            'threads' => $this->threadList($user),
            'thread' => null,
            'messages' => null,
        ]);
    }

    /**
     * Thread list plus one open conversation. Rendered by the same component as
     * index so the mobile back-navigation is a plain Inertia visit between two
     * URLs rather than client-side view state.
     */
    public function show(Request $request, Thread $thread): Response
    {
        $user = $request->user();

        $thread = $this->authorizedThread($user, $thread->id);

        // Opening a thread marks it read. The badge and the list are re-serialized
        // below from the post-mark state, so the count drops in the same response.
        $thread->markReadFor(ThreadSide::User);

        return Inertia::render('Portal/Messages', [
            'portal' => $this->portalData($user),
            'threads' => $this->threadList($user),
            'thread' => ThreadPresenter::summary($thread, ThreadSide::User)
                + ['context' => ThreadPresenter::userContext($thread)],
            'messages' => $this->messagePage($thread, (int) $request->query('page', 1)),
        ]);
    }

    public function store(StoreMessageRequest $request, Thread $thread): RedirectResponse
    {
        $user = $request->user();

        $thread = $this->authorizedThread($user, $thread->id);

        $this->threads->postMessage(
            thread: $thread,
            sender: $user,
            side: ThreadSide::User,
            body: $request->validated('body'),
            attachments: $request->file('attachments', []),
        );

        return back()->with('status', 'Message sent.');
    }

    /**
     * Called when the open thread renders new messages during polling. Separate
     * from show() so the client can mark read without a full page visit.
     */
    public function markRead(Request $request, Thread $thread): RedirectResponse
    {
        $thread = $this->authorizedThread($request->user(), $thread->id);

        $thread->markReadFor(ThreadSide::User);

        return back();
    }

    /**
     * Resolve a thread the given customer is allowed to see, or 404.
     *
     * Takes an id rather than the bound model on purpose: route model binding has
     * already loaded the row by id alone, and re-resolving through the scope is
     * what makes another user's id indistinguishable from a nonexistent one.
     */
    private function authorizedThread(User $user, int $threadId): Thread
    {
        return Thread::query()
            ->visibleTo($user)
            ->with(['readMarkers', 'latestMessage'])
            ->whereKey($threadId)
            ->firstOrFail();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function threadList(User $user): array
    {
        return Thread::query()
            ->visibleTo($user)
            ->with(['readMarkers', 'latestMessage.attachments', 'subject'])
            ->orderByDesc('last_message_at')
            ->orderByDesc('id')
            ->get()
            ->map(fn (Thread $thread): array => ThreadPresenter::summary($thread, ThreadSide::User)
                + ['context' => ThreadPresenter::userContext($thread)])
            ->values()
            ->all();
    }

    /**
     * One page of messages, newest page first.
     *
     * The first server-side pagination in the app — a long-running support thread
     * is the one place returning the whole collection genuinely does not hold.
     * Page 1 is the newest 50; the client reverses each page for display so the
     * conversation still reads oldest-to-newest on screen.
     *
     * @return array<string, mixed>
     */
    private function messagePage(Thread $thread, int $page): array
    {
        $paginator = $thread->messages()
            ->with(['attachments', 'sender'])
            ->orderByDesc('id')
            ->paginate(self::MESSAGES_PER_PAGE, ['*'], 'page', max($page, 1));

        return [
            'items' => collect($paginator->items())
                ->map(fn (Message $message): array => ThreadPresenter::message($message, ThreadSide::User))
                ->reverse()
                ->values()
                ->all(),
            'currentPage' => $paginator->currentPage(),
            'lastPage' => $paginator->lastPage(),
            'total' => $paginator->total(),
            'hasOlder' => $paginator->currentPage() < $paginator->lastPage(),
        ];
    }

    /**
     * @return array<string, mixed>
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
