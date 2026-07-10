export type AuthUser = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company_name: string | null;
    user_type: 'seller' | 'buyer';
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
