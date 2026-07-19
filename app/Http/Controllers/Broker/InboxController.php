<?php

namespace App\Http\Controllers\Broker;

use App\Enums\ListingStatus;
use App\Enums\ThreadSide;
use App\Enums\ThreadStatus;
use App\Enums\ThreadSubjectType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Portal\StoreMessageRequest;
use App\Models\CannedResponse;
use App\Models\EquipmentRequest;
use App\Models\EquipmentSubmission;
use App\Models\Message;
use App\Models\Thread;
use App\Models\User;
use App\Support\MessageThreadService;
use App\Support\ThreadPresenter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

/**
 * The broker inbox: every thread in the system, from both buyers and sellers.
 *
 * Brokers are staff and deliberately have no ownership filter — the route group's
 * user.type:broker middleware is the whole authorization story here, the same as
 * the existing SubmissionReviewController.
 */
class InboxController extends Controller
{
    public const MESSAGES_PER_PAGE = 50;

    public function __construct(private readonly MessageThreadService $threads) {}

    public function index(Request $request): Response
    {
        return Inertia::render('Broker/Inbox', [
            'portal' => $this->portalData($request->user()),
            'threads' => $this->threadList($request),
            'thread' => null,
            'messages' => null,
            'context' => null,
            'cannedResponses' => $this->cannedResponses(),
            'filters' => $this->activeFilters($request),
            'filterOptions' => $this->filterOptions(),
        ]);
    }

    public function show(Request $request, Thread $thread): Response
    {
        $thread->load(['readMarkers', 'latestMessage', 'user', 'subject']);

        $thread->markReadFor(ThreadSide::Broker);

        return Inertia::render('Broker/Inbox', [
            'portal' => $this->portalData($request->user()),
            'threads' => $this->threadList($request),
            'thread' => ThreadPresenter::inboxSummary($thread),
            'messages' => $this->messagePage($thread, (int) $request->query('page', 1)),
            'context' => ThreadPresenter::brokerContext($thread),
            'cannedResponses' => $this->cannedResponses(),
            'filters' => $this->activeFilters($request),
            'filterOptions' => $this->filterOptions(),
        ]);
    }

    public function store(StoreMessageRequest $request, Thread $thread): RedirectResponse
    {
        $this->threads->postMessage(
            thread: $thread,
            sender: $request->user(),
            side: ThreadSide::Broker,
            body: $request->validated('body'),
            attachments: $request->file('attachments', []),
        );

        return back()->with('status', 'Reply sent.');
    }

    public function markRead(Request $request, Thread $thread): RedirectResponse
    {
        $thread->markReadFor(ThreadSide::Broker);

        return back();
    }

    /**
     * Close or reopen a thread. Broker-only — a customer cannot close their own
     * ticket, and any new message reopens it regardless (Thread::recordMessage).
     */
    public function updateStatus(Request $request, Thread $thread): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in([ThreadStatus::Open->value, ThreadStatus::Closed->value])],
        ]);

        $thread->forceFill(['status' => $validated['status']])->save();

        return back()->with(
            'status',
            $validated['status'] === ThreadStatus::Closed->value ? 'Thread closed.' : 'Thread reopened.',
        );
    }

    /**
     * Start a thread from a submission or buyer request the broker is looking at.
     *
     * The subject's owner becomes the customer side — a broker cannot start a
     * conversation between two customers, because the thread's user_id is always
     * taken from the subject rather than supplied by the request.
     */
    public function storeThread(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'subject_type' => ['required', Rule::in(array_column(ThreadSubjectType::cases(), 'value'))],
            'subject_id' => ['required', 'integer'],
            'body' => ['required', 'string', 'max:5000'],
        ]);

        $subjectType = ThreadSubjectType::from($validated['subject_type']);

        $subject = $subjectType->modelClass()::query()->find($validated['subject_id']);

        abort_if($subject === null, 404);

        $owner = $subject->user;

        abort_if($owner === null, 404);

        $thread = $this->threads->findOrCreateThread($owner, $subject);

        $this->threads->postMessage(
            thread: $thread,
            sender: $request->user(),
            side: ThreadSide::Broker,
            body: $validated['body'],
        );

        return redirect("/broker/inbox/{$thread->id}")->with('status', 'Message sent.');
    }

    /**
     * Unread first, then most recent activity.
     *
     * The unread flag is computed in SQL rather than in PHP after the fact so the
     * ordering is the database's job and stays correct as the inbox grows past one
     * page. Everything else the row needs is eager-loaded — without the `subject`
     * and `latestMessage` loads this would be four queries per thread.
     *
     * @return array<int, array<string, mixed>>
     */
    private function threadList(Request $request): array
    {
        $filters = $this->activeFilters($request);

        $query = Thread::query()
            ->with(['readMarkers', 'latestMessage.attachments', 'user', 'subject'])
            ->select('threads.*')
            ->selectRaw(
                '(case when exists ('
                .' select 1 from messages'
                ."  where messages.thread_id = threads.id and messages.sender_type = '".ThreadSide::User->value."'"
                .'  and messages.id > coalesce((select last_read_message_id from thread_read_markers'
                ."   where thread_read_markers.thread_id = threads.id and thread_read_markers.side = '".ThreadSide::Broker->value."'), 0)"
                .' ) then 1 else 0 end) as has_unread',
            )
            ->orderByDesc('has_unread')
            ->orderByDesc('last_message_at')
            ->orderByDesc('id');

        if ($filters['unreadOnly']) {
            $query->havingUnreadFor(ThreadSide::Broker);
        }

        if ($filters['subjectType'] !== null) {
            $query->where('subject_type', $filters['subjectType']);
        }

        if ($filters['listingStatus'] !== null) {
            $this->constrainToListingStatus($query, $filters['listingStatus']);
        }

        return $query->get()
            ->map(fn (Thread $thread): array => ThreadPresenter::inboxSummary($thread))
            ->values()
            ->all();
    }

    /**
     * Restrict to listing threads whose listing currently holds a given status.
     *
     * Only listing threads can match, so this doubles as a subject_type filter —
     * a buyer-request thread has no listing status to compare against.
     *
     * @param  Builder<Thread>  $query
     */
    private function constrainToListingStatus(Builder $query, string $status): void
    {
        $query->where('subject_type', ThreadSubjectType::Listing->value)
            ->whereIn('subject_id', EquipmentSubmission::query()
                ->where('status', $status)
                ->select('id'));
    }

    /**
     * @return array{unreadOnly: bool, subjectType: string|null, listingStatus: string|null}
     */
    private function activeFilters(Request $request): array
    {
        $subjectType = $request->query('subject_type');
        $listingStatus = $request->query('listing_status');

        return [
            'unreadOnly' => $request->boolean('unread_only'),
            'subjectType' => in_array($subjectType, array_column(ThreadSubjectType::cases(), 'value'), true)
                ? $subjectType
                : null,
            'listingStatus' => in_array($listingStatus, array_column(ListingStatus::cases(), 'value'), true)
                ? $listingStatus
                : null,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function filterOptions(): array
    {
        return [
            'subjectTypes' => ThreadSubjectType::options(),
            'listingStatuses' => ListingStatus::options(),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function cannedResponses(): array
    {
        return CannedResponse::query()
            ->ordered()
            ->get()
            ->map(fn (CannedResponse $response): array => [
                'id' => $response->id,
                'title' => $response->title,
                'body' => $response->body,
            ])
            ->values()
            ->all();
    }

    /**
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
                ->map(fn (Message $message): array => ThreadPresenter::message($message, ThreadSide::Broker))
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
            'userType' => User::TYPE_BROKER,
            'roleLabel' => 'Broker',
            'dashboardUrl' => route('broker.submissions'),
            'profileName' => $user->name,
        ];
    }
}
