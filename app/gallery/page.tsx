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
    <section className="border-b border-slate-300 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
        <Breadcrumb />

        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-10">
          <div className="max-w-4xl">
            <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
              AHPK Media Gallery
            </p>

            <h1 className="mt-3 text-4xl font-black leading-[1.03] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
              Moments That Define AHPK
            </h1>

            <p className="mt-4 max-w-3xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
              Explore official photo and video albums from
              conferences, annual general meetings, training
              programmes, awards, community activities and
              hospitality industry events.
            </p>
          </div>

          <div className="border-l-4 border-[#C8102E] pl-4">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
              Published archive
            </p>

            <p className="mt-1 text-lg font-black leading-7 text-slate-950">
              {albumsLabel}
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-500">
              {mediaLabel}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-300 pt-4">
          {galleryFilters.map((filter) => {
            const isActive = filter.href === activeHref;

            return (
              <Link
                key={filter.href}
                href={filter.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "border-b-2 border-[#C8102E] pb-1 text-xs font-black uppercase tracking-[0.14em] text-[#C8102E]"
                    : "border-b-2 border-transparent pb-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500 transition hover:border-slate-300 hover:text-slate-950"
                }
              >
                {filter.label}
              </Link>
            );
          })}
        </div>
      </div>
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
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-t-4 border-[#C8102E] pb-4 pt-4 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <SectionLabel>Photo and video archive</SectionLabel>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Explore the AHPK Gallery
            </h2>

            <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-slate-600">
              Discover memorable moments, professional
              connections and milestones from AHPK programmes
              and activities.
            </p>
          </div>

          <div className="border-l-4 border-slate-950 pl-4">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
              Total albums
            </p>

            <p className="mt-1 text-3xl font-black text-slate-950">
              {albums.length}
            </p>
          </div>
        </div>

        {albums.length === 0 ? (
          <EmptyGallery />
        ) : (
          <>
            {featuredAlbum && (
              <FeaturedAlbumCard album={featuredAlbum} />
            )}

            {remainingAlbums.length > 0 && (
              <section className="mt-8 border-t border-slate-300 pt-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <SectionLabel>More collections</SectionLabel>

                    <h2 className="mt-1.5 text-2xl font-black text-slate-950 sm:text-3xl">
                      Gallery Albums
                    </h2>
                  </div>

                  <Images className="h-7 w-7 text-slate-300" />
                </div>

                <div className="mt-5 grid border-t border-slate-300 md:grid-cols-2 xl:grid-cols-3">
                  {remainingAlbums.map((album) => (
                    <AlbumCard
                      key={album.id}
                      album={album}
                    />
                  ))}
                </div>
              </section>
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
    <article className="border-y border-slate-300">
      <Link
        href={`/gallery/${album.slug}`}
        className="group grid lg:grid-cols-[1.35fr_0.65fr]"
      >
        <div className="relative min-h-[320px] overflow-hidden bg-slate-200 sm:min-h-[440px]">
          {cover ? (
            <img
              src={cover}
              alt={album.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
            />
          ) : (
            <GalleryPlaceholder />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="bg-[#C8102E] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white">
              Featured
            </span>

            {hasYouTube && (
              <span className="inline-flex items-center gap-2 bg-slate-950/85 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white">
                <Play className="h-3.5 w-3.5 fill-current" />
                Video
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4">
            <span className="bg-black/75 px-3 py-2 text-xs font-black text-white">
              {formatItemsCount(album._count.items)}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center border-t border-slate-300 py-5 lg:border-l lg:border-t-0 lg:px-7 lg:py-7">
          <div className="flex flex-wrap items-center gap-3">
            <CategoryBadge category={album.category} />

            <time className="inline-flex items-center gap-2 text-xs font-bold text-slate-400">
              <CalendarDays className="h-4 w-4 text-[#C8102E]" />

              {dateText(
                album.eventDate || album.createdAt,
              )}
            </time>
          </div>

          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 transition group-hover:text-[#C8102E] sm:text-4xl">
            {album.title}
          </h2>

          {album.description && (
            <p className="mt-4 text-sm font-medium leading-7 text-slate-600 sm:text-base">
              {excerpt(album.description, 220)}
            </p>
          )}

          <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#C8102E]">
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
    <article className="group border-b border-slate-300 py-5 md:border-r md:px-5 md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 xl:first:pl-0">
      <Link
        href={`/gallery/${album.slug}`}
        className="block"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
          {cover ? (
            <img
              src={cover}
              alt={album.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <GalleryPlaceholder />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />

          <div className="absolute left-3 top-3">
            <CategoryBadge
              category={album.category}
              floating
            />
          </div>

          {hasYouTube && (
            <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-slate-950/80 text-white">
              <Play className="h-4 w-4 fill-current" />
            </span>
          )}

          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center gap-2 bg-black/75 px-3 py-2 text-xs font-black text-white">
              <Images className="h-4 w-4" />

              {formatItemsCount(album._count.items)}
            </span>
          </div>
        </div>

        <time className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-slate-400">
          <CalendarDays className="h-4 w-4 text-[#C8102E]" />

          {dateText(
            album.eventDate || album.createdAt,
          )}
        </time>

        <h2 className="mt-2 text-xl font-black leading-tight text-slate-950 transition group-hover:text-[#C8102E]">
          {album.title}
        </h2>

        {album.description && (
          <p className="mt-2 text-sm font-medium leading-7 text-slate-500">
            {excerpt(album.description, 125)}
          </p>
        )}

        <div className="mt-3 inline-flex items-center gap-2 text-sm font-black text-[#C8102E]">
          View album

          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
          ? "bg-white/95 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#C8102E]"
          : "inline-flex bg-red-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#C8102E]"
      }
    >
      {formatCategory(category)}
    </span>
  );
}

function GalleryPlaceholder() {
  return (
    <div className="flex h-full min-h-[260px] items-center justify-center bg-slate-950 text-white">
      <Images className="h-14 w-14" />
    </div>
  );
}

function EmptyGallery() {
  return (
    <section className="border-y border-slate-300 py-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center bg-slate-950 text-white">
        <Images className="h-6 w-6" />
      </div>

      <h2 className="mt-4 text-2xl font-black text-slate-950">
        Gallery albums are coming soon
      </h2>

      <p className="mx-auto mt-2 max-w-lg text-sm font-medium leading-7 text-slate-600 sm:text-base">
        Published photo and video albums will appear
        here automatically after they are added through
        the Gallery dashboard.
      </p>

      <Link
        href="/events"
        className="mt-5 inline-flex min-h-11 items-center justify-center bg-[#C8102E] px-6 text-sm font-black text-white transition hover:bg-red-700"
      >
        Explore AHPK Events
      </Link>
    </section>
  );
}

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
      {children}
    </p>
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