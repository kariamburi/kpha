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
  return (
    <>
      {/* News masthead */}
      <section className="border-b border-slate-300 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex min-h-[86px] items-end justify-between gap-6 pb-4 pt-5">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                Association of Hotel Professionals Kenya
              </p>

              <h1 className="mt-1 text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
                AHPK News
              </h1>
            </div>

            <p className="hidden text-sm font-bold text-slate-500 sm:block">
              {postsCount === 1
                ? "1 published story"
                : `${postsCount} published stories`}
            </p>
          </div>
        </div>
      </section>

      {/* Category navigation */}
      <nav
        aria-label="News categories"
        className="border-b border-slate-300 bg-white"
      >
        <div className="mx-auto max-w-7xl overflow-x-auto px-5 sm:px-6 lg:px-8">
          <div className="flex min-w-max items-center">
            {newsFilters.map((filter) => {
              const isActive =
                filter.href === activeHref;

              return (
                <Link
                  key={filter.href}
                  href={filter.href}
                  aria-current={
                    isActive ? "page" : undefined
                  }
                  className={
                    isActive
                      ? "border-b-4 border-[#C8102E] px-4 py-4 text-sm font-black text-slate-950"
                      : "border-b-4 border-transparent px-4 py-4 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:text-[#C8102E]"
                  }
                >
                  {filter.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
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
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <EmptyNews />
        ) : (
          <>
            {/* Top newsroom stories */}
            <section className="border-b border-slate-300 pb-10">
              <div className="mb-5 flex items-center justify-between border-b border-slate-300 pb-3">
                <h2 className="border-l-4 border-[#C8102E] pl-3 text-2xl font-black tracking-tight text-slate-950">
                  Top Stories
                </h2>

                <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                  Latest updates
                </span>
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.8fr)]">
                {featuredPost ? (
                  <LeadStory post={featuredPost} />
                ) : null}

                <LatestHeadlines posts={headlinePosts} />
              </div>
            </section>

            {/* Latest news */}
            {remainingPosts.length > 0 ? (
              <section className="pt-10">
                <div className="mb-7 flex items-end justify-between gap-6 border-b border-slate-300 pb-4">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                      AHPK Newsroom
                    </p>

                    <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
                      Latest News
                    </h2>
                  </div>

                  <p className="hidden max-w-md text-right text-sm font-medium leading-6 text-slate-500 md:block">
                    Official announcements, hospitality
                    updates and professional news.
                  </p>
                </div>

                <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                  {remainingPosts.map((post) => (
                    <EditorialNewsCard
                      key={post.id}
                      post={post}
                    />
                  ))}
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
  const publishedDate =
    post.publishedAt || post.createdAt;

  return (
    <article className="group min-w-0">
      <Link
        href={`/news/${post.slug}`}
        className="block"
      >
        <div className="aspect-[16/9] overflow-hidden bg-slate-200">
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
        </div>

        <div className="pt-5">
          <div className="flex flex-wrap items-center gap-3">
            <CategoryBadge
              category={post.category}
            />

            <time
              dateTime={publishedDate.toISOString()}
              className="text-xs font-bold text-slate-500"
            >
              {dateText(publishedDate)}
            </time>
          </div>

          <h2 className="mt-4 max-w-4xl text-3xl font-black leading-[1.08] tracking-[-0.025em] text-slate-950 transition group-hover:text-[#C8102E] sm:text-4xl lg:text-[2.8rem]">
            {post.title}
          </h2>

          <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-600">
            {post.excerpt ||
              excerpt(post.content, 230)}
          </p>

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#C8102E]">
            Read full story

            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </div>
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
    <aside className="border-t-4 border-[#C8102E]">
      <div className="border-b border-slate-300 py-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
          Latest Updates
        </p>

        <h2 className="mt-1 text-2xl font-black text-slate-950">
          News Briefing
        </h2>
      </div>

      <div className="divide-y divide-slate-300">
        {posts.map((post, index) => {
          const publishedDate =
            post.publishedAt ||
            post.createdAt;

          return (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="group grid grid-cols-[34px_minmax(0,1fr)] gap-3 py-5"
            >
              <span className="pt-0.5 text-lg font-black text-slate-300">
                {String(index + 1).padStart(
                  2,
                  "0",
                )}
              </span>

              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#C8102E]">
                  {formatCategory(post.category)}
                </p>

                <h3 className="mt-2 text-lg font-black leading-6 text-slate-950 transition group-hover:text-[#C8102E]">
                  {post.title}
                </h3>

                <time
                  dateTime={publishedDate.toISOString()}
                  className="mt-2 block text-xs font-bold text-slate-400"
                >
                  {dateText(publishedDate)}
                </time>
              </div>
            </Link>
          );
        })}

        {posts.length === 0 ? (
          <p className="py-8 text-sm font-medium text-slate-500">
            More stories will appear here.
          </p>
        ) : null}
      </div>
    </aside>
  );
}

function EditorialNewsCard({
  post,
}: {
  post: NewsPost;
}) {
  const publishedDate =
    post.publishedAt || post.createdAt;

  return (
    <article className="group border-t-4 border-transparent pt-3 transition hover:border-[#C8102E]">
      <Link
        href={`/news/${post.slug}`}
        className="block"
      >
        <div className="aspect-[16/9] overflow-hidden bg-slate-200">
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

        <div className="pt-4">
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#C8102E]">
            {formatCategory(post.category)}
          </p>

          <h2 className="mt-2 line-clamp-3 text-xl font-black leading-6 text-slate-950 transition group-hover:text-[#C8102E]">
            {post.title}
          </h2>

          <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-slate-600">
            {post.excerpt ||
              excerpt(post.content, 145)}
          </p>

          <div className="mt-4 border-t border-slate-200 pt-3">
            <time
              dateTime={publishedDate.toISOString()}
              className="text-xs font-bold text-slate-400"
            >
              {dateText(publishedDate)}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}

function NewsroomNotice() {
  return (
    <section className="mt-14 border-t-4 border-[#C8102E] bg-slate-950 px-6 py-8 text-white sm:px-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
            Official communication
          </p>

          <h2 className="mt-2 text-2xl font-black">
            AHPK Notices and Announcements
          </h2>

          <p className="mt-3 text-sm font-medium leading-7 text-slate-300 sm:text-base">
            News published through this newsroom
            represents official communication from the
            Association of Hotel Professionals Kenya.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex min-h-11 w-fit items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition hover:bg-red-700"
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
    <span className="inline-flex border-l-4 border-[#C8102E] pl-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#C8102E]">
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