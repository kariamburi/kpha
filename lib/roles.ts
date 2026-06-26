export const Roles = {
    SUPER_ADMIN: "SUPER_ADMIN",
    ADMIN: "ADMIN",
    FINANCE: "FINANCE",
    MEMBER: "MEMBER",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export const dashboardRoles = [
    Roles.SUPER_ADMIN,
    Roles.ADMIN,
    Roles.FINANCE,
] as const;

export function canAccessDashboard(role?: string | null) {
    return !!role && dashboardRoles.includes(role as any);
}

export function isSuperAdmin(role?: string | null) {
    return role === Roles.SUPER_ADMIN;
}

export function canManageDashboardUsers(role?: string | null) {
    return role === Roles.SUPER_ADMIN;
}

export function canApproveApplications(role?: string | null) {
    return role === Roles.SUPER_ADMIN || role === Roles.ADMIN;
}

export function canManageWebsite(role?: string | null) {
    return role === Roles.SUPER_ADMIN || role === Roles.ADMIN;
}

export function canManagePayments(role?: string | null) {
    return role === Roles.SUPER_ADMIN || role === Roles.FINANCE;
}

export function canViewPayments(role?: string | null) {
    return role === Roles.SUPER_ADMIN || role === Roles.ADMIN || role === Roles.FINANCE;
}

export function canViewAuditLogs(role?: string | null) {
    return role === Roles.SUPER_ADMIN;
}
export function canManageSettings(role?: string | null) {
    return role === Roles.SUPER_ADMIN;
}

export function canManageApplications(role?: string | null) {
    return role === Roles.SUPER_ADMIN || role === Roles.ADMIN;
}

export function canManageMembers(role?: string | null) {
    return role === Roles.SUPER_ADMIN || role === Roles.ADMIN;
}

export function canManageCertificates(role?: string | null) {
    return role === Roles.SUPER_ADMIN || role === Roles.ADMIN;
}

export function canManageCommunication(role?: string | null) {
    return role === Roles.SUPER_ADMIN || role === Roles.ADMIN;
}

export function canViewDirectory(role?: string | null) {
    return role === Roles.SUPER_ADMIN || role === Roles.ADMIN;
}