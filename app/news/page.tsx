// app/news/page.tsx

import type { CSSProperties, ComponentType } from "react";
import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Home,
  Megaphone,
  Newspaper,
  Radio,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";
import { prisma } from "@/lib/prisma";

import {
  dateText,
  excerpt,
  newsCategory,
  newsFilters,
} from "../lib/public-content";

const pagePath = "/news";

export const metadata: Metadata = {
  title: "News | Association of Hotel Professionals Kenya",

  description:
    "Read AHPK news, official notices, leadership messages, hospitality industry updates and press releases.",

  keywords: [
    "AHPK news",
    "hospitality news Kenya",
    "hotel professionals Kenya",
    "AHPK announcements",
    "hospitality industry updates",
    "AHPK press releases",
  ],

  alternates: {
    canonical: pagePath,
  },

  openGraph: {
    title:
      "News & Updates | Association of Hotel Professionals Kenya",
    description:
      "Official AHPK announcements, leadership messages, notices, press releases and hospitality industry updates.",
    url: pagePath,
    siteName: "Association of Hotel Professionals Kenya",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/news-hero.webp",
        width: 1536,
        height: 1024,
        alt: "AHPK newsroom and hospitality industry updates",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AHPK News & Updates",
    description:
      "Official association announcements, leadership messages and hospitality industry updates.",
    images: ["/news-hero.webp"],
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

type NewsPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function NewsPage({
  searchParams,
}: NewsPageProps) {
  const query = await searchParams;
  const category = newsCategory(query.category);

  const posts = await prisma.newsPost.findMany({
    where: {
      published: true,

      ...(category
        ? {
          category,
        }
        : {}),
    },

    orderBy: [
      {
        publishedAt: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  const activeHref = query.category
    ? `/news?category=${query.category}`
    : "/news";

  const featuredPost = posts[0] ?? null;
  const headlinePosts = posts.slice(1, 5);
  const remainingPosts = posts.slice(5);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <NewsJsonLd posts={posts} />

      <PageHeader />

      <NewsHero
        activeHref={activeHref}
        postsCount={posts.length}
      />

      <NewsContent
        posts={posts}
        featuredPost={featuredPost}
        headlinePosts={headlinePosts}
        remainingPosts={remainingPosts}
      />

      <PublicFooter />
    </main>
  );
}

function NewsHero({
  activeHref,
  postsCount,
}: {
  activeHref: string;
  postsCount: number;
}) {
  const countText =
    postsCount === 1
      ? "1 published article"
      : `${postsCount} published articles`;

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-red-100/60 blur-3xl" />

        <div className="absolute right-0 top-0 h-full w-[45%] bg-[linear-gradient(135deg,transparent_0%,rgba(200,16,46,0.05)_100%)]" />

        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-slate-200/70 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-6 sm:pb-14 lg:px-8">
        <Breadcrumb />

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-white text-[#C8102E] shadow-sm">
                <Newspaper className="h-6 w-6" />
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#C8102E]">
                  AHPK Newsroom
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                  Official association communication
                </p>
              </div>
            </div>

            <h1 className="mt-7 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              News, Notices &amp;

              <span className="mt-2 block text-[#C8102E]">
                Industry Updates
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
              Follow official announcements, leadership
              communication, professional notices and
              hospitality industry developments from AHPK.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
              <Radio className="h-5 w-5" />
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                Newsroom archive
              </p>

              <p className="mt-1 text-sm font-extrabold text-slate-800">
                {countText}
              </p>
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="mt-9 flex flex-wrap gap-2.5">
          {newsFilters.map((filter) => {
            const isActive =
              filter.href === activeHref;

            return (
              <Link
                key={filter.href}
                href={filter.href}
                aria-current={
                  isActive
                    ? "page"
                    : undefined
                }
                className={
                  isActive
                    ? "rounded-full border border-[#C8102E] bg-[#C8102E] px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white shadow-sm sm:text-[11px]"
                    : "rounded-full border border-slate-200 bg-white px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-[#C8102E] sm:text-[11px]"
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

function NewsContent({
  posts,
  featuredPost,
  headlinePosts,
  remainingPosts,
}: {
  posts: NewsPost[];
  featuredPost: NewsPost | null;
  headlinePosts: NewsPost[];
  remainingPosts: NewsPost[];
}) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <EmptyNews />
        ) : (
          <>
            {/* Lead story and headline rail */}
            <div className="grid gap-8 border-b border-slate-200 pb-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.7fr)] lg:items-start">
              {featuredPost ? (
                <LeadStory
                  post={featuredPost}
                />
              ) : null}

              <LatestHeadlines
                posts={headlinePosts}
              />
            </div>

            {/* Remaining stories */}
            {remainingPosts.length > 0 ? (
              <section className="pt-12">
                <div className="mb-8 flex items-end justify-between gap-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                      More from the newsroom
                    </p>

                    <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                      Latest News
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                      Read more official
                      announcements, professional
                      notices and hospitality
                      industry updates.
                    </p>
                  </div>

                  <Newspaper className="hidden h-10 w-10 text-slate-200 sm:block" />
                </div>

                <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
                  {remainingPosts.map(
                    (post) => (
                      <EditorialNewsCard
                        key={post.id}
                        post={post}
                      />
                    ),
                  )}
                </div>
              </section>
            ) : null}

            <NewsroomNotice />
          </>
        )}
      </div>
    </section>
  );
}

function LeadStory({
  post,
}: {
  post: NewsPost;
}) {
  return (
    <article className="group min-w-0">
      <Link
        href={`/news/${post.slug}`}
        className="block"
      >
        <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] bg-slate-200">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <NewsImagePlaceholder
              icon={Newspaper}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
            <span className="inline-flex rounded-full bg-[#C8102E] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-lg">
              Lead Story
            </span>

            <h2 className="mt-5 max-w-3xl text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              {post.title}
            </h2>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <CategoryBadge
            category={post.category}
          />

          <time className="inline-flex items-center gap-2 text-xs font-bold text-slate-400">
            <CalendarDays className="h-4 w-4 text-[#C8102E]" />

            {dateText(
              post.publishedAt ||
              post.createdAt,
            )}
          </time>
        </div>

        <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-slate-600">
          {post.excerpt ||
            excerpt(post.content, 230)}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]">
          Read full story

          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </article>
  );
}

function LatestHeadlines({
  posts,
}: {
  posts: NewsPost[];
}) {
  return (
    <aside className="overflow-hidden rounded-[26px] border border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
            Latest updates
          </p>

          <h2 className="mt-2 text-xl font-extrabold text-slate-950">
            News Briefing
          </h2>
        </div>

        <Radio className="h-6 w-6 text-[#C8102E]" />
      </div>

      <div className="divide-y divide-slate-200 px-6">
        {posts.map((post, index) => (
          <Link
            key={post.id}
            href={`/news/${post.slug}`}
            className="group flex gap-4 py-5 first:pt-6"
          >
            <span className="pt-0.5 text-sm font-black text-slate-300">
              {String(index + 1).padStart(
                2,
                "0",
              )}
            </span>

            <div className="min-w-0">
              <CategoryBadge
                category={post.category}
              />

              <h3 className="mt-3 text-base font-extrabold leading-6 text-slate-900 transition group-hover:text-[#C8102E]">
                {post.title}
              </h3>

              <time className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
                <CalendarDays className="h-3.5 w-3.5 text-[#C8102E]" />

                {dateText(
                  post.publishedAt ||
                  post.createdAt,
                )}
              </time>
            </div>
          </Link>
        ))}

        {posts.length === 0 ? (
          <div className="py-8 text-center">
            <Newspaper className="mx-auto h-8 w-8 text-slate-300" />

            <p className="mt-4 text-sm font-medium leading-7 text-slate-500">
              Additional newsroom stories
              will appear here.
            </p>
          </div>
        ) : null}
      </div>

      <div className="border-t border-slate-200 bg-white p-4">
        <Link
          href="/news"
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-[#C8102E]"
        >
          Browse Newsroom
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}

function EditorialNewsCard({
  post,
}: {
  post: NewsPost;
}) {
  return (
    <article className="group border-b border-slate-200 pb-8">
      <Link
        href={`/news/${post.slug}`}
        className="block"
      >
        <div className="aspect-[16/10] overflow-hidden rounded-[20px] bg-slate-200">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <NewsImagePlaceholder
              icon={Newspaper}
            />
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <CategoryBadge
            category={post.category}
          />

          <time className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
            <CalendarDays className="h-3.5 w-3.5 text-[#C8102E]" />

            {dateText(
              post.publishedAt ||
              post.createdAt,
            )}
          </time>
        </div>

        <h2 className="mt-4 text-xl font-extrabold leading-tight text-slate-950 transition group-hover:text-[#C8102E]">
          {post.title}
        </h2>

        <p className="mt-3 text-sm font-medium leading-7 text-slate-500">
          {post.excerpt ||
            excerpt(post.content, 145)}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]">
          Read article

          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </article>
  );
}

function NewsroomNotice() {
  return (
    <section className="mt-14 overflow-hidden rounded-[28px] border border-red-100 bg-red-50/70">
      <div className="grid gap-6 p-7 sm:p-9 lg:grid-cols-[auto_1fr_auto] lg:items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#C8102E] shadow-sm">
          <Megaphone className="h-7 w-7" />
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
            Official communication
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
            AHPK Notices and Announcements
          </h2>

          <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
            News published through this newsroom
            represents official communication from
            the Association of Hotel Professionals
            Kenya.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white transition hover:bg-red-700"
        >
          Contact AHPK
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function CategoryBadge({
  category,
}: {
  category: string;
}) {
  return (
    <span className="inline-flex rounded-full bg-red-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#C8102E]">
      {formatCategory(category)}
    </span>
  );
}

function NewsImagePlaceholder({
  icon: Icon,
}: {
  icon: ComponentType<{
    className?: string;
  }>;
}) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-[#8f0d16] text-white">
      <Icon className="h-12 w-12" />
    </div>
  );
}

function EmptyNews() {
  return (
    <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center sm:px-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
        <Newspaper className="h-8 w-8" />
      </div>

      <h2 className="mt-6 text-2xl font-extrabold text-slate-950">
        No Published News Found
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-7 text-slate-600 sm:text-base">
        Published news articles, notices and
        official association updates will appear
        here automatically after they are added
        through the dashboard.
      </p>

      <Link
        href="/"
        className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white transition hover:bg-red-700"
      >
        Return Home
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
        News
      </span>
    </nav>
  );
}

function formatCategory(category: string) {
  return category
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

type NewsPost = Awaited<
  ReturnType<typeof getNewsPostsType>
>[number];

async function getNewsPostsType() {
  return prisma.newsPost.findMany();
}

function NewsJsonLd({
  posts,
}: {
  posts: NewsPost[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://ahpk.or.ke/news#page",
    url: "https://ahpk.or.ke/news",
    name: "AHPK News & Updates",

    description:
      "Official AHPK announcements, leadership messages, notices, hospitality industry updates and press releases.",

    inLanguage: "en-KE",

    publisher: {
      "@type": "Organization",
      "@id": "https://ahpk.or.ke/#organization",
      name: "Association of Hotel Professionals Kenya",
      alternateName: "AHPK",
      url: "https://ahpk.or.ke",
    },

    mainEntity: {
      "@type": "ItemList",

      itemListElement: posts.map(
        (post, index) => ({
          "@type": "ListItem",
          position: index + 1,

          item: {
            "@type": "NewsArticle",
            headline: post.title,
            url: `https://ahpk.or.ke/news/${post.slug}`,

            datePublished: (
              post.publishedAt ||
              post.createdAt
            ).toISOString(),

            dateModified:
              post.updatedAt.toISOString(),

            image:
              post.imageUrl ||
              undefined,

            description:
              post.excerpt ||
              excerpt(
                post.content,
                180,
              ),

            publisher: {
              "@type": "Organization",
              "@id": "https://ahpk.or.ke/#organization",
              name: "Association of Hotel Professionals Kenya",
            },
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