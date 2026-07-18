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

export type SharedPageProps = {
    appName: string;
    auth: {
        user: AuthUser | null;
    };
    status?: string | null;
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
    documents: UploadFileMeta[];
    status: string;
    status_label: string;
    status_tone: StatusTone;
    status_explanation: string | null;
    created_at: string | null;
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
