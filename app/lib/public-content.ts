import { GalleryCategory, GalleryMediaType, NewsCategory } from "../generated/prisma/enums";

export function eventStatus(value?: string) {
  return value === "upcoming" || value === "past" ? value : "all";
}

export function newsCategory(value?: string): NewsCategory | undefined {
  const map: Record<string, NewsCategory> = {
    notices: NewsCategory.NOTICES,
    "chairman-messages": NewsCategory.CHAIRMAN_MESSAGES,
    "industry-updates": NewsCategory.INDUSTRY_UPDATES,
    "press-releases": NewsCategory.PRESS_RELEASES,
  };
  return value ? map[value] : undefined;
}

export function galleryCategory(value?: string): GalleryCategory | undefined {
  const map: Record<string, GalleryCategory> = {
    events: GalleryCategory.EVENTS,
    agm: GalleryCategory.AGM,
    conference: GalleryCategory.CONFERENCE,
    training: GalleryCategory.TRAINING,
    awards: GalleryCategory.AWARDS,
    community: GalleryCategory.COMMUNITY,
  };
  return value ? map[value] : undefined;
}

export function galleryType(value?: string): GalleryMediaType | undefined {
  if (value === "photos") return GalleryMediaType.IMAGE;
  if (value === "videos") return GalleryMediaType.YOUTUBE;
}

export function dateText(value: Date | string, time = false) {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(time ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(new Date(value));
}

export function dateRange(start: Date | string, end?: Date | string | null) {
  return end ? `${dateText(start, true)} – ${dateText(end, true)}` : dateText(start, true);
}

export function excerpt(value: string, max = 160) {
  const clean = value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max).trim()}…` : clean;
}

export function feeText(value?: number | null) {
  return !value || value <= 0 ? "Free" : `KES ${value.toLocaleString("en-KE")}`;
}

export const eventFilters = [
  { label: "All Events", href: "/events" },
  { label: "Upcoming Events", href: "/events?status=upcoming" },
  { label: "Past Events", href: "/events?status=past" },
] as const;

export const newsFilters = [
  { label: "Latest News", href: "/news" },
  { label: "Association Notices", href: "/news?category=notices" },
  { label: "Chairman's Messages", href: "/news?category=chairman-messages" },
  { label: "Industry Updates", href: "/news?category=industry-updates" },
  { label: "Press Releases", href: "/news?category=press-releases" },
] as const;

export const galleryFilters = [
  { label: "All Albums", href: "/gallery" },
  { label: "Photos", href: "/gallery?type=photos" },
  { label: "Videos", href: "/gallery?type=videos" },
  { label: "Events", href: "/gallery?category=events" },
] as const;
