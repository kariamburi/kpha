import type {
    Metadata,
} from "next";

import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import Logo from "@/app/assets/logo.png";
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
    CircleUserRound,
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
    Sparkles,
    User,
    Users,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { CSSProperties, ReactNode } from "react";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

type DirectoryProfilePageProps = {
    params: Promise<{
        slug: string;
    }>;
};

function formatDate(
    date?: Date | null,
) {
    if (!date) {
        return "Not provided";
    }

    return new Intl.DateTimeFormat("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);
}

function formatYear(
    date?: Date | null,
) {
    if (!date) {
        return null;
    }

    return new Intl.DateTimeFormat("en-KE", {
        year: "numeric",
    }).format(date);
}

function normalizeMemberNumber(
    slug: string,
) {
    return decodeURIComponent(slug)
        .trim();
}

function formatStatus(
    value?: string | null,
) {
    if (!value) {
        return "Not provided";
    }

    return value
        .replace(/[_-]+/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (character) =>
            character.toUpperCase(),
        );
}

export async function generateMetadata({
    params,
}: DirectoryProfilePageProps): Promise<Metadata> {
    const { slug } = await params;

    const memberNumber =
        normalizeMemberNumber(slug);

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
                isDirectoryVisible: true,
                profileImageUrl: true,

                category: {
                    select: {
                        name: true,
                    },
                },
            },
        });

    if (
        !member ||
        !member.isDirectoryVisible ||
        member.status !== "ACTIVE"
    ) {
        return {
            title: "Member Not Found | AHPK",

            description:
                "The requested AHPK member profile could not be found.",

            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const memberName =
        member.fullName || "AHPK Member";

    const professionalRole =
        member.position ||
        "Hospitality Professional";

    return {
        title: `${memberName} | AHPK Member Directory`,

        description: `${memberName} is an active ${member.category.name} member of the Association of Hotel Professionals Kenya. View their professional membership profile.`,

        alternates: {
            canonical: `/directory/${encodeURIComponent(
                member.memberNumber,
            )}`,
        },

        openGraph: {
            title: `${memberName} | Verified AHPK Member`,

            description: `${professionalRole}${member.employer
                ? ` at ${member.employer}`
                : ""
                }. View the official AHPK member profile.`,

            url: `/directory/${encodeURIComponent(
                member.memberNumber,
            )}`,

            siteName:
                "Association of Hotel Professionals Kenya",

            locale: "en_KE",
            type: "profile",

            images: member.profileImageUrl
                ? [
                    {
                        url: member.profileImageUrl,
                        alt: memberName,
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

export default async function DirectoryProfilePage({
    params,
}: DirectoryProfilePageProps) {
    const { slug } = await params;

    const memberNumber =
        normalizeMemberNumber(slug);

    const member =
        await prisma.member.findUnique({
            where: {
                memberNumber,
            },

            include: {
                category: true,

                educations: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },

                workExperiences: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },

                certificates: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });

    if (
        !member ||
        !member.isDirectoryVisible ||
        member.status !== "ACTIVE"
    ) {
        notFound();
    }

    const memberName =
        member.fullName || "AHPK Member";

    const professionalTitle =
        member.position ||
        "Hospitality Professional";

    const professionalDescription =
        member.employer
            ? `${professionalTitle} at ${member.employer}`
            : professionalTitle;

    const validCertificates =
        member.certificates.filter(
            (certificate) =>
                certificate.expiryDate.getTime() >=
                Date.now(),
        );

    return (
        <main className="min-h-screen bg-white text-slate-950">
            <BreadcrumbJsonLd
                items={[
                    {
                        name: "Home",
                        url: "/",
                    },
                    {
                        name: "Member Directory",
                        url: "/directory",
                    },
                    {
                        name: memberName,
                        url: `/directory/${encodeURIComponent(
                            member.memberNumber,
                        )}`,
                    },
                ]}
            />

            <MemberProfileJsonLd
                memberName={memberName}
                memberNumber={
                    member.memberNumber
                }
                professionalTitle={
                    professionalTitle
                }
                employer={member.employer}
                county={member.county}
                categoryName={
                    member.category.name
                }
                profileImageUrl={
                    member.profileImageUrl
                }
            />

            <PageHeader />

            {/* EDITORIAL PROFILE MASTHEAD */}
            <section className="border-b border-slate-300 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <ProfileBreadcrumb
                        memberName={memberName}
                    />

                    <Link
                        href="/directory"
                        className="group mt-5 inline-flex items-center gap-2 text-sm font-black text-slate-600 transition hover:text-[#C8102E]"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Member Directory
                    </Link>

                    <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
                        <div className="grid gap-6 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-end">
                            <ProfileAvatar
                                imageUrl={member.profileImageUrl}
                                memberName={memberName}
                            />

                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700">
                                        <BadgeCheck className="h-3.5 w-3.5" />
                                        Active Verified Member
                                    </span>

                                    <span className="inline-flex items-center gap-1.5 border border-red-200 bg-red-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#C8102E]">
                                        <Users className="h-3.5 w-3.5" />
                                        {member.category.name}
                                    </span>
                                </div>

                                <h1 className="mt-4 break-words text-4xl font-black leading-[1.03] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                                    {memberName}
                                </h1>

                                <p className="mt-3 text-xl font-black text-[#C8102E]">
                                    {professionalTitle}
                                </p>

                                {member.employer ? (
                                    <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-600 sm:text-base">
                                        <Building2 className="h-4 w-4 shrink-0 text-slate-400" />
                                        {member.employer}
                                    </p>
                                ) : null}

                                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-300 pt-4 text-sm font-bold text-slate-500">
                                    <span className="inline-flex items-center gap-2">
                                        <IdCard className="h-4 w-4 text-[#C8102E]" />

                                        <span className="font-mono font-black text-slate-800">
                                            {member.memberNumber}
                                        </span>
                                    </span>

                                    {member.county ? (
                                        <span className="inline-flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-[#C8102E]" />
                                            {member.county}
                                        </span>
                                    ) : null}

                                    <span className="inline-flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4 text-[#C8102E]" />
                                        Member since {formatDate(member.joinDate)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <ProfileVerificationCard
                            memberNumber={member.memberNumber}
                            categoryName={member.category.name}
                            validCertificateCount={validCertificates.length}
                        />
                    </div>
                </div>
            </section>

            {/* SUMMARY STRIP */}
            <section className="border-b border-slate-300 bg-white">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid border-x border-slate-300 sm:grid-cols-2 lg:grid-cols-4">
                        <ProfileStat
                            icon={<BadgeCheck />}
                            label="Membership Category"
                            value={
                                member.category.name
                            }
                        />

                        <ProfileStat
                            icon={
                                <BriefcaseBusiness />
                            }
                            label="Work Experience"
                            value={`${member.workExperiences.length} record${member.workExperiences
                                .length === 1
                                ? ""
                                : "s"
                                }`}
                        />

                        <ProfileStat
                            icon={<GraduationCap />}
                            label="Education"
                            value={`${member.educations.length} record${member.educations
                                .length === 1
                                ? ""
                                : "s"
                                }`}
                        />

                        <ProfileStat
                            icon={<FileBadge2 />}
                            label="Valid Certificates"
                            value={String(
                                validCertificates.length,
                            )}
                            last
                        />
                    </div>
                </div>
            </section>

            {/* PROFILE CONTENT */}
            <section className="bg-white py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-between">
                        <div className="space-y-0">
                            {/* PROFESSIONAL OVERVIEW */}
                            <ProfileSection
                                icon={
                                    <CircleUserRound />
                                }
                                eyebrow="Professional profile"
                                title="Professional Overview"
                            >
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <OverviewItem
                                        icon={
                                            <BriefcaseBusiness />
                                        }
                                        label="Current Position"
                                        value={
                                            professionalTitle
                                        }
                                    />

                                    <OverviewItem
                                        icon={<Building2 />}
                                        label="Organisation"
                                        value={
                                            member.employer ||
                                            "Not publicly listed"
                                        }
                                    />

                                    <OverviewItem
                                        icon={<MapPin />}
                                        label="County"
                                        value={
                                            member.county ||
                                            "Not publicly listed"
                                        }
                                    />

                                    <OverviewItem
                                        icon={
                                            <BadgeCheck />
                                        }
                                        label="Membership Status"
                                        value={formatStatus(
                                            member.status,
                                        )}
                                    />

                                    <OverviewItem
                                        icon={<Users />}
                                        label="Membership Category"
                                        value={
                                            member.category.name
                                        }
                                    />

                                    <OverviewItem
                                        icon={
                                            <CalendarDays />
                                        }
                                        label="Membership Start Date"
                                        value={formatDate(
                                            member.joinDate,
                                        )}
                                    />
                                </div>
                            </ProfileSection>

                            {/* EXPERIENCE */}
                            <ProfileSection
                                icon={
                                    <BriefcaseBusiness />
                                }
                                eyebrow="Career history"
                                title="Professional Experience"
                                count={
                                    member.workExperiences
                                        .length
                                }
                            >
                                {member.workExperiences
                                    .length > 0 ? (
                                    <div className="relative">
                                        <div className="absolute bottom-6 left-[19px] top-6 hidden w-px bg-slate-200 sm:block" />

                                        <div className="space-y-5">
                                            {member.workExperiences.map(
                                                (
                                                    item,
                                                    index,
                                                ) => (
                                                    <TimelineItem
                                                        key={
                                                            item.id
                                                        }
                                                        icon={
                                                            <BriefcaseBusiness />
                                                        }
                                                        title={
                                                            item.position ||
                                                            "Professional Experience"
                                                        }
                                                        subtitle={
                                                            item.company ||
                                                            "Organisation not listed"
                                                        }
                                                        period={formatWorkPeriod(
                                                            item.year,
                                                            item.startDate,
                                                            item.endDate,
                                                        )}
                                                        current={
                                                            !item.endDate
                                                        }
                                                        first={
                                                            index ===
                                                            0
                                                        }
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <EmptyState
                                        icon={
                                            <BriefcaseBusiness />
                                        }
                                        title="No work experience listed"
                                        description="This member has not made any professional experience records publicly available."
                                    />
                                )}
                            </ProfileSection>

                            {/* EDUCATION */}
                            <ProfileSection
                                icon={
                                    <GraduationCap />
                                }
                                eyebrow="Academic background"
                                title="Education and Qualifications"
                                count={
                                    member.educations
                                        .length
                                }
                            >
                                {member.educations.length >
                                    0 ? (
                                    <div className="grid gap-4">
                                        {member.educations.map(
                                            (item) => (
                                                <EducationCard
                                                    key={
                                                        item.id
                                                    }
                                                    level={
                                                        item.level ||
                                                        "Education Record"
                                                    }
                                                    institution={
                                                        item.institution ||
                                                        "Institution not listed"
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
                                        title="No education records listed"
                                        description="This member has not made any education or qualification records publicly available."
                                    />
                                )}
                            </ProfileSection>

                            {/* CERTIFICATES */}
                            <ProfileSection
                                icon={
                                    <FileBadge2 />
                                }
                                eyebrow="Official credentials"
                                title="AHPK Certificates"
                                count={
                                    member.certificates
                                        .length
                                }
                            >
                                {member.certificates
                                    .length > 0 ? (
                                    <div className="grid gap-4">
                                        {member.certificates.map(
                                            (
                                                certificate,
                                            ) => {
                                                const expired =
                                                    certificate.expiryDate.getTime() <
                                                    Date.now();

                                                return (
                                                    <CertificateCard
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
                                                        expired={
                                                            expired
                                                        }
                                                    />
                                                );
                                            },
                                        )}
                                    </div>
                                ) : (
                                    <EmptyState
                                        icon={
                                            <FileBadge2 />
                                        }
                                        title="No certificates listed"
                                        description="No certificate records are currently displayed on this professional profile."
                                    />
                                )}
                            </ProfileSection>
                        </div>

                        {/* SIDEBAR */}
                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <ContactCard
                                memberName={memberName}
                                email={member.email}
                                phone={member.phone}
                            />

                            <MembershipCard
                                memberNumber={
                                    member.memberNumber
                                }
                                category={
                                    member.category.name
                                }
                                status={member.status}
                                joinDate={
                                    member.joinDate
                                }
                            />

                            <VerificationNotice />

                            <div className="grid gap-3">
                                <Link
                                    href="/directory"
                                    className="flex min-h-12 items-center justify-center gap-2 border border-slate-300 bg-white px-5 text-sm font-extrabold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-[#C8102E] hover:bg-red-50 hover:text-[#C8102E]"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Member Directory
                                </Link>

                                <Link
                                    href="/contact"
                                    className="flex min-h-12 items-center justify-center gap-2 bg-[#C8102E] px-5 text-sm font-extrabold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-100"
                                >
                                    Contact AHPK
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* PROFESSIONAL DIRECTORY CTA */}
            <section className="border-t border-slate-300 bg-white py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid border-t-4 border-[#C8102E] bg-slate-50 lg:grid-cols-[minmax(0,1fr)_300px]">
                        <div className="p-5 sm:p-6">
                            <div className="flex h-12 w-12 items-center justify-center bg-white text-[#C8102E]">
                                <Users className="h-6 w-6" />
                            </div>

                            <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                AHPK professional network
                            </p>

                            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                                Discover more verified
                                hospitality professionals.
                            </h2>

                            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                Browse active professional
                                members of the Association of
                                Hotel Professionals Kenya by
                                name, category, employer,
                                position or location.
                            </p>
                        </div>

                        <div className="flex items-center border-t border-slate-300 bg-slate-950 p-5 lg:border-l lg:border-t-0">
                            <Link
                                href="/directory"
                                className="flex min-h-12 w-full items-center justify-center gap-2 bg-[#C8102E] px-5 text-sm font-extrabold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-red-800"
                            >
                                Browse Member Directory

                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}

function ProfileAvatar({
    imageUrl,
    memberName,
}: {
    imageUrl?: string | null;
    memberName: string;
}) {
    return (
        <div className="relative shrink-0">
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden border-t-4 border-[#C8102E] bg-slate-100 sm:h-40 sm:w-40">
                {imageUrl ? (
                    // Native img avoids requiring every
                    // profile-image domain in next.config.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imageUrl}
                        alt={memberName}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <User className="h-16 w-16 text-slate-300 sm:h-20 sm:w-20" />
                )}
            </div>

            <span
                className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center border-4 border-white bg-emerald-600 text-white"
                title="Verified AHPK member"
            >
                <Check className="h-5 w-5" />
            </span>
        </div>
    );
}

function ProfileVerificationCard({
    memberNumber,
    categoryName,
    validCertificateCount,
}: {
    memberNumber: string;
    categoryName: string;
    validCertificateCount: number;
}) {
    return (
        <div className="border-t-4 border-emerald-600 bg-slate-50 p-5">
            <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-emerald-600 text-white">
                    <ShieldCheck className="h-6 w-6" />
                </span>

                <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
                        Verified Membership
                    </p>

                    <h2 className="mt-2 text-xl font-extrabold text-slate-950">
                        Active AHPK Record
                    </h2>

                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
                        This profile matches an active,
                        publicly visible AHPK membership
                        record.
                    </p>
                </div>
            </div>

            <div className="mt-5 space-y-3 border-t border-slate-300 pt-5">
                <CompactDetail
                    label="Member Number"
                    value={memberNumber}
                    mono
                />

                <CompactDetail
                    label="Category"
                    value={categoryName}
                />

                <CompactDetail
                    label="Valid Certificates"
                    value={String(
                        validCertificateCount,
                    )}
                />
            </div>
        </div>
    );
}

function ProfileStat({
    icon,
    label,
    value,
    last = false,
}: {
    icon: ReactNode;
    label: string;
    value: string;
    last?: boolean;
}) {
    return (
        <div
            className={[
                "group flex items-center gap-3 p-4 transition hover:bg-red-50/60 sm:p-5",
                !last
                    ? "border-b border-slate-300 sm:border-b-0 sm:border-r"
                    : "",
            ].join(" ")}
        >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-slate-950 text-white transition group-hover:bg-[#C8102E] [&>svg]:h-5 [&>svg]:w-5">
                {icon}
            </span>

            <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                    {label}
                </p>

                <p className="mt-1 truncate text-sm font-extrabold text-slate-900">
                    {value}
                </p>
            </div>
        </div>
    );
}
function PageHeader() {
    return (
        <header
            className="sticky top-0 z-[60] border-b border-slate-300 bg-white/95 backdrop-blur-xl"
            style={
                {
                    "--header-height": "88px",
                } as CSSProperties
            }
        >
            <div className="mx-auto flex h-[82px] max-w-[1700px] items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    aria-label="AHPK homepage"
                    className="shrink-0"
                >
                    <Image
                        src={Logo}
                        alt="Association of Hotel Professionals Kenya"
                        width={92}
                        height={92}
                        priority
                        className="h-[66px] w-[66px] object-contain sm:h-[72px] sm:w-[72px]"
                    />
                </Link>

                <div className="ml-auto flex items-center">
                    <DesktopNavigation />
                </div>
            </div>
        </header>
    );
}
function ProfileSection({
    icon,
    eyebrow,
    title,
    count,
    children,
}: {
    icon: ReactNode;
    eyebrow: string;
    title: string;
    count?: number;
    children: ReactNode;
}) {
    return (
        <section className="border-t border-slate-300 py-8 first:border-t-4 first:border-[#C8102E] first:pt-4">
            <header className="flex flex-col gap-4 border-b border-slate-300 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white [&>svg]:h-5 [&>svg]:w-5">
                        {icon}
                    </span>

                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                            {eyebrow}
                        </p>

                        <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">
                            {title}
                        </h2>
                    </div>
                </div>

                {typeof count === "number" ? (
                    <span className="inline-flex w-fit items-center bg-slate-100 px-3 py-1.5 text-xs font-extrabold text-slate-600">
                        {count} record
                        {count === 1 ? "" : "s"}
                    </span>
                ) : null}
            </header>

            <div className="pt-5">
                {children}
            </div>
        </section>
    );
}

function OverviewItem({
    icon,
    label,
    value,
}: {
    icon: ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="group flex items-start gap-3 border-b border-slate-300 py-4 transition hover:bg-red-50/50 sm:px-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-slate-950 text-white transition group-hover:bg-[#C8102E] [&>svg]:h-4 [&>svg]:w-4">
                {icon}
            </span>

            <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                    {label}
                </p>

                <p className="mt-1 break-words text-sm font-extrabold leading-6 text-slate-900">
                    {value}
                </p>
            </div>
        </div>
    );
}

function TimelineItem({
    icon,
    title,
    subtitle,
    period,
    current = false,
}: {
    icon: ReactNode;
    title: string;
    subtitle: string;
    period: string;
    current?: boolean;
    first?: boolean;
}) {
    return (
        <article className="group relative flex gap-4 border-b border-slate-300 py-5">
            <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center bg-slate-950 text-white transition group-hover:bg-[#C8102E] [&>svg]:h-4 [&>svg]:w-4">
                {icon}
            </span>

            <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h3 className="text-base font-extrabold text-slate-950">
                            {title}
                        </h3>

                        <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-600">
                            <Building2 className="h-4 w-4 shrink-0 text-slate-400" />
                            {subtitle}
                        </p>
                    </div>

                    {current ? (
                        <span className="inline-flex w-fit items-center gap-1.5 bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-700">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Current
                        </span>
                    ) : null}
                </div>

                <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-slate-500">
                    <CalendarDays className="h-4 w-4 text-[#C8102E]" />
                    {period}
                </p>
            </div>
        </article>
    );
}

function EducationCard({
    level,
    institution,
    year,
    achievement,
}: {
    level: string;
    institution: string;
    year?: string | null;
    achievement?: string | null;
}) {
    return (
        <article className="group border-b border-slate-300 py-5">
            <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-[#C8102E]">
                    <GraduationCap className="h-5 w-5" />
                </span>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h3 className="text-base font-extrabold text-slate-950">
                                {level}
                            </h3>

                            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-600">
                                <Landmark className="h-4 w-4 shrink-0 text-slate-400" />
                                {institution}
                            </p>
                        </div>

                        {year ? (
                            <span className="inline-flex w-fit items-center bg-white px-3 py-1 text-xs font-extrabold text-slate-600">
                                {year}
                            </span>
                        ) : null}
                    </div>

                    {achievement ? (
                        <div className="mt-4 border border-slate-300 bg-white px-4 py-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                                Achievement
                            </p>

                            <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
                                {achievement}
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>
        </article>
    );
}

function CertificateCard({
    certificateNumber,
    verificationCode,
    issueDate,
    expiryDate,
    expired,
}: {
    certificateNumber: string;
    verificationCode: string;
    issueDate: Date;
    expiryDate: Date;
    expired: boolean;
}) {
    return (
        <article
            className={[
                "border-l-4 p-5",
                expired
                    ? "border-amber-200 bg-amber-50/70"
                    : "border-emerald-200 bg-emerald-50/60",
            ].join(" ")}
        >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                    <span
                        className={[
                            "flex h-11 w-11 shrink-0 items-center justify-center  bg-white ",
                            expired
                                ? "text-amber-700"
                                : "text-emerald-700",
                        ].join(" ")}
                    >
                        <FileCheck2 className="h-5 w-5" />
                    </span>

                    <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                            Certificate Number
                        </p>

                        <h3 className="mt-1 break-all font-mono text-base font-extrabold text-slate-950">
                            {certificateNumber}
                        </h3>

                        <p className="mt-3 text-xs font-semibold text-slate-500">
                            Issued {formatDate(issueDate)}
                        </p>

                        <p
                            className={[
                                "mt-1 text-xs font-extrabold",
                                expired
                                    ? "text-amber-700"
                                    : "text-emerald-700",
                            ].join(" ")}
                        >
                            {expired
                                ? `Expired ${formatDate(
                                    expiryDate,
                                )}`
                                : `Valid until ${formatDate(
                                    expiryDate,
                                )}`}
                        </p>
                    </div>
                </div>

                <span
                    className={[
                        "inline-flex w-fit items-center gap-1.5  px-3 py-1.5 text-[10px] font-black uppercase tracking-wide",
                        expired
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-700",
                    ].join(" ")}
                >
                    {expired ? (
                        <Clock3 className="h-3.5 w-3.5" />
                    ) : (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                    )}

                    {expired ? "Expired" : "Valid"}
                </span>
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-current/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                        Verification Code
                    </p>

                    <p className="mt-1 break-all font-mono text-xs font-extrabold text-slate-700">
                        {verificationCode}
                    </p>
                </div>

                <Link
                    href={`/verify/${encodeURIComponent(
                        verificationCode,
                    )}`}
                    className="inline-flex min-h-10 items-center justify-center gap-2 bg-white px-4 text-xs font-extrabold text-[#C8102E] transition hover:bg-red-50"
                >
                    Verify Certificate
                    <ExternalLink className="h-3.5 w-3.5" />
                </Link>
            </div>
        </article>
    );
}

function ContactCard({
    memberName,
    email,
    phone,
}: {
    memberName: string;
    email?: string | null;
    phone?: string | null;
}) {
    const hasContact =
        Boolean(email) || Boolean(phone);

    return (
        <section className="border-t border-slate-300 py-8 first:border-t-4 first:border-[#C8102E] first:pt-4">
            <header className="border-b border-slate-300 py-3">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                    Professional contact
                </p>

                <h2 className="mt-2 text-xl font-extrabold text-slate-950">
                    Contact Details
                </h2>
            </header>

            <div className="py-5">
                {hasContact ? (
                    <div className="space-y-3">
                        {email ? (
                            <ContactItem
                                icon={<Mail />}
                                label="Email Address"
                                value={email}
                                href={`mailto:${email}`}
                            />
                        ) : null}

                        {phone ? (
                            <ContactItem
                                icon={<Phone />}
                                label="Phone Number"
                                value={phone}
                                href={`tel:${phone}`}
                            />
                        ) : null}
                    </div>
                ) : (
                    <div className="bg-slate-50 p-5 text-center">
                        <Mail className="mx-auto h-6 w-6 text-slate-300" />

                        <p className="mt-3 text-sm font-extrabold text-slate-700">
                            Contact information is private
                        </p>

                        <p className="mt-2 text-xs font-medium leading-6 text-slate-500">
                            This member has not made direct
                            contact details publicly
                            available.
                        </p>
                    </div>
                )}

                <p className="mt-5 text-xs font-medium leading-6 text-slate-500">
                    Contact information is displayed as
                    supplied and approved by {memberName}.
                </p>
            </div>
        </section>
    );
}

function ContactItem({
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
            className="group flex items-start gap-3 border border-slate-300 bg-slate-50 p-4 transition hover:border-red-200 hover:bg-red-50"
        >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-slate-950 text-white transition group-hover:bg-[#C8102E] [&>svg]:h-4 [&>svg]:w-4">
                {icon}
            </span>

            <div className="min-w-0 flex-1">
                <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                    {label}
                </p>

                <p className="mt-1 break-all text-sm font-extrabold text-slate-900">
                    {value}
                </p>
            </div>

            <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-[#C8102E]" />
        </a>
    );
}

function MembershipCard({
    memberNumber,
    category,
    status,
    joinDate,
}: {
    memberNumber: string;
    category: string;
    status: string;
    joinDate: Date;
}) {
    return (
        <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
            <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center bg-red-50 text-[#C8102E]">
                    <IdCard className="h-5 w-5" />
                </span>

                <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#C8102E]">
                        Membership record
                    </p>

                    <h2 className="mt-1 text-lg font-extrabold text-slate-950">
                        AHPK Membership
                    </h2>
                </div>
            </div>

            <div className="mt-5 divide-y divide-slate-200">
                <SidebarDetail
                    label="Member Number"
                    value={memberNumber}
                    mono
                />

                <SidebarDetail
                    label="Category"
                    value={category}
                />

                <SidebarDetail
                    label="Status"
                    value={formatStatus(
                        status,
                    )}
                    success
                />

                <SidebarDetail
                    label="Joined"
                    value={formatDate(
                        joinDate,
                    )}
                />
            </div>
        </section>
    );
}

function VerificationNotice() {
    return (
        <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
            <div className="flex h-11 w-11 items-center justify-center bg-white text-[#C8102E]">
                <ShieldCheck className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-lg font-extrabold text-slate-950">
                Official Directory Record
            </h2>

            <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                This profile is generated from official
                AHPK membership records. Only information
                approved for public directory display is
                shown.
            </p>

            <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
            >
                Request additional verification
                <ChevronRight className="h-4 w-4" />
            </Link>
        </section>
    );
}

function CompactDetail({
    label,
    value,
    mono = false,
}: {
    label: string;
    value: string;
    mono?: boolean;
}) {
    return (
        <div className="flex items-start justify-between gap-4">
            <span className="text-xs font-semibold text-slate-500">
                {label}
            </span>

            <span
                className={[
                    "text-right text-xs font-extrabold text-slate-900",
                    mono ? "font-mono" : "",
                ].join(" ")}
            >
                {value}
            </span>
        </div>
    );
}

function SidebarDetail({
    label,
    value,
    mono = false,
    success = false,
}: {
    label: string;
    value: string;
    mono?: boolean;
    success?: boolean;
}) {
    return (
        <div className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
            <p className="text-xs font-semibold text-slate-500">
                {label}
            </p>

            <p
                className={[
                    "max-w-[60%] break-words text-right text-xs font-extrabold",
                    mono
                        ? "font-mono text-slate-900"
                        : success
                            ? "text-emerald-700"
                            : "text-slate-900",
                ].join(" ")}
            >
                {value}
            </p>
        </div>
    );
}

function EmptyState({
    icon,
    title,
    description,
}: {
    icon: ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center bg-white text-slate-300 [&>svg]:h-6 [&>svg]:w-6">
                {icon}
            </span>

            <h3 className="mt-5 text-base font-extrabold text-slate-800">
                {title}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-slate-500">
                {description}
            </p>
        </div>
    );
}

function ProfileBreadcrumb({
    memberName,
}: {
    memberName: string;
}) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500"
        >
            <Link
                href="/"
                className="inline-flex items-center gap-2 transition hover:text-[#C8102E]"
            >
                <Home className="h-4 w-4" />
                Home
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-300" />

            <Link
                href="/directory"
                className="transition hover:text-[#C8102E]"
            >
                Member Directory
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-300" />

            <span
                aria-current="page"
                className="max-w-[220px] truncate text-[#C8102E] sm:max-w-md"
            >
                {memberName}
            </span>
        </nav>
    );
}

function formatWorkPeriod(
    year?: string | null,
    startDate?: Date | null,
    endDate?: Date | null,
) {
    if (startDate) {
        return `${formatDate(
            startDate,
        )} – ${endDate
            ? formatDate(endDate)
            : "Present"
            }`;
    }

    if (year) {
        return year;
    }

    return "Period not provided";
}

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
        "@context": "https://schema.org",
        "@type": "Person",
        name: memberName,
        identifier: {
            "@type": "PropertyValue",
            name: "AHPK Member Number",
            value: memberNumber,
        },
        jobTitle: professionalTitle,
        image:
            profileImageUrl || undefined,
        worksFor: employer
            ? {
                "@type": "Organization",
                name: employer,
            }
            : undefined,
        address: county
            ? {
                "@type": "PostalAddress",
                addressRegion: county,
                addressCountry: "KE",
            }
            : undefined,
        memberOf: {
            "@type": "Organization",
            name: "Association of Hotel Professionals Kenya",
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
                __html: JSON.stringify(
                    structuredData,
                ).replace(
                    /</g,
                    "\\u003c",
                ),
            }}
        />
    );
}