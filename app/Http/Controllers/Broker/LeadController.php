<?php

namespace App\Http\Controllers\Broker;

use App\Http\Controllers\Controller;
use App\Http\Requests\Broker\UpdateBrokerInquiryStatusRequest;
use App\Models\BrokerInquiry;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * The Leads queue: Talk to a Broker inquiries from the public Sell Equipment section.
 *
 * Deliberately separate from the seller and buyer queues. Those hold records with a
 * lifecycle — a listing to publish, a request to source against. A lead is a question from
 * someone who may have nothing else in the system, so all it needs is contact details, the
 * message, and a New → Contacted → Closed status a broker moves by hand.
 *
 * Unclaimed public *submissions* do not appear here — they go to the seller queue, which
 * owns the review, publish and offer tooling they need (see SubmissionReviewController).
 */
class LeadController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Broker/Leads', [
            'portal' => $this->portalData($request),
            'leads' => BrokerInquiry::with('user')
                ->latest()
                ->get()
                ->map(fn (BrokerInquiry $lead): array => [
                    'id' => $lead->id,
                    'full_name' => $lead->full_name,
                    'company' => $lead->company,
                    'email' => $lead->email,
                    'phone' => $lead->phone,
                    'topic' => $lead->topic,
                    'topic_label' => $lead->topicLabel(),
                    'equipment_type' => $lead->equipment_type,
                    'message' => $lead->message,
                    'preferred_contact_label' => $lead->preferredContactLabel(),
                    // Present only when the visitor happened to be signed in. The lead is
                    // still worked from the contact fields above; this is context, not a
                    // replacement for them.
                    'account_name' => $lead->user?->name,
                    'account_email' => $lead->user?->email,
                    'status' => $lead->status,
                    'status_label' => $lead->statusLabel(),
                    'status_tone' => $lead->statusTone(),
                    'created_at' => $lead->created_at?->toFormattedDateString(),
                    'created_at_timestamp' => $lead->created_at?->getTimestamp(),
                ])
                ->values(),
            'leadStatusOptions' => BrokerInquiry::STATUSES,
        ]);
    }

    public function update(UpdateBrokerInquiryStatusRequest $request, BrokerInquiry $brokerInquiry): RedirectResponse
    {
        $brokerInquiry->update($request->safe()->only(['status']));

        return back()->with('status', 'Lead status updated.');
    }

    /**
     * Shell data for the shared PortalShell. Mirrors SubmissionReviewController::portalData —
     * every portal controller in the app builds this inline rather than sharing a helper.
     *
     * @return array<string, string>
     */
    private function portalData(Request $request): array
    {
        return [
            'userType' => User::TYPE_BROKER,
            'roleLabel' => 'Broker',
            'dashboardUrl' => route('broker.submissions'),
            'profileName' => $request->user()->name,
        ];
    }
}
