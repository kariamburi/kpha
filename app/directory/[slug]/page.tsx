import type { Metadata } from "next";
import type {
    CSSProperties,
    ReactNode,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    BriefcaseBusiness,
    Building2,
    CalendarDays,
    Check,
    CheckCircle2,
    ChevronRight,
    Clock3,
    ExternalLink,
    FileBadge2,
    FileCheck2,
    GraduationCap,
    Home,
    IdCard,
    Landmark,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    User,
    Users,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";

import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

import { prisma } from "@/lib/prisma";

/* =========================================================
   TYPES
========================================================= */

type DirectoryProfilePageProps = {
    params: Promise<{
        slug: string;
    }>;
};

type CertificateStatus =
    | "UPCOMING"
    | "VALID"
    | "EXPIRED";

/* =========================================================
   HELPERS
========================================================= */

function formatDate(
    date?: Date | null,
) {
    if (!date) {
        return "Not provided";
    }

    return new Intl.DateTimeFormat(
        "en-KE",
        {
            day: "2-digit",
            month: "long",
            year: "numeric",
        },
    ).format(date);
}

function formatYear(
    date?: Date | null,
) {
    if (!date) {
        return "Not provided";
    }

    return String(
        date.getFullYear(),
    );
}

function normalizeMemberNumber(
    slug: string,
) {
    return decodeURIComponent(
        slug,
    ).trim();
}

function formatStatus(
    value?: string | null,
) {
    if (!value) {
        return "Not provided";
    }

    return value
        .replace(
            /[_-]+/g,
            " ",
        )
        .toLowerCase()
        .replace(
            /\b\w/g,
            (character) =>
                character.toUpperCase(),
        );
}

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
   METADATA
========================================================= */

export async function generateMetadata({
    params,
}: DirectoryProfilePageProps): Promise<Metadata> {
    const { slug } =
        await params;

    const memberNumber =
        normalizeMemberNumber(
            slug,
        );

    const member =
        await prisma.member.findUnique({
            where: {
                memberNumber,
            },

            select: {
                fullName: true,
                memberNumber: true,
                position: true,
                employer: true,
                county: true,
                status: true,
                expiryDate: true,
                isDirectoryVisible: true,
                profileImageUrl: true,

                category: {
                    select: {
                        name: true,
                    },
                },
            },
        });

    const now =
        new Date();

    if (
        !member ||
        !member.isDirectoryVisible ||
        member.status !==
        "ACTIVE" ||
        member.expiryDate <
        now
    ) {
        return {
            title:
                "Member Not Found | AHPK",

            description:
                "The requested AHPK member profile could not be found.",

            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const memberName =
        member.fullName ||
        "AHPK Member";

    const role =
        member.position ||
        "Hospitality Professional";

    return {
        title:
            `${memberName} | AHPK Member Directory`,

        description:
            `${memberName} is an active ${member.category.name} member of the Association of Hotel Professionals Kenya.`,

        alternates: {
            canonical:
                `/directory/${encodeURIComponent(
                    member.memberNumber,
                )}`,
        },

        openGraph: {
            title:
                `${memberName} | Verified AHPK Member`,

            description:
                `${role}${member.employer
                    ? ` at ${member.employer}`
                    : ""
                }.`,

            url:
                `/directory/${encodeURIComponent(
                    member.memberNumber,
                )}`,

            siteName:
                "Association of Hotel Professionals Kenya",

            locale:
                "en_KE",

            type:
                "profile",

            images:
                member.profileImageUrl
                    ? [
                        {
                            url:
                                member.profileImageUrl,
                            alt:
                                memberName,
                        },
                    ]
                    : undefined,
        },

        robots: {
            index: true,
            follow: true,
        },
    };
}

/* =========================================================
   PAGE
========================================================= */

export default async function DirectoryProfilePage({
    params,
}: DirectoryProfilePageProps) {
    const { slug } =
        await params;

    const memberNumber =
        normalizeMemberNumber(
            slug,
        );

    const member =
        await prisma.member.findUnique({
            where: {
                memberNumber,
            },

            include: {
                category:
                    true,

                educations: {
                    orderBy: {
                        createdAt:
                            "desc",
                    },
                },

                workExperiences: {
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
            },
        });

    const nowDate =
        new Date();

    const now =
        nowDate.getTime();

    if (
        !member ||
        !member.isDirectoryVisible ||
        member.status !==
        "ACTIVE" ||
        member.expiryDate <
        nowDate
    ) {
        notFound();
    }

    const memberName =
        member.fullName ||
        "AHPK Member";

    const professionalTitle =
        member.position ||
        "Hospitality Professional";

    const validCertificates =
        member.certificates.filter(
            (certificate) =>
                certificate.issueDate.getTime() <=
                now &&
                certificate.expiryDate.getTime() >=
                now,
        );

    return (
        <main className="min-h-screen bg-slate-50 text-slate-950">
            {/* SEO */}

            <BreadcrumbJsonLd
                items={[
                    {
                        name:
                            "Home",
                        url:
                            "/",
                    },
                    {
                        name:
                            "Member Directory",
                        url:
                            "/directory",
                    },
                    {
                        name:
                            memberName,

                        url:
                            `/directory/${encodeURIComponent(
                                member.memberNumber,
                            )}`,
                    },
                ]}
            />

            <MemberProfileJsonLd
                memberName={
                    memberName
                }
                memberNumber={
                    member.memberNumber
                }
                professionalTitle={
                    professionalTitle
                }
                employer={
                    member.employer
                }
                county={
                    member.county
                }
                categoryName={
                    member.category.name
                }
                profileImageUrl={
                    member.profileImageUrl
                }
            />

            <PageHeader />

            {/* =====================================================
                BREADCRUMB
            ===================================================== */}

            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
                    <ProfileBreadcrumb
                        memberName={
                            memberName
                        }
                    />
                </div>
            </section>

            {/* =====================================================
                PRIMARY MEMBER PROFILE
            ===================================================== */}

            <section className="bg-white">
                <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
                    <Link
                        href="/directory"
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-[#C8102E]"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />

                        Back to Member
                        Directory
                    </Link>

                    <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
                        {/* PHOTO */}

                        <ProfileAvatar
                            imageUrl={
                                member.profileImageUrl
                            }
                            memberName={
                                memberName
                            }
                        />

                        {/* MAIN IDENTITY */}

                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase text-emerald-700">
                                    <BadgeCheck className="h-3.5 w-3.5" />

                                    Verified
                                    Member
                                </span>

                                <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-[10px] font-black uppercase text-[#C8102E]">
                                    {
                                        member
                                            .category
                                            .name
                                    }
                                </span>
                            </div>

                            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                {
                                    memberName
                                }
                            </h1>

                            <p className="mt-1 text-lg font-black text-[#C8102E]">
                                {
                                    professionalTitle
                                }
                            </p>

                            {member.employer ? (
                                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-600">
                                    <Building2 className="h-4 w-4 text-slate-400" />

                                    {
                                        member.employer
                                    }
                                </p>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                MEMBER DETAILS - PRIMARY FOCUS
            ===================================================== */}

            <section className="border-t border-slate-200 bg-slate-50 py-5">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                        <SectionTitle
                            icon={
                                <IdCard />
                            }
                            eyebrow="AHPK Membership"
                            title="Member Details"
                        />

                        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            <MemberDetail
                                icon={
                                    <IdCard />
                                }
                                label="Member Number"
                                value={
                                    member.memberNumber
                                }
                                mono
                            />

                            <MemberDetail
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

                            <MemberDetail
                                icon={
                                    <ShieldCheck />
                                }
                                label="Membership Status"
                                value={formatStatus(
                                    member.status,
                                )}
                                success
                            />

                            <MemberDetail
                                icon={
                                    <CalendarDays />
                                }
                                label="Member Since"
                                value={formatYear(
                                    member.joinDate,
                                )}
                            />

                            <MemberDetail
                                icon={
                                    <CalendarDays />
                                }
                                label="Membership Valid Until"
                                value={formatDate(
                                    member.expiryDate,
                                )}
                            />

                            <MemberDetail
                                icon={
                                    <MapPin />
                                }
                                label="County"
                                value={
                                    member.county ||
                                    "Not provided"
                                }
                            />

                            <MemberDetail
                                icon={
                                    <BriefcaseBusiness />
                                }
                                label="Current Position"
                                value={
                                    member.position ||
                                    "Not provided"
                                }
                            />

                            <MemberDetail
                                icon={
                                    <Building2 />
                                }
                                label="Current Employer"
                                value={
                                    member.employer ||
                                    "Not provided"
                                }
                            />

                            <MemberDetail
                                icon={
                                    <FileBadge2 />
                                }
                                label="Valid Certificates"
                                value={String(
                                    validCertificates.length,
                                )}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                CONTACT
            ===================================================== */}

            {(member.email ||
                member.phone) && (
                    <section className="bg-slate-50 pb-5">
                        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                                <SectionTitle
                                    icon={
                                        <Mail />
                                    }
                                    eyebrow="Professional Contact"
                                    title="Contact Details"
                                />

                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    {member.email ? (
                                        <ContactDetail
                                            icon={
                                                <Mail />
                                            }
                                            label="Email Address"
                                            value={
                                                member.email
                                            }
                                            href={`mailto:${member.email}`}
                                        />
                                    ) : null}

                                    {member.phone ? (
                                        <ContactDetail
                                            icon={
                                                <Phone />
                                            }
                                            label="Phone Number"
                                            value={
                                                member.phone
                                            }
                                            href={`tel:${member.phone}`}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

            {/* =====================================================
                PROFESSIONAL EXPERIENCE
            ===================================================== */}

            <section className="border-t border-slate-200 bg-white py-5">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <SectionTitle
                        icon={
                            <BriefcaseBusiness />
                        }
                        eyebrow="Career History"
                        title="Professional Experience"
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
                        <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
                            {member.workExperiences.map(
                                (
                                    item,
                                ) => (
                                    <ExperienceRow
                                        key={
                                            item.id
                                        }
                                        position={
                                            item.position
                                        }
                                        company={
                                            item.company
                                        }
                                        startDate={
                                            item.startDate
                                        }
                                        endDate={
                                            item.endDate
                                        }
                                        description={
                                            item.description
                                        }
                                    />
                                ),
                            )}
                        </div>
                    ) : (
                        <EmptyState
                            title="No professional experience listed"
                            description="This member has not made professional experience records publicly available."
                        />
                    )}
                </div>
            </section>

            {/* =====================================================
                EDUCATION
            ===================================================== */}

            <section className="border-t border-slate-200 bg-slate-50 py-5">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <SectionTitle
                        icon={
                            <GraduationCap />
                        }
                        eyebrow="Academic Background"
                        title="Education & Qualifications"
                        count={
                            member.educations
                                .length
                        }
                    />

                    {member.educations
                        .length >
                        0 ? (
                        <div className="mt-4 divide-y divide-slate-200 rounded-[24px] border border-slate-200 bg-white px-5 shadow-sm">
                            {member.educations.map(
                                (
                                    item,
                                ) => (
                                    <EducationRow
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
                            title="No education records listed"
                            description="This member has not made education records publicly available."
                        />
                    )}
                </div>
            </section>

            {/* =====================================================
                CERTIFICATES
            ===================================================== */}

            <section className="border-t border-slate-200 bg-white py-5">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <SectionTitle
                        icon={
                            <FileBadge2 />
                        }
                        eyebrow="Official Credentials"
                        title="AHPK Certificates"
                        count={
                            member
                                .certificates
                                .length
                        }
                    />

                    {member
                        .certificates
                        .length >
                        0 ? (
                        <div className="mt-4 grid gap-3">
                            {member.certificates.map(
                                (
                                    certificate,
                                ) => {
                                    const status =
                                        getCertificateStatus(
                                            certificate.issueDate,
                                            certificate.expiryDate,
                                            now,
                                        );

                                    return (
                                        <CertificateRow
                                            key={
                                                certificate.id
                                            }
                                            certificateNumber={
                                                certificate.certificateNumber
                                            }
                                            verificationCode={
                                                certificate.verificationCode
                                            }
                                            issueDate={
                                                certificate.issueDate
                                            }
                                            expiryDate={
                                                certificate.expiryDate
                                            }
                                            status={
                                                status
                                            }
                                        />
                                    );
                                },
                            )}
                        </div>
                    ) : (
                        <EmptyState
                            title="No certificates listed"
                            description="No certificate records are currently displayed."
                        />
                    )}
                </div>
            </section>

            {/* =====================================================
                SMALL FOOT ACTIONS
            ===================================================== */}

            <section className="border-t border-slate-200 bg-slate-50 py-5">
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
                    <Link
                        href="/directory"
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-xs font-black text-slate-700 transition hover:border-[#C8102E] hover:text-[#C8102E]"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />

                        Member Directory
                    </Link>

                    <Link
                        href="/contact"
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-5 text-xs font-black text-white transition hover:bg-red-800"
                    >
                        Contact AHPK

                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}

/* =========================================================
   AVATAR
========================================================= */

function ProfileAvatar({
    imageUrl,
    memberName,
}: {
    imageUrl?: string | null;
    memberName: string;
}) {
    return (
        <div className="relative shrink-0">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md ring-1 ring-slate-200">
                {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={
                            imageUrl
                        }
                        alt={
                            memberName
                        }
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <User className="h-12 w-12 text-slate-300" />
                )}
            </div>

            <span
                className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-white"
                title="Verified member"
            >
                <Check className="h-3.5 w-3.5" />
            </span>
        </div>
    );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
    icon,
    eyebrow,
    title,
    count,
}: {
    icon: ReactNode;
    eyebrow: string;
    title: string;
    count?: number;
}) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white [&>svg]:h-4 [&>svg]:w-4">
                    {icon}
                </span>

                <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#C8102E]">
                        {eyebrow}
                    </p>

                    <h2 className="mt-0.5 text-lg font-black text-slate-950 sm:text-xl">
                        {title}
                    </h2>
                </div>
            </div>

            {typeof count ===
                "number" ? (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-600">
                    {count}{" "}
                    record
                    {count === 1
                        ? ""
                        : "s"}
                </span>
            ) : null}
        </div>
    );
}

/* =========================================================
   MEMBER DETAIL
========================================================= */

function MemberDetail({
    icon,
    label,
    value,
    mono = false,
    success = false,
}: {
    icon: ReactNode;
    label: string;
    value: string;
    mono?: boolean;
    success?: boolean;
}) {
    return (
        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#C8102E] [&>svg]:h-3.5 [&>svg]:w-3.5">
                {icon}
            </span>

            <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">
                    {label}
                </p>

                <p
                    className={[
                        "mt-0.5 break-words text-sm font-black",

                        success
                            ? "text-emerald-700"
                            : "text-slate-900",

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
        </div>
    );
}

/* =========================================================
   CONTACT
========================================================= */

function ContactDetail({
    icon,
    label,
    value,
    href,
}: {
    icon: ReactNode;
    label: string;
    value: string;
    href: string;
}) {
    return (
        <a
            href={href}
            className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-red-200 hover:bg-red-50"
        >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#C8102E] [&>svg]:h-3.5 [&>svg]:w-3.5">
                {icon}
            </span>

            <div className="min-w-0 flex-1">
                <p className="text-[9px] font-black uppercase text-slate-400">
                    {label}
                </p>

                <p className="mt-0.5 break-all text-sm font-black text-slate-900">
                    {value}
                </p>
            </div>

            <ExternalLink className="h-3.5 w-3.5 text-slate-300" />
        </a>
    );
}

/* =========================================================
   EXPERIENCE
========================================================= */

function ExperienceRow({
    position,
    company,
    startDate,
    endDate,
    description,
}: {
    position?: string | null;
    company?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    description?: string | null;
}) {
    return (
        <article className="py-4">
            <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
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
                                <Building2 className="h-3.5 w-3.5 text-slate-400" />

                                {company ||
                                    "Employer not provided"}
                            </p>
                        </div>

                        {!endDate &&
                            startDate ? (
                            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black uppercase text-emerald-700">
                                <CheckCircle2 className="h-3 w-3" />

                                Current
                            </span>
                        ) : null}
                    </div>

                    <p className="mt-2 text-xs font-bold text-slate-500">
                        {formatWorkPeriod(
                            startDate,
                            endDate,
                        )}
                    </p>

                    {description ? (
                        <p className="mt-2 whitespace-pre-line text-sm font-medium leading-6 text-slate-600">
                            {
                                description
                            }
                        </p>
                    ) : null}
                </div>
            </div>
        </article>
    );
}

/* =========================================================
   EDUCATION
========================================================= */

function EducationRow({
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
        <article className="py-4">
            <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <GraduationCap className="h-4 w-4" />
                </span>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h3 className="text-base font-black text-slate-950">
                                {level ||
                                    "Education Record"}
                            </h3>

                            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-600">
                                <Landmark className="h-3.5 w-3.5 text-slate-400" />

                                {institution ||
                                    "Institution not provided"}
                            </p>
                        </div>

                        {year ? (
                            <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-600">
                                {
                                    year
                                }
                            </span>
                        ) : null}
                    </div>

                    {achievement ? (
                        <p className="mt-2 text-sm font-medium text-slate-600">
                            {
                                achievement
                            }
                        </p>
                    ) : null}
                </div>
            </div>
        </article>
    );
}

/* =========================================================
   CERTIFICATE
========================================================= */

function CertificateRow({
    certificateNumber,
    verificationCode,
    issueDate,
    expiryDate,
    status,
}: {
    certificateNumber: string;
    verificationCode: string;
    issueDate: Date;
    expiryDate: Date;
    status: CertificateStatus;
}) {
    return (
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#C8102E]">
                        <FileCheck2 className="h-4 w-4" />
                    </span>

                    <div>
                        <p className="text-[9px] font-black uppercase text-slate-400">
                            Certificate
                            Number
                        </p>

                        <p className="mt-0.5 font-mono text-sm font-black text-slate-950">
                            {
                                certificateNumber
                            }
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-500">
                            {formatDate(
                                issueDate,
                            )}{" "}
                            –{" "}
                            {formatDate(
                                expiryDate,
                            )}
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
                        href={`/verify/${encodeURIComponent(
                            verificationCode,
                        )}`}
                        className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-white px-3 text-xs font-black text-[#C8102E] shadow-sm transition hover:bg-red-50"
                    >
                        Verify

                        <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </div>
        </article>
    );
}

function CertificateStatusBadge({
    status,
}: {
    status: CertificateStatus;
}) {
    const cls =
        status ===
            "VALID"
            ? "bg-emerald-100 text-emerald-700"
            : status ===
                "UPCOMING"
                ? "bg-blue-100 text-blue-700"
                : "bg-amber-100 text-amber-700";

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-black uppercase ${cls}`}
        >
            {status ===
                "VALID" ? (
                <CheckCircle2 className="h-3 w-3" />
            ) : (
                <Clock3 className="h-3 w-3" />
            )}

            {status}
        </span>
    );
}

/* =========================================================
   EMPTY
========================================================= */

function EmptyState({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white px-5 py-6 text-center">
            <p className="text-sm font-black text-slate-800">
                {title}
            </p>

            <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                {
                    description
                }
            </p>
        </div>
    );
}

/* =========================================================
   BREADCRUMB
========================================================= */

function ProfileBreadcrumb({
    memberName,
}: {
    memberName: string;
}) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-500"
        >
            <Link
                href="/"
                className="inline-flex items-center gap-1.5 transition hover:text-[#C8102E]"
            >
                <Home className="h-3.5 w-3.5" />

                Home
            </Link>

            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />

            <Link
                href="/directory"
                className="transition hover:text-[#C8102E]"
            >
                Member Directory
            </Link>

            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />

            <span
                aria-current="page"
                className="max-w-[220px] truncate text-[#C8102E]"
            >
                {memberName}
            </span>
        </nav>
    );
}

/* =========================================================
   HEADER
========================================================= */

function PageHeader() {
    return (
        <header
            className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur-xl"
            style={
                {
                    "--header-height":
                        "76px",
                } as CSSProperties
            }
        >
            <div className="mx-auto flex h-[74px] max-w-[1700px] items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    aria-label="AHPK homepage"
                    className="shrink-0"
                >
                    <Image
                        src={
                            Logo
                        }
                        alt="Association of Hotel Professionals Kenya"
                        width={
                            76
                        }
                        height={
                            76
                        }
                        priority
                        className="h-[58px] w-[58px] object-contain sm:h-[62px] sm:w-[62px]"
                    />
                </Link>

                <div className="ml-auto flex items-center">
                    <DesktopNavigation />
                </div>
            </div>
        </header>
    );
}

/* =========================================================
   JSON LD
========================================================= */

function MemberProfileJsonLd({
    memberName,
    memberNumber,
    professionalTitle,
    employer,
    county,
    categoryName,
    profileImageUrl,
}: {
    memberName: string;
    memberNumber: string;
    professionalTitle: string;
    employer?: string | null;
    county?: string | null;
    categoryName: string;
    profileImageUrl?: string | null;
}) {
    const structuredData = {
        "@context":
            "https://schema.org",

        "@type":
            "Person",

        name:
            memberName,

        identifier: {
            "@type":
                "PropertyValue",

            name:
                "AHPK Member Number",

            value:
                memberNumber,
        },

        jobTitle:
            professionalTitle,

        image:
            profileImageUrl ||
            undefined,

        worksFor:
            employer
                ? {
                    "@type":
                        "Organization",

                    name:
                        employer,
                }
                : undefined,

        address:
            county
                ? {
                    "@type":
                        "PostalAddress",

                    addressRegion:
                        county,

                    addressCountry:
                        "KE",
                }
                : undefined,

        memberOf: {
            "@type":
                "Organization",

            name:
                "Association of Hotel Professionals Kenya",
        },

        hasCredential: {
            "@type":
                "EducationalOccupationalCredential",

            credentialCategory:
                categoryName,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html:
                    JSON.stringify(
                        structuredData,
                    ).replace(
                        /</g,
                        "\\u003c",
                    ),
            }}
        />
    );
}