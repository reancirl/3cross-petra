export type AuthUser = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company_name: string | null;
    user_type: 'seller' | 'buyer' | 'broker';
    user_type_label: string;
    dashboard_url: string;
};

/**
 * Petra's public contact details, from config/petra.php. Rendered beside the Talk to a
 * Broker form. `phone` may still hold the content doc's placeholder ("(307) XXX-XXXX")
 * until the client supplies a real number — see hasDiallablePhone before linking it.
 */
export type SiteContact = {
    phone: string;
    email: string;
    hours_days: string;
    hours_time: string;
    service_area: string[];
};

export type SharedPageProps = {
    appName: string;
    auth: {
        user: AuthUser | null;
    };
    status?: string | null;
    siteContact: SiteContact;
    /**
     * Conversations (not messages) with something unread for the current user's side.
     * Drives the Messages / Inbox nav badge. Refreshed app-wide every 45s by
     * PortalShell via a partial reload; 0 for guests.
     */
    unreadMessageThreads?: number;
    /**
     * Documents added since the user last opened the Documents page. Drives the
     * Documents nav badge. Refreshed on the same 45s partial reload as the counter
     * above; always 0 for brokers and guests.
     */
    unseenDocuments?: number;
};

/**
 * One file in the Documents hub or the broker's per-subject panel.
 *
 * The same shape covers both the documents table and message attachments unioned in
 * at read time (App\Support\DocumentPresenter) — `source` is what distinguishes them.
 * Fields below the divider are broker-only and are simply absent from a customer
 * payload; the presenter never sends them, so an undefined check is a real one.
 */
export type PortalDocument = {
    /** Namespaced ("doc-12" / "msg-7") because the broker view interleaves two tables. */
    key: string;
    name: string;
    mime: string;
    size: number;
    isImage: boolean;
    /** False when the row outlived its file — render as unavailable, not a dead link. */
    available: boolean;
    /** An authorizing route, never a static path. */
    url: string;
    addedBy: string;
    source: 'broker_upload' | 'submission_upload' | 'message_attachment';
    sourceLabel: string;
    createdAt: string | null;
    createdAtLabel: string | null;
    /** Published with the listing. The full visibility value is broker-only. */
    isPublic: boolean;
    // Customer payloads only.
    addedByLabel?: string;
    isNew?: boolean;
    // Broker payloads only.
    id?: number;
    visibility?: 'private_broker' | 'shared_user' | 'public_listing' | null;
    visibilityLabel?: string;
    visibilityTone?: StatusTone;
    sharedWith?: string | null;
    archived?: boolean;
    archiveUrl?: string | null;
    downloadCount?: number | null;
};

/**
 * Documents grouped by what they are about, as the customer hub renders them. The
 * status badge is resolved server-side because it is the subject's live status, not
 * anything the document knows.
 */
export type DocumentGroup = {
    key: string;
    kind: string;
    kindLabel: string;
    title: string;
    statusLabel: string;
    statusTone: StatusTone;
    documents: PortalDocument[];
};

export type MessageAttachment = {
    id: number;
    name: string;
    mime: string;
    size: number;
    /** Render as an inline preview rather than a file chip. */
    isImage: boolean;
    /**
     * Whether the stored file still exists. False for anything uploaded before
     * storage/app became a persisted volume — the row survived, the bytes did not.
     */
    available: boolean;
    /** An authorizing route, not a static file — attachments are on the private disk. */
    url: string;
};

export type ThreadMessage = {
    id: number;
    body: string | null;
    senderType: 'user' | 'broker';
    /** Always "Petra" for broker messages — individual brokers are never named. */
    authorName: string;
    /** Whether the viewer's own side wrote this, driving left/right alignment. */
    mine: boolean;
    createdAt: string;
    attachments: MessageAttachment[];
};

export type ThreadSubjectContext = {
    kind: string;
    title: string;
    statusLabel: string;
    statusTone: StatusTone;
    href: string | null;
    // Listing subjects (broker context panel only).
    region?: string;
    condition?: string;
    conditionNotes?: string | null;
    category?: string;
    publicId?: string | null;
    askingPrice?: string | null;
    needsValuation?: boolean;
    photos?: { name: string; url: string }[];
    // Buyer-request subjects.
    specifications?: string | null;
    budget?: string | null;
    timeline?: string | null;
    locationPreference?: string | null;
    isQuoteInquiry?: boolean;
};

export type ThreadSummary = {
    id: number;
    url: string;
    subjectType: string;
    subjectTypeLabel: string;
    subjectTitle: string;
    subjectStatus: { label: string; tone: StatusTone } | null;
    status: 'open' | 'closed';
    statusLabel: string;
    isClosed: boolean;
    snippet: string;
    lastMessageAt: string | null;
    lastMessageFrom: 'user' | 'broker' | null;
    unreadCount: number;
    context?: ThreadSubjectContext;
    // Broker inbox rows only.
    userName?: string;
    userRole?: string;
    userType?: 'seller' | 'buyer' | 'broker';
};

export type ThreadMessagePage = {
    items: ThreadMessage[];
    currentPage: number;
    lastPage: number;
    total: number;
    hasOlder: boolean;
};

export type CannedResponse = {
    id: number;
    title: string;
    body: string;
};

export type PortalData = {
    userType: 'seller' | 'buyer' | 'broker';
    roleLabel: string;
    // Where the sidebar logo links back to. Brokers have no dashboard, so theirs
    // points at /broker/submissions (see portalHome in portal-sidebar).
    dashboardUrl: string;
    summary?: string;
    profileName?: string;
};

/**
 * A listing photo, as stored in the equipment_submissions.photos JSON column.
 *
 * Documents used to share this shape and that column. They are their own table now
 * (PortalDocument above) because a JSON array cannot express who a file is for, and
 * because these URLs are static public-disk paths with no auth in them — fine for a
 * marketplace gallery, never acceptable for a seller's paperwork.
 */
export type UploadFileMeta = {
    name: string;
    path: string;
    url: string;
    size: number | null;
};

export type StatusTone = 'neutral' | 'success' | 'warning' | 'muted' | 'danger';

export type PublicListingCard = {
    public_id: string;
    title: string;
    category: string;
    region: string;
    city: string | null;
    condition: string;
    availability: string;
    status_tone: StatusTone;
    manufacturer: string | null;
    year: string | null;
    capacity: string | null;
    description: string;
    image_url: string;
    featured: boolean;
    href: string;
};

export type PublicListingDetail = PublicListingCard & {
    model: string | null;
    photos: { url: string; alt: string }[];
    documents: { name: string; url: string }[];
    specifications: {
        manufacturer: string | null;
        model: string | null;
        year: string | null;
        capacity: string | null;
    };
};

export type EquipmentSubmission = {
    id: number;
    title: string;
    category: string;
    region: string;
    city: string | null;
    condition: string;
    condition_label: string;
    condition_notes: string | null;
    asking_price: string | null;
    needs_valuation: boolean;
    photos: UploadFileMeta[];
    documents: PortalDocument[];
    status: string;
    status_label: string;
    status_tone: StatusTone;
    status_explanation: string | null;
    created_at: string | null;
};

/**
 * One listing as its own page (Portal/SellerListingDetail). Extends the list summary
 * with the broker's enrichment — the buyer-facing copy and spec fields — plus publish
 * state and the offers logged against it.
 */
export type EquipmentSubmissionDetail = EquipmentSubmission & {
    public_id: string | null;
    /** Set only when the listing is actually reachable on the public marketplace. */
    public_href: string | null;
    public_description: string | null;
    manufacturer: string | null;
    model: string | null;
    year: number | null;
    capacity: string | null;
    featured: boolean;
    published_at: string | null;
    sold_at: string | null;
    offers: {
        id: number;
        amount: string;
        counter_amount: string | null;
        offered_at: string | null;
        status: string;
        status_label: string;
        status_tone: StatusTone;
    }[];
};

export type EquipmentRequest = {
    id: number;
    equipment_type: string;
    specifications: string | null;
    budget_range: string;
    location_preference: string;
    timeline: string;
    status: string;
    status_label: string;
    created_at: string | null;
};

export type BuyerQuote = {
    id: number;
    equipment_name: string;
    listing_public_id: string | null;
    listing_href: string | null;
    note: string | null;
    status: string;
    status_label: string;
    created_at: string | null;
};

// Offers made on a seller's listings. Brokers create them; sellers view + respond.
export type SellerOffer = {
    id: number;
    listing_title: string | null;
    listing_public_id: string | null;
    listing_href: string | null;
    amount: string;
    counter_amount: string | null;
    offered_at: string | null;
    status: string;
    status_label: string;
    status_tone: StatusTone;
    can_respond: boolean;
};
