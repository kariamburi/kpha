// app/news/[slug]/page.tsx

import type {
  CSSProperties,
  ReactNode,
} from "react";
import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  Home,
  Newspaper,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";
import { dateText, excerpt } from "@/app/lib/public-content";
import { prisma } from "@/lib/prisma";
import NewsCarousel from "@/app/components/public/NewsCarousel";

type NewsDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: NewsDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await prisma.newsPost.findFirst({
    where: {
      slug,
      published: true,
    },
    select: {
      title: true,
      excerpt: true,
      content: true,
      imageUrl: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!post) {
    return {
      title: "Article Not Found | AHPK",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    post.excerpt || excerpt(post.content, 160);

  const canonical = `/news/${slug}`;

  const socialImage =
    post.imageUrl || "/news-hero.webp";

  return {
    title: `${post.title} | AHPK News`,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title: post.title,
      description,
      url: canonical,
      siteName:
        "Association of Hotel Professionals Kenya",
      locale: "en_KE",
      type: "article",

      publishedTime: (
        post.publishedAt ||
        post.createdAt
      ).toISOString(),

      modifiedTime:
        post.updatedAt.toISOString(),

      images: [
        {
          url: socialImage,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
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

export default async function NewsDetailsPage({
  params,
}: NewsDetailsPageProps) {
  const { slug } = await params;

  const post = await prisma.newsPost.findFirst({
    where: {
      slug,
      published: true,
    },
  });

  if (!post) {
    notFound();
  }

  const relatedPosts = await prisma.newsPost.findMany({
    where: {
      published: true,

      id: {
        not: post.id,
      },

      category: post.category,
    },

    orderBy: [
      {
        publishedAt: "desc",
      },
      {
        createdAt: "desc",
      },
    ],

    take: 12,
  });

  const publishedDate =
    post.publishedAt || post.createdAt;

  const articleExcerpt =
    post.excerpt ||
    excerpt(post.content, 230);

  const readingTime =
    estimateReadingTime(post.content);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <NewsArticleJsonLd post={post} />

      <PageHeader />

      {/* NEWS SECTION BAR */}
      <div className="border-b border-slate-300 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex min-h-14 items-center justify-between gap-5">
            <Link
              href="/news"
              className="border-l-4 border-[#C8102E] pl-3 text-xl font-black tracking-tight text-slate-950"
            >
              AHPK News
            </Link>

            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-[#C8102E]"
            >
              All stories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ARTICLE HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-5 pb-8 pt-7 sm:px-6 sm:pb-10 sm:pt-10 lg:px-8">
          <NewsBreadcrumb title={post.title} />

          <div className="mt-7 max-w-[900px]">
            <CategoryBadge category={post.category} />

            <h1 className="mt-5 max-w-[950px] text-[2.35rem] font-black leading-[1.07] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-[4rem]">
              {post.title}
            </h1>

            {articleExcerpt ? (
              <p className="mt-6 max-w-[820px] text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                {articleExcerpt}
              </p>
            ) : null}

            <div className="mt-7 border-t border-slate-200 pt-5">
              <p className="text-sm font-extrabold text-slate-900">
                AHPK Newsroom
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-slate-500">
                <time dateTime={publishedDate.toISOString()}>
                  {dateText(publishedDate)}
                </time>

                <span aria-hidden="true">•</span>

                <span>
                  {readingTime}{" "}
                  {readingTime === 1 ? "minute" : "minutes"} read
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* FEATURE IMAGE */}
      {post.imageUrl ? (
        <section className="bg-white">
          <div className="mx-auto max-w-[1100px] px-0 sm:px-6 lg:px-8">
            <figure>
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 sm:aspect-[16/8.5]">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <figcaption className="border-b border-slate-200 px-5 py-3 text-xs font-medium leading-5 text-slate-500 sm:px-0">
                AHPK Newsroom
              </figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      {/* ARTICLE */}
      <section className="bg-white py-9 sm:py-12">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[56px_minmax(0,720px)_1fr] lg:gap-9">
            {/* SHARE RAIL */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Share
                </p>

                <div className="flex flex-col gap-2">
                  <ShareLink
                    label="Share on Facebook"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      `https://ahpk.or.ke/news/${post.slug}`,
                    )}`}
                  >
                    f
                  </ShareLink>

                  <ShareLink
                    label="Share on X"
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      `https://ahpk.or.ke/news/${post.slug}`,
                    )}&text=${encodeURIComponent(post.title)}`}
                  >
                    X
                  </ShareLink>

                  <ShareLink
                    label="Share on WhatsApp"
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `${post.title} https://ahpk.or.ke/news/${post.slug}`,
                    )}`}
                  >
                    W
                  </ShareLink>
                </div>
              </div>
            </aside>

            {/* MAIN READING COLUMN */}
            <article className="min-w-0">
              {/* MOBILE SHARE BUTTONS */}
              <div className="mb-8 flex items-center gap-2 border-b border-slate-200 pb-6 lg:hidden">
                <span className="mr-2 text-xs font-black uppercase tracking-[0.15em] text-slate-400">
                  Share
                </span>

                <ShareLink
                  label="Share on Facebook"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `https://ahpk.or.ke/news/${post.slug}`,
                  )}`}
                >
                  f
                </ShareLink>

                <ShareLink
                  label="Share on X"
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    `https://ahpk.or.ke/news/${post.slug}`,
                  )}&text=${encodeURIComponent(post.title)}`}
                >
                  X
                </ShareLink>

                <ShareLink
                  label="Share on WhatsApp"
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `${post.title} https://ahpk.or.ke/news/${post.slug}`,
                  )}`}
                >
                  W
                </ShareLink>
              </div>

              {post.excerpt ? (
                <p className="mb-8 border-l-4 border-[#C8102E] pl-5 text-lg font-bold leading-8 text-slate-800 sm:text-xl sm:leading-9">
                  {post.excerpt}
                </p>
              ) : null}

              <div className="article-copy whitespace-pre-line text-[17px] font-normal leading-[1.85] text-slate-800 sm:text-[18px]">
                {post.content}
              </div>

              <footer className="mt-12 border-t border-slate-300 pt-7">
                <p className="text-sm font-extrabold text-slate-900">
                  Published by AHPK Newsroom
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Official news and communication from the Association of Hotel
                  Professionals Kenya.
                </p>

                <Link
                  href="/news"
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 border border-slate-300 px-5 text-sm font-extrabold text-slate-800 transition hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to News
                </Link>
              </footer>
            </article>

            {/* RIGHT WHITESPACE / OPTIONAL PROMO */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 border-t-4 border-[#C8102E] bg-slate-50 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C8102E]">
                  AHPK News
                </p>

                <h2 className="mt-3 text-lg font-extrabold leading-6 text-slate-950">
                  Latest hospitality industry updates
                </h2>

                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                  Read association announcements, professional updates and
                  hospitality industry stories.
                </p>

                <Link
                  href="/news"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
                >
                  Browse all stories
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <RelatedNews posts={relatedPosts} />
      ) : null}

      <PublicFooter />
    </main>
  );
}

function ArticleMasthead({
  title,
  articleExcerpt,
  category,
  publishedDate,
}: {
  title: string;
  articleExcerpt: string;
  category: string;
  publishedDate: Date;
}) {
  return (
    <header className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-red-100/60 blur-3xl" />

        <div className="absolute right-0 top-0 h-full w-[45%] bg-[linear-gradient(135deg,transparent_0%,rgba(200,16,46,0.045)_100%)]" />

        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-slate-200/70 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-8 sm:px-6 sm:pb-16 lg:px-8">
        <NewsBreadcrumb title={title} />

        <div className="mt-10 max-w-4xl sm:mt-12">
          <div className="flex flex-wrap items-center gap-3">
            <CategoryBadge
              category={category}
            />

            <time
              dateTime={publishedDate.toISOString()}
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500"
            >
              <CalendarDays className="h-4 w-4 text-[#C8102E]" />

              {dateText(publishedDate)}
            </time>
          </div>

          <h1 className="mt-7 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
            {articleExcerpt}
          </p>

          <div className="mt-8 flex items-center gap-3 border-t border-slate-200 pt-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C8102E] text-white shadow-sm">
              <Newspaper className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-extrabold text-slate-900">
                AHPK Newsroom
              </p>

              <p className="mt-0.5 text-xs font-semibold text-slate-500">
                Official association communication
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ArticleInformation({
  category,
  publishedDate,
  readingTime,
}: {
  category: string;
  publishedDate: Date;
  readingTime: number;
}) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50">
      <div className="border-b border-slate-200 bg-white px-6 py-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
          Article details
        </p>

        <h2 className="mt-2 text-lg font-extrabold text-slate-950">
          Article Information
        </h2>
      </div>

      <div className="space-y-6 p-6">
        <ArticleInfo
          icon={<CalendarDays />}
          label="Published"
          value={dateText(publishedDate)}
        />

        <ArticleInfo
          icon={<Newspaper />}
          label="Category"
          value={formatCategory(category)}
        />

        <ArticleInfo
          icon={<Clock3 />}
          label="Reading time"
          value={`${readingTime} ${readingTime === 1
            ? "minute"
            : "minutes"
            }`}
        />
      </div>
    </div>
  );
}

function NewsroomCard() {
  return (
    <div className="mt-5 rounded-[24px] border border-red-100 bg-red-50/70 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#C8102E] shadow-sm">
        <Newspaper className="h-6 w-6" />
      </div>

      <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
        Official communication
      </p>

      <h2 className="mt-2 text-xl font-extrabold text-slate-950">
        AHPK Newsroom
      </h2>

      <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
        Explore official notices, leadership
        communication, professional updates and
        news affecting Kenya&apos;s hospitality
        industry.
      </p>

      <Link
        href="/news"
        className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
      >
        Browse all news

        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function ArticleInfo({
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

      <div className="min-w-0 pt-0.5">
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

function RelatedNews({
  posts,
}: {
  posts: RelatedPost[];
}) {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
              Continue reading
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              More from AHPK News
            </h2>

            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
              Explore more association announcements, hospitality industry
              updates and professional stories.
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-[#C8102E] transition hover:text-[#8E0C22]"
          >
            View all news
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-7">
          <NewsCarousel
            basePath="/news"
            actionLabel="Read article"
            news={posts.map((relatedPost) => {
              const publishedDate =
                relatedPost.publishedAt ||
                relatedPost.createdAt;

              return {
                id: relatedPost.id,
                slug: relatedPost.slug,
                imageUrl: relatedPost.imageUrl,
                title: relatedPost.title,
                description:
                  relatedPost.excerpt ||
                  excerpt(
                    relatedPost.content,
                    140,
                  ) ||
                  "Read more from the AHPK Newsroom.",
                date: dateText(publishedDate),
              };
            })}
          />
        </div>
      </div>
    </section>
  );
}

function RelatedArticle({
  post,
}: {
  post: RelatedPost;
}) {
  const publishedDate =
    post.publishedAt || post.createdAt;

  return (
    <article className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-xl">
      <Link
        href={`/news/${post.slug}`}
        className="block h-full"
      >
        <div className="aspect-[16/10] overflow-hidden bg-slate-200">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-[#8f0d16] text-white">
              <Newspaper className="h-11 w-11" />
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CategoryBadge
              category={post.category}
            />

            <time
              dateTime={publishedDate.toISOString()}
              className="text-xs font-bold text-slate-400"
            >
              {dateText(publishedDate)}
            </time>
          </div>

          <h3 className="mt-4 text-xl font-extrabold leading-tight text-slate-950 transition group-hover:text-[#C8102E]">
            {post.title}
          </h3>

          <p className="mt-3 text-sm font-medium leading-7 text-slate-500">
            {post.excerpt ||
              excerpt(
                post.content,
                120,
              )}
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
            <span className="text-sm font-extrabold text-[#C8102E]">
              Read article
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
}: {
  category: string;
}) {
  return (
    <span className="inline-flex rounded-full bg-red-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#C8102E]">
      {formatCategory(category)}
    </span>
  );
}

function NewsBreadcrumb({
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
        href="/news"
        className="transition hover:text-[#C8102E]"
      >
        News
      </Link>

      <ChevronRight className="h-4 w-4 text-slate-300" />

      <span
        className="max-w-[220px] truncate text-[#C8102E] sm:max-w-md"
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

function estimateReadingTime(
  content: string,
) {
  const words = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(
    1,
    Math.ceil(words / 220),
  );
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

type RelatedPost = Awaited<
  ReturnType<
    typeof getRelatedPostsType
  >
>[number];

async function getRelatedPostsType() {
  return prisma.newsPost.findMany({
    take: 12,
  });
}

type NewsPostForJsonLd = Awaited<
  ReturnType<
    typeof getNewsPostType
  >
>;

async function getNewsPostType() {
  return prisma.newsPost.findFirst();
}
function ShareLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-black text-slate-800 transition hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white"
    >
      {children}
    </a>
  );
}
function NewsArticleJsonLd({
  post,
}: {
  post: NonNullable<NewsPostForJsonLd>;
}) {
  const publishedDate =
    post.publishedAt || post.createdAt;

  const pageUrl = `https://ahpk.or.ke/news/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${pageUrl}#article`,
    url: pageUrl,

    headline: post.title,

    description:
      post.excerpt ||
      excerpt(post.content, 200),

    image:
      post.imageUrl ||
      "https://ahpk.or.ke/news-hero.webp",

    datePublished:
      publishedDate.toISOString(),

    dateModified:
      post.updatedAt.toISOString(),

    inLanguage: "en-KE",

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },

    author: {
      "@type": "Organization",
      "@id": "https://ahpk.or.ke/#organization",
      name: "Association of Hotel Professionals Kenya",
      alternateName: "AHPK",
      url: "https://ahpk.or.ke",
    },

    publisher: {
      "@type": "Organization",
      "@id": "https://ahpk.or.ke/#organization",
      name: "Association of Hotel Professionals Kenya",
      alternateName: "AHPK",
      url: "https://ahpk.or.ke",
    },

    articleSection: formatCategory(
      post.category,
    ),
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