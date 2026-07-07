"use client";

import { useState } from "react";

export default function DownloadCertificateButton({
    href,
    label = "Download Certificate PDF",
    small = false,
}: {
    href: string;
    label?: string;
    small?: boolean;
}) {
    const [loading, setLoading] = useState(false);

    return (
        <a
            href={href}
            onClick={() => setLoading(true)}
            className={`flex items-center justify-center gap-2 rounded font-bold text-white transition ${small ? "px-3 py-1.5 text-[12px]" : "rounded-xl px-5 py-3 text-sm font-black"
                } ${loading
                    ? "pointer-events-none bg-black opacity-80"
                    : small
                        ? "bg-[#111111] hover:bg-black"
                        : "bg-[#C1121F] hover:bg-red-800"
                }`}
        >
            {loading ? (
                <>
                    <span className={`${small ? "h-3 w-3" : "h-5 w-5"} animate-spin rounded-full border-2 border-white border-t-transparent`} />
                    {small ? "..." : "Downloading..."}
                </>
            ) : (
                label
            )}
        </a>
    );
}