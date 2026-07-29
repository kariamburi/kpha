// app/gallery/page.tsx

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  Camera,
  ChevronRight,
  Film,
  Home,
  Images,
  Play,
  PlayCircle,
  Sparkles,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";
import { prisma } from "@/lib/prisma";

import {
  dateText,
  excerpt,
  galleryCategory,
  galleryFilters,
  galleryType,
} from "@/app/lib/public-content";

const pagePath = "/gallery";

export const metadata: Metadata = {
  title: "Gallery | Association of Hotel Professionals Kenya",

  description:
    "Explore AHPK photo and video albums from conferences, AGMs, training programmes, awards, community activities and professional events.",

  keywords: [
    "AHPK gallery",
    "AHPK photos",
    "AHPK videos",
    "hospitality events Kenya",
    "hotel professionals Kenya",
    "AHPK conferences",
    "AHPK training",
    "AHPK AGM",
  ],

  alternates: {
    canonical: pagePath,
  },

  openGraph: {
    title:
      "Gallery | Association of Hotel Professionals Kenya",
    description:
      "Explore official AHPK photo and video albums from conferences, AGMs, professional training, awards and hospitality events.",
    url: pagePath,
    siteName:
      "Association of Hotel Professionals Kenya",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/gallery-hero.webp",
        width: 1536,
        height: 1024,
        alt: "AHPK hospitality professionals attending an association event",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AHPK Photo & Video Gallery",
    description:
      "View official AHPK albums from conferences, training programmes, AGMs, awards and professional events.",
    images: ["/gallery-hero.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

type GalleryPageProps = {
  searchParams: Promise<{
    type?: string;
    category?: string;
  }>;
};

export default async function GalleryPage({
  searchParams,
}: GalleryPageProps) {
  const query = await searchParams;

  const type = galleryType(query.type);
  const category = galleryCategory(query.category);

  const albums = await prisma.galleryAlbum.findMany({
    where: {
      published: true,

      ...(category
        ? {
          category,
        }
        : {}),

      ...(type
        ? {
          items: {
            some: {
              type,
            },
          },
        }
        : {}),
    },

    orderBy: [
      {
        featured: "desc",
      },
      {
        order: "asc",
      },
      {
        createdAt: "desc",
      },
    ],

    include: {
      items: {
        orderBy: {
          order: "asc",
        },
        take: 4,
      },

      _count: {
        select: {
          items: true,
        },
      },
    },
  });

  const activeHref = query.type
    ? `/gallery?type=${query.type}`
    : query.category
      ? `/gallery?category=${query.category}`
      : "/gallery";

  const featuredAlbum =
    albums.find((album) => album.featured) ??
    albums[0] ??
    null;

  const remainingAlbums = featuredAlbum
    ? albums.filter(
      (album) =>
        album.id !== featuredAlbum.id,
    )
    : [];

  const totalMediaItems = albums.reduce(
    (total, album) =>
      total + album._count.items,
    0,
  );

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <GalleryJsonLd albums={albums} />

      <PageHeader />

      <GalleryHero
        activeHref={activeHref}
        albumsCount={albums.length}
        totalMediaItems={totalMediaItems}
      />

      <GalleryContent
        albums={albums}
        featuredAlbum={featuredAlbum}
        remainingAlbums={remainingAlbums}
      />

      <PublicFooter />
    </main>
  );
}

function GalleryHero({
  activeHref,
  albumsCount,
  totalMediaItems,
}: {
  activeHref: string;
  albumsCount: number;
  totalMediaItems: number;
}) {
  const albumsLabel =
    albumsCount === 1
      ? "1 published album"
      : `${albumsCount} published albums`;

  const mediaLabel =
    totalMediaItems === 1
      ? "1 media item"
      : `${totalMediaItems} media items`;

  return (
    <section className="relative isolate min-h-[calc(100vh-82px)] overflow-hidden border-b border-slate-200 bg-white lg:min-h-[calc(100svh-82px)]">
      {/* Background image */}
      <div className="absolute inset-0 -z-30">
        <img
          src="/gallery-hero.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center lg:object-right"
        />
      </div>

      {/* Desktop fade */}
      <div className="absolute inset-0 -z-20 hidden bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_30%,rgba(255,255,255,0.98)_43%,rgba(255,255,255,0.91)_56%,rgba(255,255,255,0.64)_71%,rgba(255,255,255,0.2)_88%,rgba(255,255,255,0)_100%)] lg:block" />

      {/* Mobile fade */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.96)_58%,rgba(255,255,255,0.83)_80%,rgba(255,255,255,0.58)_100%)] lg:hidden" />

      {/* Right-side image contrast */}
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-[27%] bg-gradient-to-l from-slate-950/20 to-transparent lg:block" />

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-28 top-4 -z-10 h-96 w-96 rounded-full bg-red-100/70 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-82px)] max-w-7xl flex-col px-5 py-7 sm:px-6 sm:py-8 lg:min-h-[calc(100svh-82px)] lg:px-8 lg:py-10">
        <Breadcrumb />

        <div className="flex flex-1 items-center py-8 sm:py-10 lg:py-6">
          <div className="max-w-3xl lg:w-[61%]">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-white/90 text-[#C8102E] shadow-sm backdrop-blur sm:h-12 sm:w-12">
                <Images className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#C8102E] sm:text-[11px]">
                  AHPK Media Gallery
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                  Capturing our professional journey
                </p>
              </div>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:mt-7 sm:text-5xl lg:text-6xl xl:text-7xl">
              Moments That

              <span className="mt-2 block text-[#C8102E]">
                Define AHPK
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
              Explore photo and video albums from
              AHPK conferences, annual general
              meetings, training programmes,
              awards, community activities and
              hospitality industry events.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
              {galleryFilters.map(
                (filter) => {
                  const isActive =
                    filter.href ===
                    activeHref;

                  return (
                    <Link
                      key={
                        filter.href
                      }
                      href={
                        filter.href
                      }
                      aria-current={
                        isActive
                          ? "page"
                          : undefined
                      }
                      className={
                        isActive
                          ? "rounded-full border border-[#C8102E] bg-[#C8102E] px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white shadow-sm transition sm:px-5 sm:text-[11px]"
                          : "rounded-full border border-slate-200 bg-white/85 px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-700 shadow-sm backdrop-blur transition hover:border-red-200 hover:bg-red-50 hover:text-[#C8102E] sm:px-5 sm:text-[11px]"
                      }
                    >
                      {
                        filter.label
                      }
                    </Link>
                  );
                },
              )}
            </div>

            <div className="mt-7 max-w-xl border-l-4 border-[#C8102E] bg-white/80 py-3 pl-5 pr-4 backdrop-blur-sm sm:mt-8">
              <p className="text-sm font-bold leading-6 text-slate-700">
                {albumsLabel} containing{" "}
                {mediaLabel}. All content
                displayed here is published
                through the official AHPK
                gallery.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent sm:h-20" />
    </section>
  );
}

function GalleryContent({
  albums,
  featuredAlbum,
  remainingAlbums,
}: {
  albums: GalleryAlbum[];
  featuredAlbum: GalleryAlbum | null;
  remainingAlbums: GalleryAlbum[];
}) {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
              Photo and video archive
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Explore the AHPK Gallery
            </h2>

            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
              Discover memorable moments,
              professional connections and
              important milestones from AHPK
              programmes and activities.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Camera className="h-5 w-5 text-[#C8102E]" />

            <span className="text-sm font-extrabold text-slate-700">
              {albums.length} albums
            </span>
          </div>
        </div>

        {albums.length === 0 ? (
          <EmptyGallery />
        ) : (
          <>
            {featuredAlbum && (
              <FeaturedAlbumCard
                album={featuredAlbum}
              />
            )}

            {remainingAlbums.length >
              0 && (
                <div className="mt-12">
                  <div className="mb-7 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                        More collections
                      </p>

                      <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                        Gallery Albums
                      </h2>
                    </div>

                    <Images className="h-8 w-8 text-slate-200" />
                  </div>

                  <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                    {remainingAlbums.map(
                      (album) => (
                        <AlbumCard
                          key={
                            album.id
                          }
                          album={
                            album
                          }
                        />
                      ),
                    )}
                  </div>
                </div>
              )}
          </>
        )}
      </div>
    </section>
  );
}

function FeaturedAlbumCard({
  album,
}: {
  album: GalleryAlbum;
}) {
  const cover = getAlbumCover(album);
  const hasYouTube = album.items.some(
    (item) => item.type === "YOUTUBE",
  );

  return (
    <article className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm transition hover:border-red-100 hover:shadow-xl">
      <Link
        href={`/gallery/${album.slug}`}
        className="grid lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="relative min-h-[340px] overflow-hidden bg-slate-200 sm:min-h-[460px]">
          {cover ? (
            <img
              src={cover}
              alt={album.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <GalleryPlaceholder />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />

          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#C8102E] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-lg">
              <Sparkles className="h-3.5 w-3.5" />
              Featured Album
            </span>

            {hasYouTube && (
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white backdrop-blur">
                <Play className="h-3.5 w-3.5 fill-current" />
                Includes Video
              </span>
            )}
          </div>

          <div className="absolute bottom-5 left-5">
            <span className="rounded-full bg-black/70 px-4 py-2 text-xs font-extrabold text-white backdrop-blur">
              {formatItemsCount(
                album._count.items,
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <CategoryBadge
              category={album.category}
            />

            <time className="inline-flex items-center gap-2 text-xs font-bold text-slate-400">
              <CalendarDays className="h-4 w-4 text-[#C8102E]" />

              {dateText(
                album.eventDate ||
                album.createdAt,
              )}
            </time>
          </div>

          <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 transition group-hover:text-[#C8102E] sm:text-4xl">
            {album.title}
          </h2>

          {album.description && (
            <p className="mt-5 text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
              {excerpt(
                album.description,
                240,
              )}
            </p>
          )}

          <div className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]">
            Explore this album

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  );
}

function AlbumCard({
  album,
}: {
  album: GalleryAlbum;
}) {
  const cover = getAlbumCover(album);

  const hasYouTube = album.items.some(
    (item) => item.type === "YOUTUBE",
  );

  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-xl">
      <Link
        href={`/gallery/${album.slug}`}
        className="block h-full"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
          {cover ? (
            <img
              src={cover}
              alt={album.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <GalleryPlaceholder />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
            <CategoryBadge
              category={album.category}
              floating
            />

            {hasYouTube && (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/75 text-white shadow-lg backdrop-blur">
                <Play className="h-4 w-4 fill-current" />
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-xs font-extrabold text-white backdrop-blur">
              <Images className="h-4 w-4" />

              {formatItemsCount(
                album._count.items,
              )}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-7">
          <time className="inline-flex items-center gap-2 text-xs font-bold text-slate-400">
            <CalendarDays className="h-4 w-4 text-[#C8102E]" />

            {dateText(
              album.eventDate ||
              album.createdAt,
            )}
          </time>

          <h2 className="mt-4 text-xl font-extrabold leading-tight text-slate-950 transition group-hover:text-[#C8102E]">
            {album.title}
          </h2>

          {album.description && (
            <p className="mt-3 text-sm font-medium leading-7 text-slate-500">
              {excerpt(
                album.description,
                135,
              )}
            </p>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
            <span className="text-sm font-extrabold text-[#C8102E]">
              View album
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-[#C8102E] transition group-hover:bg-[#C8102E] group-hover:text-white">
              <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function CategoryBadge({
  category,
  floating = false,
}: {
  category: string;
  floating?: boolean;
}) {
  return (
    <span
      className={
        floating
          ? "rounded-full bg-white/90 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#C8102E] shadow-sm backdrop-blur"
          : "inline-flex rounded-full bg-red-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#C8102E]"
      }
    >
      {formatCategory(category)}
    </span>
  );
}

function GalleryPlaceholder() {
  return (
    <div className="flex h-full min-h-[280px] items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-[#8f0d16] text-white">
      <Images className="h-14 w-14" />
    </div>
  );
}

function EmptyGallery() {
  return (
    <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center sm:px-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
        <Images className="h-8 w-8" />
      </div>

      <h2 className="mt-6 text-2xl font-extrabold text-slate-950">
        Gallery albums are coming soon
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-7 text-slate-600 sm:text-base">
        Published photo and video albums will appear
        here automatically after they are added through
        the Gallery dashboard.
      </p>

      <Link
        href="/events"
        className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white transition hover:bg-red-700"
      >
        Explore AHPK Events
      </Link>
    </div>
  );
}

function PageHeader() {
  return (
    <header
      className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur-xl"
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

function Breadcrumb() {
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

      <span
        className="text-[#C8102E]"
        aria-current="page"
      >
        Gallery
      </span>
    </nav>
  );
}

function getAlbumCover(album: GalleryAlbum) {
  if (album.coverImageUrl) {
    return album.coverImageUrl;
  }

  const firstImage = album.items.find(
    (item) =>
      item.type === "IMAGE" &&
      item.imageUrl,
  );

  if (firstImage?.imageUrl) {
    return firstImage.imageUrl;
  }

  const firstThumbnail = album.items.find(
    (item) => item.thumbnailUrl,
  );

  return firstThumbnail?.thumbnailUrl ?? null;
}

function formatCategory(category: string) {
  return category
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

function formatItemsCount(count: number) {
  return count === 1
    ? "1 item"
    : `${count} items`;
}

type GalleryAlbum = Awaited<
  ReturnType<typeof getGalleryAlbumsType>
>[number];

async function getGalleryAlbumsType() {
  return prisma.galleryAlbum.findMany({
    include: {
      items: {
        orderBy: {
          order: "asc",
        },
        take: 4,
      },

      _count: {
        select: {
          items: true,
        },
      },
    },
  });
}

function GalleryJsonLd({
  albums,
}: {
  albums: GalleryAlbum[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id":
      "https://ahpk.or.ke/gallery#collection",
    url: "https://ahpk.or.ke/gallery",
    name: "AHPK Photo and Video Gallery",
    description:
      "Official AHPK photo and video albums from conferences, AGMs, training programmes, awards and hospitality events.",
    inLanguage: "en-KE",

    publisher: {
      "@type": "Organization",
      "@id":
        "https://ahpk.or.ke/#organization",
      name:
        "Association of Hotel Professionals Kenya",
      alternateName: "AHPK",
      url: "https://ahpk.or.ke",
    },

    mainEntity: {
      "@type": "ItemList",

      itemListElement: albums.map(
        (album, index) => ({
          "@type": "ListItem",
          position: index + 1,

          item: {
            "@type": "ImageGallery",
            name: album.title,
            url: `https://ahpk.or.ke/gallery/${album.slug}`,
            description:
              album.description ||
              undefined,
            image:
              getAlbumCover(album) ||
              undefined,
            dateCreated:
              album.createdAt.toISOString(),
            numberOfItems:
              album._count.items,
          },
        }),
      ),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}