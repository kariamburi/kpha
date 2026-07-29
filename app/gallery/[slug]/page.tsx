// app/gallery/[slug]/page.tsx

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
  CalendarDays,
  Camera,
  ChevronRight,
  Film,
  Home,
  Images,
  Play,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";
import {
  dateText,
  excerpt,
} from "@/app/lib/public-content";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

type GalleryAlbumPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: GalleryAlbumPageProps): Promise<Metadata> {
  const { slug } = await params;

  const album = await prisma.galleryAlbum.findFirst({
    where: {
      slug,
      published: true,
    },

    include: {
      items: {
        orderBy: [
          {
            order: "asc",
          },
          {
            createdAt: "asc",
          },
        ],

        take: 1,
      },
    },
  });

  if (!album) {
    return {
      title: "Album Not Found | AHPK",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = album.description
    ? excerpt(album.description, 160)
    : `Explore photos and videos from ${album.title}.`;

  const canonical = `/gallery/${slug}`;

  const socialImage =
    album.coverImageUrl ||
    getItemImage(album.items[0]) ||
    "/gallery-hero.webp";

  return {
    title: `${album.title} | AHPK Gallery`,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title: `${album.title} | AHPK Gallery`,
      description,
      url: canonical,
      siteName:
        "Association of Hotel Professionals Kenya",
      locale: "en_KE",
      type: "website",

      images: [
        {
          url: socialImage,
          alt: album.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${album.title} | AHPK Gallery`,
      description,
      images: [socialImage],
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
}

export default async function GalleryAlbumPage({
  params,
}: GalleryAlbumPageProps) {
  const { slug } = await params;

  const album = await prisma.galleryAlbum.findFirst({
    where: {
      slug,
      published: true,
    },

    include: {
      items: {
        orderBy: [
          {
            order: "asc",
          },
          {
            createdAt: "asc",
          },
        ],
      },
    },
  });

  if (!album) {
    notFound();
  }

  const relatedAlbums =
    await prisma.galleryAlbum.findMany({
      where: {
        published: true,

        id: {
          not: album.id,
        },

        category: album.category,
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

      take: 3,
    });

  const albumDate =
    album.eventDate || album.createdAt;

  const imageCount = album.items.filter(
    (item) => item.type === "IMAGE",
  ).length;

  const videoCount = album.items.filter(
    (item: any) =>
      item.type === "VIDEO" ||
      item.type === "YOUTUBE",
  ).length;

  const coverImage =
    album.coverImageUrl ||
    getAlbumCover(album.items) ||
    "/gallery-hero.webp";

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <GalleryAlbumJsonLd album={album} />

      <PageHeader />

      <AlbumHero
        title={album.title}
        description={
          album.description ||
          "Explore this AHPK photo and video album."
        }
        category={formatCategory(
          album.category,
        )}
        date={albumDate}
        imageCount={imageCount}
        videoCount={videoCount}
        totalItems={album.items.length}
        coverImage={coverImage}
      />

      <AlbumContent
        album={album}
        albumDate={albumDate}
        imageCount={imageCount}
        videoCount={videoCount}
      />

      {relatedAlbums.length > 0 ? (
        <RelatedAlbums
          albums={relatedAlbums}
        />
      ) : null}

      <PublicFooter />
    </main>
  );
}

function AlbumHero({
  title,
  description,
  category,
  date,
  imageCount,
  videoCount,
  totalItems,
  coverImage,
}: {
  title: string;
  description: string;
  category: string;
  date: Date;
  imageCount: number;
  videoCount: number;
  totalItems: number;
  coverImage: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-red-100/60 blur-3xl" />

        <div className="absolute right-0 top-0 h-full w-[42%] bg-[linear-gradient(135deg,transparent_0%,rgba(200,16,46,0.05)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-6 sm:pb-16 lg:px-8">
        <GalleryBreadcrumb title={title} />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(460px,1.1fr)] lg:items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-white text-[#C8102E] shadow-sm">
                <Images className="h-6 w-6" />
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#C8102E]">
                  AHPK Gallery Album
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {category}
                </p>
              </div>
            </div>

            <h1 className="mt-7 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
              {excerpt(description, 230)}
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <HeroBadge
                icon={<CalendarDays />}
                label={dateText(date)}
              />

              <HeroBadge
                icon={<Images />}
                label={formatItemsCount(
                  totalItems,
                )}
              />

              {imageCount > 0 ? (
                <HeroBadge
                  icon={<Camera />}
                  label={`${imageCount} ${imageCount === 1
                    ? "photo"
                    : "photos"
                    }`}
                />
              ) : null}

              {videoCount > 0 ? (
                <HeroBadge
                  icon={<Film />}
                  label={`${videoCount} ${videoCount === 1
                    ? "video"
                    : "videos"
                    }`}
                />
              ) : null}
            </div>

            <div className="mt-8">
              <Link
                href="/gallery"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-[#C8102E]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Gallery
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-[34px] bg-red-100/60 blur-2xl" />

            <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] border border-white bg-slate-200 shadow-2xl shadow-slate-300/50">
              <img
                src={coverImage}
                alt={title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
                    Album collection
                  </p>

                  <p className="mt-1 text-lg font-extrabold">
                    {formatItemsCount(
                      totalItems,
                    )}
                  </p>
                </div>

                {videoCount > 0 ? (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                    <Play className="h-5 w-5 fill-current" />
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AlbumContent({
  album,
  albumDate,
  imageCount,
  videoCount,
}: {
  album: any;
  albumDate: Date;
  imageCount: number;
  videoCount: number;
}) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="min-w-0">
            <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                  Photo and video collection
                </p>

                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                  Album Media
                </h2>

                <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                  Browse official photographs
                  and videos from this AHPK
                  activity.
                </p>
              </div>

              <div className="flex w-fit items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Camera className="h-5 w-5 text-[#C8102E]" />

                <span className="text-sm font-extrabold text-slate-700">
                  {formatItemsCount(
                    album.items.length,
                  )}
                </span>
              </div>
            </div>

            {album.items.length === 0 ? (
              <EmptyAlbum />
            ) : (
              <MediaGallery
                items={album.items}
                albumTitle={album.title}
              />
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <AlbumInformation
              category={formatCategory(
                album.category,
              )}
              date={albumDate}
              imageCount={imageCount}
              videoCount={videoCount}
              totalItems={album.items.length}
            />

            {album.description ? (
              <div className="mt-5 rounded-[24px] border border-red-100 bg-red-50/60 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#C8102E] shadow-sm">
                  <Images className="h-5 w-5" />
                </div>

                <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                  About this album
                </p>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                  {album.description}
                </p>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
}

function MediaGallery({
  items,
  albumTitle,
}: {
  items: GalleryItem[];
  albumTitle: string;
}) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
      {items.map((item) => (
        <MediaItem
          key={item.id}
          item={item}
          albumTitle={albumTitle}
        />
      ))}
    </div>
  );
}

function MediaItem({
  item,
  albumTitle,
}: {
  item: any;
  albumTitle: string;
}) {
  const title =
    item.title || item.caption || albumTitle;

  return (
    <figure className="group mb-5 break-inside-avoid overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-red-100 hover:shadow-xl">
      <div className="relative overflow-hidden bg-slate-950">
        {item.type === "YOUTUBE" ? (
          <YouTubeEmbed
            item={item}
            title={title}
          />
        ) : item.type === "VIDEO" ? (
          <video
            controls
            preload="metadata"
            poster={
              item.thumbnailUrl ||
              undefined
            }
            className="w-full bg-black"
          >
            {item.mediaUrl ? (
              <source
                src={item.mediaUrl}
              />
            ) : null}
          </video>
        ) : item.mediaUrl ||
          item.imageUrl ? (
          <img
            src={
              item.mediaUrl ||
              item.imageUrl ||
              ""
            }
            alt={title}
            loading="lazy"
            className="w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex min-h-[280px] items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-[#8f0d16] text-white">
            <Images className="h-12 w-12" />
          </div>
        )}

        <div className="pointer-events-none absolute left-4 top-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/75 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white backdrop-blur">
            {item.type === "IMAGE" ? (
              <Camera className="h-3.5 w-3.5" />
            ) : (
              <Film className="h-3.5 w-3.5" />
            )}

            {formatMediaType(item.type)}
          </span>
        </div>
      </div>

      {item.title || item.caption ? (
        <figcaption className="p-5">
          {item.title ? (
            <h3 className="text-base font-extrabold leading-6 text-slate-950">
              {item.title}
            </h3>
          ) : null}

          {item.caption ? (
            <p className="mt-2 text-sm font-medium leading-7 text-slate-500">
              {item.caption}
            </p>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

function YouTubeEmbed({
  item,
  title,
}: {
  item: any;
  title: string;
}) {
  const youtubeUrl =
    item.mediaUrl ||
    item.youtubeUrl ||
    "";

  const videoId = getYouTubeVideoId(
    youtubeUrl,
  );

  if (!videoId) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
        <Play className="h-12 w-12" />

        <p className="mt-4 text-sm font-bold">
          Video unavailable
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

function AlbumInformation({
  category,
  date,
  imageCount,
  videoCount,
  totalItems,
}: {
  category: string;
  date: Date;
  imageCount: number;
  videoCount: number;
  totalItems: number;
}) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50">
      <div className="border-b border-slate-200 bg-white px-6 py-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
          Album information
        </p>

        <h2 className="mt-2 text-lg font-extrabold text-slate-950">
          Collection Details
        </h2>
      </div>

      <div className="space-y-6 p-6">
        <AlbumInfo
          icon={<CalendarDays />}
          label="Album date"
          value={dateText(date)}
        />

        <AlbumInfo
          icon={<Images />}
          label="Category"
          value={category}
        />

        <AlbumInfo
          icon={<Camera />}
          label="Photos"
          value={String(imageCount)}
        />

        <AlbumInfo
          icon={<Film />}
          label="Videos"
          value={String(videoCount)}
        />

        <AlbumInfo
          icon={<Images />}
          label="Total media"
          value={formatItemsCount(
            totalItems,
          )}
        />
      </div>
    </div>
  );
}

function AlbumInfo({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#C8102E] shadow-sm [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-extrabold leading-6 text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

function RelatedAlbums({
  albums,
}: {
  albums: RelatedAlbum[];
}) {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
              Continue exploring
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Related Albums
            </h2>

            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
              Discover more AHPK photos,
              videos and professional moments.
            </p>
          </div>

          <Link
            href="/gallery"
            className="hidden items-center gap-2 text-sm font-extrabold text-[#C8102E] sm:inline-flex"
          >
            View all albums

            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <RelatedAlbumCard
              key={album.id}
              album={album}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedAlbumCard({
  album,
}: {
  album: RelatedAlbum;
}) {
  const cover =
    album.coverImageUrl ||
    getAlbumCover(album.items);

  return (
    <article className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-xl">
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
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-[#8f0d16] text-white">
              <Images className="h-12 w-12" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/70 px-3 py-2 text-xs font-extrabold text-white backdrop-blur">
              <Images className="h-4 w-4" />

              {formatItemsCount(
                album._count.items,
              )}
            </span>
          </div>
        </div>

        <div className="p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#C8102E]">
            {formatCategory(
              album.category,
            )}
          </p>

          <h3 className="mt-3 text-xl font-extrabold leading-tight text-slate-950 transition group-hover:text-[#C8102E]">
            {album.title}
          </h3>

          <time className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-slate-400">
            <CalendarDays className="h-4 w-4 text-[#C8102E]" />

            {dateText(
              album.eventDate ||
              album.createdAt,
            )}
          </time>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
            <span className="text-sm font-extrabold text-[#C8102E]">
              View album
            </span>

            <ChevronRight className="h-4 w-4 text-[#C8102E] transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  );
}

function HeroBadge({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-700 shadow-sm">
      <span className="text-[#C8102E] [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </span>

      {label}
    </span>
  );
}

function EmptyAlbum() {
  return (
    <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
        <Images className="h-8 w-8" />
      </div>

      <h2 className="mt-6 text-2xl font-extrabold text-slate-950">
        This Album Is Empty
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-7 text-slate-600 sm:text-base">
        Photos and videos will appear here after
        they are uploaded and published through
        the AHPK Gallery dashboard.
      </p>

      <Link
        href="/gallery"
        className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white transition hover:bg-red-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Gallery
      </Link>
    </div>
  );
}

function GalleryBreadcrumb({
  title,
}: {
  title: string;
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
        href="/gallery"
        className="transition hover:text-[#C8102E]"
      >
        Gallery
      </Link>

      <ChevronRight className="h-4 w-4 text-slate-300" />

      <span
        className="max-w-[240px] truncate text-[#C8102E] sm:max-w-md"
        aria-current="page"
      >
        {title}
      </span>
    </nav>
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

function getAlbumCover(
  items: GalleryItem[],
) {
  const image: any = items.find(
    (item: any) =>
      item.type === "IMAGE" &&
      (item.mediaUrl ||
        item.imageUrl),
  );

  if (image) {
    return (
      image.mediaUrl ||
      image.imageUrl ||
      null
    );
  }

  const thumbnail = items.find(
    (item) => item.thumbnailUrl,
  );

  return thumbnail?.thumbnailUrl || null;
}

function getItemImage(
  item?: any,
) {
  if (!item) {
    return null;
  }

  return (
    item.mediaUrl ||
    item.imageUrl ||
    item.thumbnailUrl ||
    null
  );
}

function getYouTubeVideoId(
  url: string,
) {
  if (!url) {
    return null;
  }

  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);

    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

function formatMediaType(
  type: string,
) {
  if (type === "YOUTUBE") {
    return "YouTube";
  }

  if (type === "VIDEO") {
    return "Video";
  }

  return "Photo";
}

function formatCategory(
  category: string,
) {
  return category
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

function formatItemsCount(
  count: number,
) {
  return count === 1
    ? "1 media item"
    : `${count} media items`;
}

type GalleryAlbum = Awaited<
  ReturnType<typeof getGalleryAlbumType>
>;

async function getGalleryAlbumType() {
  return prisma.galleryAlbum.findFirst({
    where: {
      published: true,
    },

    include: {
      items: {
        orderBy: [
          {
            order: "asc",
          },
          {
            createdAt: "asc",
          },
        ],
      },
    },
  });
}

type AlbumResult =
  NonNullable<GalleryAlbum>;

type GalleryItem =
  AlbumResult["items"][number];

type RelatedAlbum = Awaited<
  ReturnType<typeof getRelatedAlbumsType>
>[number];

async function getRelatedAlbumsType() {
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

    take: 3,
  });
}

function GalleryAlbumJsonLd({
  album,
}: {
  album: AlbumResult;
}) {
  const pageUrl = `https://ahpk.or.ke/gallery/${album.slug}`;

  const images = album.items
    .filter(
      (item: any) =>
        item.type === "IMAGE" &&
        (item.mediaUrl ||
          item.imageUrl),
    )
    .map(
      (item: any) =>
        item.mediaUrl ||
        item.imageUrl,
    )
    .filter(
      (
        image,
      ): image is string =>
        Boolean(image),
    );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${pageUrl}#gallery`,
    url: pageUrl,
    name: album.title,

    description:
      album.description ||
      `Official AHPK gallery album: ${album.title}.`,

    dateCreated:
      album.createdAt.toISOString(),

    inLanguage: "en-KE",

    image:
      images.length > 0
        ? images
        : album.coverImageUrl
          ? [album.coverImageUrl]
          : undefined,

    numberOfItems:
      album.items.length,

    publisher: {
      "@type": "Organization",
      "@id": "https://ahpk.or.ke/#organization",
      name:
        "Association of Hotel Professionals Kenya",
      alternateName: "AHPK",
      url: "https://ahpk.or.ke",
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