"use client";

import { useEffect, useState } from "react";

type Props = {
  name: string;
  imageUrl?: string | null;
};

function normalizeImageUrl(value?: string | null) {
  const url = value?.trim();
  if (!url) return null;
  // Absolute URLs and root-relative URLs can be used unchanged.
  if (/^(https?:)?\/\//i.test(url) || url.startsWith("/")) return url;
  // Uploaded files stored as relative paths should not resolve beneath /directory/[slug].
  return `/${url.replace(/^\.\/?/, "").replace(/^\/+/, "")}`;
}

export default function MemberProfileAvatar({ name, imageUrl }: Props) {
  const url = normalizeImageUrl(imageUrl);
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [url]);
  const initials = name.trim().split(/\s+/).slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "").join("") || "A";

  return (
    <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-50 text-3xl font-black text-[#C8102E] ring-4 ring-white outline outline-1 outline-red-100">
      {url && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={url}
          src={url}
          alt={`${name} profile`}
          loading="eager"
          referrerPolicy="no-referrer"
          className="h-full w-full rounded-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </div>
  );
}
