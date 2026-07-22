<?php

namespace App\Support;

use App\Enums\DocumentVisibility;
use App\Enums\ThreadSubjectType;
use App\Models\Document;
use App\Models\EquipmentRequest;
use App\Models\EquipmentSubmission;
use App\Models\MessageAttachment;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * The single place documents become JSON, and the seam where the three historic file
 * stores are made to look like one list.
 *
 * Two of the three now live in the documents table (listing documents were migrated
 * there; broker uploads are written there directly). The third — message attachments —
 * stays in its own table because it is owned by a message and cascade-deletes with it,
 * so it is unioned in here at read time rather than copied. Both kinds serialize to the
 * same shape with a differing `source` label, which is what lets one component render
 * the broker's unified view.
 *
 * Modelled on ThreadPresenter, and it carries the same rule: a broker's identity is
 * never sent to a customer. Petra uploads are credited to "Petra", never to a person.
 */
class DocumentPresenter
{
    /**
     * One document row.
     *
     * `forBroker` widens the payload rather than narrowing it — visibility, the archived
     * flag and the real uploader name are internal, and a customer must never receive
     * them. Defaulting to the customer shape means a new caller leaks nothing by
     * forgetting the argument.
     *
     * @return array<string, mixed>
     */
    public static function item(Document $document, bool $forBroker = false): array
    {
        $base = [
            // Namespaced because the broker view interleaves two tables whose ids
            // collide. Used as the React key and nothing else — the download route
            // still takes the real id.
            'key' => "doc-{$document->id}",
            'name' => $document->original_name,
            'mime' => $document->mime,
            'size' => $document->size,
            'isImage' => $document->isPreviewable(),
            'available' => $document->fileExists(),
            // A route, not a stored URL. The bytes are on the private disk and only the
            // download endpoint may hand them out, after checking access and logging.
            'url' => route('documents.download', $document),
            'addedBy' => $document->isFromBroker() ? 'Petra' : ($document->uploader?->name ?? 'Seller'),
            'source' => $document->isFromBroker() ? 'broker_upload' : 'submission_upload',
            'sourceLabel' => $document->isFromBroker() ? 'Broker upload' : 'Submission upload',
            'createdAt' => $document->created_at?->toIso8601String(),
            'createdAtLabel' => $document->created_at?->toFormattedDateString(),
            // Safe on the customer side and genuinely useful there: a seller looking at
            // their own listing needs to know which of their files buyers can read. The
            // full visibility value stays broker-only — "not public" covers both
            // private_broker and shared_user, and the difference is Petra's business.
            'isPublic' => $document->documentVisibility() === DocumentVisibility::PublicListing,
        ];

        if (! $forBroker) {
            return $base;
        }

        return $base + [
            'id' => $document->id,
            'visibility' => $document->documentVisibility()->value,
            'visibilityLabel' => $document->documentVisibility()->label(),
            'visibilityTone' => $document->documentVisibility()->tone(),
            'sharedWith' => $document->sharedWithUser?->name,
            'archived' => $document->isArchived(),
            'archiveUrl' => route('broker.documents.archive', $document),
            'downloadCount' => $document->downloadLogs()->count(),
        ];
    }

    /**
     * A message attachment wearing the same shape, for the broker's unified view.
     *
     * Broker-only by construction: it is reached through a thread, and the customer
     * side already sees these in the conversation itself. Surfacing them in the
     * customer's Documents hub as well would double-list the same file.
     *
     * @return array<string, mixed>
     */
    public static function messageAttachmentItem(MessageAttachment $attachment): array
    {
        $message = $attachment->message;
        $fromBroker = $message?->isFromBroker() === true;

        return [
            'key' => "msg-{$attachment->id}",
            'id' => $attachment->id,
            'name' => $attachment->name,
            'mime' => $attachment->mime,
            'size' => $attachment->size,
            'isImage' => $attachment->isPreviewable(),
            'available' => true,
            // The existing authorizing route, unchanged. Thread access is the right
            // question for a file that lives inside a conversation.
            'url' => route('messages.attachments.show', $attachment),
            'addedBy' => $fromBroker ? 'Petra' : ($message?->sender?->name ?? 'Customer'),
            'source' => 'message_attachment',
            'sourceLabel' => 'Message attachment',
            'createdAt' => $attachment->created_at?->toIso8601String(),
            'createdAtLabel' => $attachment->created_at?->toFormattedDateString(),
            'isPublic' => false,
            // Attachments carry no visibility of their own — the thread decides who
            // may read them — and there is nothing here to archive.
            'visibility' => null,
            'visibilityLabel' => 'In thread',
            'visibilityTone' => 'neutral',
            'sharedWith' => $message?->thread?->user?->name,
            'archived' => false,
            'archiveUrl' => null,
            'downloadCount' => null,
        ];
    }

    /**
     * The customer hub: every document this user may see, grouped by what it is about.
     *
     * Grouping happens here rather than in the component because the group header
     * carries the subject's live status badge, which only the server can resolve.
     *
     * @return array<int, array<string, mixed>>
     */
    public static function groupedForUser(User $user): array
    {
        $documents = Document::query()
            ->visibleTo($user)
            ->with(['uploader', 'subject'])
            ->orderByDesc('created_at')
            ->get();

        $lastViewedAt = $user->documents_last_viewed_at;

        return $documents
            ->groupBy(fn (Document $document): string => "{$document->subject_type}:{$document->subject_id}")
            ->map(function (EloquentCollection $group) use ($lastViewedAt): array {
                /** @var Document $first */
                $first = $group->first();

                return self::subjectGroup($first, $group->map(
                    fn (Document $document): array => self::item($document) + [
                        // "Added by Petra" / "Added by you" is the customer-facing
                        // credit; the raw uploader name is never sent to them.
                        'addedByLabel' => $document->isFromBroker() ? 'Added by Petra' : 'Added by you',
                        // Unseen since the last visit to this page. Computed server-side
                        // so the badge and the count in the sidebar cannot disagree.
                        'isNew' => $lastViewedAt === null
                            || ($document->created_at !== null && $document->created_at->gt($lastViewedAt)),
                    ],
                )->values()->all());
            })
            // Most recently touched subject first, so a document Petra added this
            // morning is at the top rather than buried under an old listing.
            ->sortByDesc('latestAt')
            ->values()
            ->all();
    }

    /**
     * Everything on one subject, from every source, for the broker's Documents tab.
     *
     * @return array<int, array<string, mixed>>
     */
    public static function forBrokerSubject(Model $subject): array
    {
        $subjectType = self::subjectTypeFor($subject)->value;

        $documents = Document::query()
            ->forSubject($subjectType, (int) $subject->getKey())
            ->with(['uploader', 'sharedWithUser'])
            ->get()
            ->map(fn (Document $document): array => self::item($document, forBroker: true));

        return $documents
            ->concat(self::messageAttachmentsFor($subjectType, (int) $subject->getKey()))
            ->sortByDesc('createdAt')
            ->values()
            ->all();
    }

    /**
     * Broker unified views for many subjects at once, so a queue page costs two
     * queries rather than two per row.
     *
     * @param  EloquentCollection<int, Model>  $subjects
     * @return array<int, array<int, array<string, mixed>>> keyed by subject id
     */
    public static function forBrokerSubjects(EloquentCollection $subjects, ThreadSubjectType $subjectType): array
    {
        if ($subjects->isEmpty()) {
            return [];
        }

        $ids = $subjects->modelKeys();

        $documents = Document::query()
            ->where('subject_type', $subjectType->value)
            ->whereIn('subject_id', $ids)
            ->with(['uploader', 'sharedWithUser'])
            ->get()
            ->map(fn (Document $document): array => self::item($document, forBroker: true) + [
                'subjectId' => (int) $document->subject_id,
            ]);

        $attachments = self::messageAttachmentsFor($subjectType->value, $ids);

        return $documents
            ->concat($attachments)
            ->groupBy('subjectId')
            ->map(fn (Collection $group): array => $group
                ->sortByDesc('createdAt')
                ->map(fn (array $item): array => collect($item)->except('subjectId')->all())
                ->values()
                ->all())
            ->all();
    }

    /**
     * Attachments on every thread anchored to the given subject(s).
     *
     * One query with a join rather than walking threads → messages → attachments, so
     * the broker queue does not pay N+1 for a panel most rows never open.
     *
     * @param  int|array<int, int>  $subjectIds
     * @return Collection<int, array<string, mixed>>
     */
    private static function messageAttachmentsFor(string $subjectType, int|array $subjectIds): Collection
    {
        $ids = is_array($subjectIds) ? $subjectIds : [$subjectIds];

        return MessageAttachment::query()
            ->with(['message.sender', 'message.thread.user'])
            ->join('messages', 'messages.id', '=', 'message_attachments.message_id')
            ->join('threads', 'threads.id', '=', 'messages.thread_id')
            ->where('threads.subject_type', $subjectType)
            ->whereIn('threads.subject_id', $ids)
            ->select('message_attachments.*', 'threads.subject_id as thread_subject_id')
            ->get()
            ->map(fn (MessageAttachment $attachment): array => self::messageAttachmentItem($attachment) + [
                'subjectId' => (int) $attachment->thread_subject_id,
            ]);
    }

    /**
     * Group header for the customer hub: what this pile of documents is about, with the
     * subject's own status badge and a link through to it.
     *
     * Deliberately narrower than the broker's context panel — a buyer must not learn a
     * seller's asking price from a document group header, the same rule
     * ThreadPresenter::userContext enforces on the messaging screens.
     *
     * @param  array<int, array<string, mixed>>  $documents
     * @return array<string, mixed>
     */
    private static function subjectGroup(Document $sample, array $documents): array
    {
        $subject = $sample->subject;
        $latestAt = collect($documents)->max('createdAt');

        if ($subject instanceof EquipmentSubmission) {
            return [
                'key' => "listing:{$sample->subject_id}",
                'kind' => ThreadSubjectType::Listing->value,
                'kindLabel' => 'Listing',
                'title' => $subject->title,
                'statusLabel' => $subject->statusLabel(),
                'statusTone' => $subject->listingStatus()->tone(),
                'documents' => $documents,
                'latestAt' => $latestAt,
            ];
        }

        if ($subject instanceof EquipmentRequest) {
            return [
                'key' => "buyer_request:{$sample->subject_id}",
                'kind' => ThreadSubjectType::BuyerRequest->value,
                'kindLabel' => $subject->isQuoteInquiry() ? 'Quote' : 'Request',
                'title' => $subject->equipment_type,
                'statusLabel' => $subject->statusLabel(),
                'statusTone' => 'neutral',
                'documents' => $documents,
                'latestAt' => $latestAt,
            ];
        }

        // The subject row was deleted out from under its documents. Degrade to a stub
        // rather than dropping the files out of the hub with no explanation.
        return [
            'key' => "{$sample->subject_type}:{$sample->subject_id}",
            'kind' => $sample->subject_type,
            'kindLabel' => 'Archived',
            'title' => 'Subject no longer available',
            'statusLabel' => 'Unavailable',
            'statusTone' => 'muted',
            'documents' => $documents,
            'latestAt' => $latestAt,
        ];
    }

    public static function subjectTypeFor(Model $subject): ThreadSubjectType
    {
        return match (true) {
            $subject instanceof EquipmentSubmission => ThreadSubjectType::Listing,
            $subject instanceof EquipmentRequest => ThreadSubjectType::BuyerRequest,
            default => throw new \InvalidArgumentException(
                'Documents can only hang off a listing or a buyer request, got '.$subject::class,
            ),
        };
    }

    /**
     * What a subject is called in an email subject line and a group header.
     */
    public static function subjectTitle(?Model $subject): string
    {
        return match (true) {
            $subject instanceof EquipmentSubmission => $subject->title,
            $subject instanceof EquipmentRequest => $subject->equipment_type,
            default => 'your account',
        };
    }
}
