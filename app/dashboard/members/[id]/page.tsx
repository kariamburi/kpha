import Link from "next/link";
import {
    notFound,
    redirect,
} from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { canManageMembers } from "@/lib/roles";

import {
    BadgeCheck,
    BriefcaseBusiness,
    Building2,
    CalendarDays,
    Check,
    CheckCircle2,
    CircleUserRound,
    Clock3,
    CreditCard,
    ExternalLink,
    FileBadge2,
    GraduationCap,
    IdCard,
    Landmark,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    User,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type EffectiveMemberStatus =
    | "ACTIVE"
    | "EXPIRED"
    | "SUSPENDED";

type CertificateStatus =
    | "UPCOMING"
    | "VALID"
    | "EXPIRED";

/* =========================================================
   DATE HELPERS
========================================================= */

function formatDate(
    date?: Date | null,
) {
    if (!date) {
        return "-";
    }

    return date.toLocaleDateString(
        "en-KE",
        {
            day: "2-digit",
            month: "long",
            year: "numeric",
        },
    );
}

function formatYear(
    date?: Date | null,
) {
    if (!date) {
        return "-";
    }

    return date.toLocaleDateString(
        "en-KE",
        {
            year: "numeric",
        },
    );
}

function formatSimpleStatus(
    status?: string | null,
) {
    if (!status) {
        return "-";
    }

    return status
        .replace(/[_-]+/g, " ")
        .toLowerCase()
        .replace(
            /\b\w/g,
            (character) =>
                character.toUpperCase(),
        );
}

/* =========================================================
   WORK PERIOD
========================================================= */

function formatWorkPeriod(
    startDate?: Date | null,
    endDate?: Date | null,
) {
    if (!startDate) {
        return "Period not provided";
    }

    return `${formatDate(
        startDate,
    )} – ${endDate
            ? formatDate(
                endDate,
            )
            : "Present"
        }`;
}

/* =========================================================
   MEMBER STATUS
========================================================= */

function getEffectiveMemberStatus(
    status: string,
    expiryDate: Date,
    now: number,
): EffectiveMemberStatus {
    if (
        status ===
        "SUSPENDED"
    ) {
        return "SUSPENDED";
    }

    if (
        expiryDate.getTime() <
        now
    ) {
        return "EXPIRED";
    }

    return "ACTIVE";
}

/* =========================================================
   CERTIFICATE STATUS
========================================================= */

function getCertificateStatus(
    issueDate: Date,
    expiryDate: Date,
    now: number,
): CertificateStatus {
    if (
        issueDate.getTime() >
        now
    ) {
        return "UPCOMING";
    }

    if (
        expiryDate.getTime() <
        now
    ) {
        return "EXPIRED";
    }

    return "VALID";
}

/* =========================================================
   PAGE
========================================================= */

export default async function MemberDetailsPage({
    params,
}: {
    params: Promise<{
        id: string;
    }>;
}) {
    const user =
        await getAuthUser();

    if (
        !user ||
        !canManageMembers(
            user.adminRole,
        )
    ) {
        redirect(
            "/dashboard",
        );
    }

    const { id } =
        await params;

    const member =
        await prisma.member.findUnique({
            where: {
                id,
            },

            include: {
                user: true,

                category: true,

                /*
                 * Education is now a separate
                 * professional profile section.
                 */
                educations: {
                    orderBy: {
                        createdAt:
                            "desc",
                    },
                },

                /*
                 * Work experience is separate
                 * from education.
                 */
                workExperiences: {
                    orderBy: {
                        createdAt:
                            "desc",
                    },
                },

                payments: {
                    orderBy: {
                        createdAt:
                            "desc",
                    },
                },

                certificates: {
                    orderBy: {
                        createdAt:
                            "desc",
                    },
                },

                eventRegistrations: {
                    include: {
                        event:
                            true,
                    },

                    orderBy: {
                        createdAt:
                            "desc",
                    },
                },
            },
        });

    if (!member) {
        notFound();
    }

    const now =
        Date.now();

    const effectiveStatus =
        getEffectiveMemberStatus(
            member.status,
            member.expiryDate,
            now,
        );

    const certificates =
        member.certificates.map(
            (certificate) => ({
                ...certificate,

                effectiveStatus:
                    getCertificateStatus(
                        certificate.issueDate,
                        certificate.expiryDate,
                        now,
                    ),
            }),
        );

    const validCertificates =
        certificates.filter(
            (certificate) =>
                certificate.effectiveStatus ===
                "VALID",
        );

    const upcomingCertificates =
        certificates.filter(
            (certificate) =>
                certificate.effectiveStatus ===
                "UPCOMING",
        );

    const expiredCertificates =
        certificates.filter(
            (certificate) =>
                certificate.effectiveStatus ===
                "EXPIRED",
        );

    const memberName =
        member.fullName ||
        member.user?.name ||
        "Unnamed Member";

    const memberEmail =
        member.email ||
        member.user?.email ||
        "-";

    const memberPhone =
        member.phone ||
        member.user?.phone ||
        "-";

    return (
        <div className="space-y-5">
            {/* =====================================================
                BACK
            ===================================================== */}

            <div>
                <Link
                    href="/dashboard/members"
                    className="inline-flex items-center gap-2 text-sm font-black text-[#C1121F] hover:underline"
                >
                    ← Back to Members
                </Link>
            </div>

            {/* =====================================================
                PROFESSIONAL PROFILE HEADER
            ===================================================== */}

            <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                <div className="px-5 py-5 sm:px-7 sm:py-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            {/* PROFILE IMAGE */}

                            <div className="relative shrink-0">
                                <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-lg ring-1 ring-slate-200 sm:h-32 sm:w-32">
                                    {member.profileImageUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={
                                                member.profileImageUrl
                                            }
                                            alt={
                                                memberName
                                            }
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-slate-950 text-4xl font-black text-white">
                                            {memberName
                                                .charAt(
                                                    0,
                                                )
                                                .toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                {effectiveStatus ===
                                    "ACTIVE" ? (
                                    <span
                                        className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-white shadow-sm"
                                        title="Active AHPK member"
                                    >
                                        <Check className="h-3.5 w-3.5" />
                                    </span>
                                ) : null}
                            </div>

                            {/* IDENTITY */}

                            <div className="min-w-0">
                                <p className="font-mono text-xs font-black tracking-wide text-[#C1121F]">
                                    {
                                        member.memberNumber
                                    }
                                </p>

                                <h1 className="mt-1.5 break-words text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                    {
                                        memberName
                                    }
                                </h1>

                                <p className="mt-1.5 text-lg font-extrabold text-slate-700">
                                    {member.position ||
                                        "Hospitality Professional"}
                                </p>

                                {member.employer ? (
                                    <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-500">
                                        <Building2 className="h-4 w-4 shrink-0 text-slate-400" />

                                        {
                                            member.employer
                                        }
                                    </p>
                                ) : null}

                                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
                                    {member.county ? (
                                        <span className="inline-flex items-center gap-1.5">
                                            <MapPin className="h-3.5 w-3.5 text-[#C1121F]" />

                                            {
                                                member.county
                                            }
                                        </span>
                                    ) : null}

                                    <span className="inline-flex items-center gap-1.5">
                                        <BadgeCheck className="h-3.5 w-3.5 text-[#C1121F]" />

                                        {
                                            member
                                                .category
                                                .name
                                        }
                                    </span>

                                    <span className="inline-flex items-center gap-1.5">
                                        <CalendarDays className="h-3.5 w-3.5 text-[#C1121F]" />

                                        Member since{" "}
                                        {formatYear(
                                            member.joinDate,
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="shrink-0">
                            <StatusBadge
                                status={
                                    effectiveStatus
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* PROFILE NAVIGATION */}

                <nav className="flex overflow-x-auto border-t border-slate-200 px-4 sm:px-6">
                    <ProfileNavLink
                        href="#overview"
                        label="Overview"
                    />

                    <ProfileNavLink
                        href="#experience"
                        label="Experience"
                    />

                    <ProfileNavLink
                        href="#education"
                        label="Education"
                    />

                    <ProfileNavLink
                        href="#certificates"
                        label="Certificates"
                    />

                    <ProfileNavLink
                        href="#payments"
                        label="Payments"
                    />

                    <ProfileNavLink
                        href="#events"
                        label="Events & CPD"
                    />
                </nav>
            </section>

            {/* =====================================================
                SUMMARY
            ===================================================== */}

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                <SummaryCard
                    icon={
                        <IdCard />
                    }
                    label="Category"
                    value={
                        member.category.name
                    }
                />

                <SummaryCard
                    icon={
                        <CalendarDays />
                    }
                    label="Membership Since"
                    value={formatYear(
                        member.joinDate,
                    )}
                />

                <SummaryCard
                    icon={
                        <ShieldCheck />
                    }
                    label="Status"
                    value={
                        effectiveStatus
                    }
                />

                <SummaryCard
                    icon={
                        <FileBadge2 />
                    }
                    label="Valid Certificates"
                    value={String(
                        validCertificates.length,
                    )}
                />

                <SummaryCard
                    icon={
                        <CalendarDays />
                    }
                    label="Valid Until"
                    value={formatDate(
                        member.expiryDate,
                    )}
                />
            </div>

            {/* =====================================================
                OVERVIEW
            ===================================================== */}

            <section
                id="overview"
                className="scroll-mt-28"
            >
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
                    {/* MEMBER INFORMATION */}

                    <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                        <SectionHeader
                            icon={
                                <CircleUserRound />
                            }
                            eyebrow="Professional Profile"
                            title="Member Information"
                            description="Core personal, professional and membership details."
                        />

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <DetailCard
                                icon={
                                    <User />
                                }
                                label="Full Name"
                                value={
                                    memberName
                                }
                            />

                            <DetailCard
                                icon={
                                    <Mail />
                                }
                                label="Email"
                                value={
                                    memberEmail
                                }
                            />

                            <DetailCard
                                icon={
                                    <Phone />
                                }
                                label="Phone"
                                value={
                                    memberPhone
                                }
                            />

                            <DetailCard
                                icon={
                                    <MapPin />
                                }
                                label="County"
                                value={
                                    member.county ||
                                    "Not provided"
                                }
                            />

                            <DetailCard
                                icon={
                                    <BriefcaseBusiness />
                                }
                                label="Current Position"
                                value={
                                    member.position ||
                                    "Not provided"
                                }
                            />

                            <DetailCard
                                icon={
                                    <Building2 />
                                }
                                label="Current Employer"
                                value={
                                    member.employer ||
                                    "Not provided"
                                }
                            />

                            <DetailCard
                                icon={
                                    <BadgeCheck />
                                }
                                label="Membership Category"
                                value={
                                    member
                                        .category
                                        .name
                                }
                            />

                            <DetailCard
                                icon={
                                    <CalendarDays />
                                }
                                label="Membership Since"
                                value={formatYear(
                                    member.joinDate,
                                )}
                            />

                            <DetailCard
                                icon={
                                    <CalendarDays />
                                }
                                label="Valid Until"
                                value={formatDate(
                                    member.expiryDate,
                                )}
                            />

                            <DetailCard
                                icon={
                                    <ShieldCheck />
                                }
                                label="Membership Status"
                                value={
                                    effectiveStatus
                                }
                            />
                        </div>
                    </div>

                    {/* VERIFICATION SIDEBAR */}

                    <aside className="space-y-4">
                        <div className="overflow-hidden rounded-[26px] border border-emerald-200 bg-white shadow-sm">
                            <div className="bg-emerald-50 p-5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
                                    Membership
                                    Verification
                                </p>

                                <h2 className="mt-1.5 text-xl font-black text-slate-950">
                                    {effectiveStatus ===
                                        "ACTIVE"
                                        ? "Active AHPK Member"
                                        : effectiveStatus ===
                                            "EXPIRED"
                                            ? "Membership Expired"
                                            : "Membership Suspended"}
                                </h2>
                            </div>

                            <div className="p-5">
                                <div className="divide-y divide-slate-200">
                                    <VerificationRow
                                        label="Member Number"
                                        value={
                                            member.memberNumber
                                        }
                                        mono
                                    />

                                    <VerificationRow
                                        label="Membership Since"
                                        value={formatYear(
                                            member.joinDate,
                                        )}
                                    />

                                    <VerificationRow
                                        label="Valid Until"
                                        value={formatDate(
                                            member.expiryDate,
                                        )}
                                    />

                                    <VerificationRow
                                        label="Current Certificate"
                                        value={
                                            validCertificates.length >
                                                0
                                                ? "Verified"
                                                : "None"
                                        }
                                    />

                                    <VerificationRow
                                        label="Public Directory"
                                        value={
                                            member.isDirectoryVisible
                                                ? "Visible"
                                                : "Hidden"
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[26px] border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-300">
                                Membership
                                Record
                            </p>

                            <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
                                This record is
                                part of the
                                official AHPK
                                digital
                                membership
                                register.
                            </p>

                            <div className="mt-4 rounded-xl bg-white/5 p-3">
                                <p className="text-[9px] font-black uppercase tracking-wide text-slate-400">
                                    Directory
                                    Status
                                </p>

                                <p className="mt-1 text-sm font-black text-white">
                                    {member.isDirectoryVisible
                                        ? "Publicly Visible"
                                        : "Not Publicly Visible"}
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* =====================================================
                PROFESSIONAL EXPERIENCE
            ===================================================== */}

            <section
                id="experience"
                className="scroll-mt-28 rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm"
            >
                <SectionHeader
                    icon={
                        <BriefcaseBusiness />
                    }
                    eyebrow="Professional Background"
                    title="Professional Experience"
                    description="Employment history, positions and professional responsibilities."
                    count={
                        member
                            .workExperiences
                            .length
                    }
                />

                {member
                    .workExperiences
                    .length >
                    0 ? (
                    <div className="mt-5 divide-y divide-slate-200">
                        {member.workExperiences.map(
                            (item) => (
                                <WorkExperienceCard
                                    key={
                                        item.id
                                    }
                                    company={
                                        item.company
                                    }
                                    position={
                                        item.position
                                    }
                                    description={
                                        item.description
                                    }
                                    startDate={
                                        item.startDate
                                    }
                                    endDate={
                                        item.endDate
                                    }
                                />
                            ),
                        )}
                    </div>
                ) : (
                    <EmptyState
                        icon={
                            <BriefcaseBusiness />
                        }
                        title="No professional experience found"
                        description="No work experience records have been added to this member."
                    />
                )}
            </section>

            {/* =====================================================
                EDUCATION
            ===================================================== */}

            <section
                id="education"
                className="scroll-mt-28 rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm"
            >
                <SectionHeader
                    icon={
                        <GraduationCap />
                    }
                    eyebrow="Academic Background"
                    title="Education & Qualifications"
                    description="Qualifications, institutions and academic achievements."
                    count={
                        member.educations
                            .length
                    }
                />

                {member.educations
                    .length >
                    0 ? (
                    <div className="mt-5 divide-y divide-slate-200">
                        {member.educations.map(
                            (item) => (
                                <EducationRecord
                                    key={
                                        item.id
                                    }
                                    level={
                                        item.level
                                    }
                                    institution={
                                        item.institution
                                    }
                                    year={
                                        item.year
                                    }
                                    achievement={
                                        item.achievement
                                    }
                                />
                            ),
                        )}
                    </div>
                ) : (
                    <EmptyState
                        icon={
                            <GraduationCap />
                        }
                        title="No education records found"
                        description="No education or qualification records have been added to this member."
                    />
                )}
            </section>

            {/* =====================================================
                CERTIFICATES
            ===================================================== */}

            <section
                id="certificates"
                className="scroll-mt-28 rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm"
            >
                <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <SectionHeaderContent
                        icon={
                            <FileBadge2 />
                        }
                        eyebrow="Official Credentials"
                        title="Certificates"
                        description="Membership certificate history and validity periods."
                    />

                    <div className="flex flex-wrap gap-2">
                        <SmallStatus
                            label={`Valid ${validCertificates.length}`}
                            tone="green"
                        />

                        <SmallStatus
                            label={`Upcoming ${upcomingCertificates.length}`}
                            tone="blue"
                        />

                        <SmallStatus
                            label={`Expired ${expiredCertificates.length}`}
                            tone="amber"
                        />
                    </div>
                </div>

                {certificates.length >
                    0 ? (
                    <div className="mt-5 grid gap-3">
                        {certificates.map(
                            (cert) => (
                                <CertificateCard
                                    key={
                                        cert.id
                                    }
                                    id={
                                        cert.id
                                    }
                                    certificateNumber={
                                        cert.certificateNumber
                                    }
                                    verificationCode={
                                        cert.verificationCode
                                    }
                                    issueDate={
                                        cert.issueDate
                                    }
                                    expiryDate={
                                        cert.expiryDate
                                    }
                                    status={
                                        cert.effectiveStatus
                                    }
                                />
                            ),
                        )}
                    </div>
                ) : (
                    <EmptyState
                        icon={
                            <FileBadge2 />
                        }
                        title="No certificates found"
                        description="No certificate records have been issued to this member."
                    />
                )}
            </section>

            {/* =====================================================
                PAYMENTS
            ===================================================== */}

            <section
                id="payments"
                className="scroll-mt-28 rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm"
            >
                <SectionHeader
                    icon={
                        <CreditCard />
                    }
                    eyebrow="Financial History"
                    title="Payments"
                    description="Membership and renewal payment records."
                />

                <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[760px] text-sm">
                        <thead className="bg-slate-100 text-left text-[10px] font-black uppercase tracking-wide text-slate-600">
                            <tr>
                                <th className="px-4 py-3">
                                    Date
                                </th>

                                <th className="px-4 py-3">
                                    Amount
                                </th>

                                <th className="px-4 py-3">
                                    Method
                                </th>

                                <th className="px-4 py-3">
                                    Reference
                                </th>

                                <th className="px-4 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {member.payments.map(
                                (
                                    payment,
                                ) => (
                                    <tr
                                        key={
                                            payment.id
                                        }
                                        className="hover:bg-slate-50"
                                    >
                                        <td className="whitespace-nowrap px-4 py-3">
                                            {formatDate(
                                                payment.createdAt,
                                            )}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 font-black text-slate-900">
                                            KES{" "}
                                            {payment.amount.toLocaleString(
                                                "en-KE",
                                            )}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            {
                                                payment.method
                                            }
                                        </td>

                                        <td className="px-4 py-3 font-mono text-xs text-slate-600">
                                            {payment.reference ||
                                                "-"}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            <PaymentStatusBadge
                                                status={
                                                    payment.status
                                                }
                                            />
                                        </td>
                                    </tr>
                                ),
                            )}

                            {member.payments
                                .length ===
                                0 && (
                                    <tr>
                                        <td
                                            colSpan={
                                                5
                                            }
                                            className="px-4 py-8 text-center text-slate-500"
                                        >
                                            No
                                            payments
                                            found.
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* =====================================================
                EVENTS
            ===================================================== */}

            <section
                id="events"
                className="scroll-mt-28 rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm"
            >
                <SectionHeader
                    icon={
                        <GraduationCap />
                    }
                    eyebrow="Professional Activity"
                    title="Events & CPD"
                    description="Event registrations and professional development activity."
                />

                <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[700px] text-sm">
                        <thead className="bg-slate-100 text-left text-[10px] font-black uppercase tracking-wide text-slate-600">
                            <tr>
                                <th className="px-4 py-3">
                                    Event
                                </th>

                                <th className="px-4 py-3">
                                    Registered
                                </th>

                                <th className="px-4 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {member.eventRegistrations.map(
                                (
                                    registration,
                                ) => (
                                    <tr
                                        key={
                                            registration.id
                                        }
                                        className="hover:bg-slate-50"
                                    >
                                        <td className="px-4 py-3">
                                            <p className="font-black text-slate-900">
                                                {
                                                    registration
                                                        .event
                                                        .title
                                                }
                                            </p>
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            {formatDate(
                                                registration.createdAt,
                                            )}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            {formatSimpleStatus(
                                                registration.status,
                                            )}
                                        </td>
                                    </tr>
                                ),
                            )}

                            {member
                                .eventRegistrations
                                .length ===
                                0 && (
                                    <tr>
                                        <td
                                            colSpan={
                                                3
                                            }
                                            className="px-4 py-8 text-center text-slate-500"
                                        >
                                            No event
                                            registrations
                                            found.
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
    icon,
    eyebrow,
    title,
    description,
    count,
}: {
    icon: React.ReactNode;
    eyebrow: string;
    title: string;
    description: string;
    count?: number;
}) {
    return (
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <SectionHeaderContent
                icon={
                    icon
                }
                eyebrow={
                    eyebrow
                }
                title={
                    title
                }
                description={
                    description
                }
            />

            {typeof count ===
                "number" ? (
                <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black text-slate-600">
                    {count} record
                    {count === 1
                        ? ""
                        : "s"}
                </span>
            ) : null}
        </div>
    );
}

function SectionHeaderContent({
    icon,
    eyebrow,
    title,
    description,
}: {
    icon: React.ReactNode;
    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C1121F] [&>svg]:h-5 [&>svg]:w-5">
                {icon}
            </span>

            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C1121F]">
                    {eyebrow}
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-950">
                    {title}
                </h2>

                <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                    {
                        description
                    }
                </p>
            </div>
        </div>
    );
}

/* =========================================================
   PROFILE NAV
========================================================= */

function ProfileNavLink({
    href,
    label,
}: {
    href: string;
    label: string;
}) {
    return (
        <a
            href={href}
            className="whitespace-nowrap border-b-2 border-transparent px-3 py-3 text-xs font-black text-slate-500 transition hover:border-[#C1121F] hover:text-[#C1121F]"
        >
            {label}
        </a>
    );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#C1121F] [&>svg]:h-4 [&>svg]:w-4">
                {icon}
            </span>

            <p className="mt-3 text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
                {label}
            </p>

            <p className="mt-1 break-words text-base font-black text-slate-950">
                {value}
            </p>
        </div>
    );
}

/* =========================================================
   DETAIL CARD
========================================================= */

function DetailCard({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-red-200 hover:bg-red-50/40">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#C1121F] shadow-sm [&>svg]:h-4 [&>svg]:w-4">
                {icon}
            </span>

            <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                    {label}
                </p>

                <p className="mt-1 break-words text-sm font-black text-slate-900">
                    {value}
                </p>
            </div>
        </div>
    );
}

/* =========================================================
   WORK EXPERIENCE
========================================================= */

function WorkExperienceCard({
    company,
    position,
    description,
    startDate,
    endDate,
}: {
    company?: string | null;
    position?: string | null;
    description?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
}) {
    return (
        <article className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
                    <BriefcaseBusiness className="h-4 w-4" />
                </span>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h3 className="text-base font-black text-slate-950">
                                {position ||
                                    "Professional Experience"}
                            </h3>

                            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-600">
                                <Building2 className="h-4 w-4 shrink-0 text-slate-400" />

                                {company ||
                                    "Employer not provided"}
                            </p>
                        </div>

                        {!endDate &&
                            startDate ? (
                            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-700">
                                <CheckCircle2 className="h-3 w-3" />

                                CURRENT
                            </span>
                        ) : null}
                    </div>

                    <p className="mt-2 flex items-center gap-2 text-xs font-bold text-slate-500">
                        <CalendarDays className="h-3.5 w-3.5 text-[#C1121F]" />

                        {formatWorkPeriod(
                            startDate,
                            endDate,
                        )}
                    </p>

                    {description ? (
                        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                                Experience /
                                Responsibilities
                            </p>

                            <p className="mt-1 whitespace-pre-line text-sm font-semibold leading-6 text-slate-600">
                                {
                                    description
                                }
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>
        </article>
    );
}

/* =========================================================
   EDUCATION RECORD
========================================================= */

function EducationRecord({
    level,
    institution,
    year,
    achievement,
}: {
    level?: string | null;
    institution?: string | null;
    year?: string | null;
    achievement?: string | null;
}) {
    return (
        <article className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <GraduationCap className="h-5 w-5" />
                </span>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h3 className="text-base font-black text-slate-950">
                                {level ||
                                    "Education Record"}
                            </h3>

                            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-600">
                                <Landmark className="h-4 w-4 shrink-0 text-slate-400" />

                                {institution ||
                                    "Institution not provided"}
                            </p>
                        </div>

                        {year ? (
                            <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-600">
                                {
                                    year
                                }
                            </span>
                        ) : null}
                    </div>

                    {achievement ? (
                        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                                Achievement
                            </p>

                            <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                                {
                                    achievement
                                }
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>
        </article>
    );
}

/* =========================================================
   VERIFICATION ROW
========================================================= */

function VerificationRow({
    label,
    value,
    mono = false,
}: {
    label: string;
    value: string;
    mono?: boolean;
}) {
    return (
        <div className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <p className="text-xs font-semibold text-slate-500">
                {label}
            </p>

            <p
                className={[
                    "max-w-[60%] break-words text-right text-xs font-black text-slate-900",

                    mono
                        ? "font-mono"
                        : "",
                ].join(
                    " ",
                )}
            >
                {value}
            </p>
        </div>
    );
}

/* =========================================================
   CERTIFICATE CARD
========================================================= */

function CertificateCard({
    id,
    certificateNumber,
    verificationCode,
    issueDate,
    expiryDate,
    status,
}: {
    id: string;
    certificateNumber: string;
    verificationCode: string;
    issueDate: Date;
    expiryDate: Date;
    status: CertificateStatus;
}) {
    const valid =
        status ===
        "VALID";

    const upcoming =
        status ===
        "UPCOMING";

    return (
        <article
            className={[
                "rounded-xl border p-4",

                valid
                    ? "border-emerald-200 bg-emerald-50/50"
                    : upcoming
                        ? "border-blue-200 bg-blue-50/50"
                        : "border-amber-200 bg-amber-50/50",
            ].join(
                " ",
            )}
        >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-3">
                    <span
                        className={[
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm",

                            valid
                                ? "text-emerald-700"
                                : upcoming
                                    ? "text-blue-700"
                                    : "text-amber-700",
                        ].join(
                            " ",
                        )}
                    >
                        <FileBadge2 className="h-4 w-4" />
                    </span>

                    <div>
                        <p className="text-[9px] font-black uppercase tracking-wide text-slate-400">
                            Certificate
                            Number
                        </p>

                        <h3 className="mt-1 break-all font-mono text-sm font-black text-slate-950">
                            {
                                certificateNumber
                            }
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold text-slate-600">
                            <span>
                                Valid from{" "}

                                <strong>
                                    {formatDate(
                                        issueDate,
                                    )}
                                </strong>
                            </span>

                            <span>
                                Valid until{" "}

                                <strong>
                                    {formatDate(
                                        expiryDate,
                                    )}
                                </strong>
                            </span>
                        </div>

                        <p className="mt-1.5 break-all font-mono text-xs font-semibold text-slate-500">
                            {
                                verificationCode
                            }
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <CertificateStatusBadge
                        status={
                            status
                        }
                    />

                    <Link
                        href={`/dashboard/certificates/${id}`}
                        className="inline-flex items-center justify-center rounded-lg bg-white px-3 py-2 text-xs font-black text-[#C1121F] shadow-sm transition hover:bg-red-50"
                    >
                        View
                    </Link>

                    <Link
                        href={`/verify/${encodeURIComponent(
                            verificationCode,
                        )}`}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-xs font-black text-white transition hover:bg-black"
                    >
                        Verify

                        <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </div>
        </article>
    );
}

/* =========================================================
   MEMBER STATUS
========================================================= */

function StatusBadge({
    status,
}: {
    status: EffectiveMemberStatus;
}) {
    const cls =
        status ===
            "ACTIVE"
            ? "bg-green-50 text-green-700 border-green-200"
            : status ===
                "EXPIRED"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-red-50 text-red-700 border-red-200";

    return (
        <span
            className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-black ${cls}`}
        >
            {status ===
                "ACTIVE" ? (
                <CheckCircle2 className="h-4 w-4" />
            ) : (
                <Clock3 className="h-4 w-4" />
            )}

            {status}
        </span>
    );
}

/* =========================================================
   CERTIFICATE STATUS
========================================================= */

function CertificateStatusBadge({
    status,
}: {
    status: CertificateStatus;
}) {
    const cls =
        status ===
            "VALID"
            ? "bg-green-100 text-green-700"
            : status ===
                "UPCOMING"
                ? "bg-blue-100 text-blue-700"
                : "bg-amber-100 text-amber-700";

    return (
        <span
            className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wide ${cls}`}
        >
            {status}
        </span>
    );
}

/* =========================================================
   SMALL STATUS
========================================================= */

function SmallStatus({
    label,
    tone,
}: {
    label: string;

    tone:
    | "green"
    | "blue"
    | "amber";
}) {
    const cls =
        tone ===
            "green"
            ? "bg-green-50 text-green-700"
            : tone ===
                "blue"
                ? "bg-blue-50 text-blue-700"
                : "bg-amber-50 text-amber-700";

    return (
        <span
            className={`rounded-full px-3 py-1 text-[10px] font-black ${cls}`}
        >
            {label}
        </span>
    );
}

/* =========================================================
   PAYMENT STATUS
========================================================= */

function PaymentStatusBadge({
    status,
}: {
    status: string;
}) {
    const normalized =
        status.toUpperCase();

    const cls =
        normalized ===
            "PAID" ||
            normalized ===
            "SUCCESS"
            ? "bg-green-50 text-green-700"
            : normalized ===
                "PENDING"
                ? "bg-amber-50 text-amber-700"
                : "bg-red-50 text-red-700";

    return (
        <span
            className={`rounded-full px-3 py-1 text-[10px] font-black ${cls}`}
        >
            {formatSimpleStatus(
                status,
            )}
        </span>
    );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-7 text-center">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-300 shadow-sm [&>svg]:h-5 [&>svg]:w-5">
                {icon}
            </span>

            <h3 className="mt-3 text-base font-black text-slate-800">
                {title}
            </h3>

            <p className="mx-auto mt-1 max-w-md text-xs font-semibold leading-5 text-slate-500">
                {description}
            </p>
        </div>
    );
}