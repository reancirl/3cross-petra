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
    userType: 'seller' | 'buyer';
    roleLabel: string;
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

export type EquipmentSubmission = {
    id: number;
    equipment_type: string;
    location: string;
    condition: string;
    photos: UploadFileMeta[];
    documents: UploadFileMeta[];
    status: string;
    status_label: string;
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
