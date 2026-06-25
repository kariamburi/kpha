"use client";

export default function DashboardModal({
    open,
    onClose,
    title,
    subtitle,
    children,
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}) {
    if (!open) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-slate-950/60 p-4 backdrop-blur-sm"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex h-[90dvh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgba(15,23,42,.35)]"
            >
                <div className="flex shrink-0 items-start justify-between gap-5 border-b border-slate-200 bg-[#111111] px-7 py-5 text-white">
                    <div>
                        <p className="text-xs font-black tracking-[0.25em] text-[#F3C64E]">
                            AHPK WEBSITE CMS
                        </p>

                        <h2 className="mt-2 text-2xl font-black">{title}</h2>

                        {subtitle && (
                            <p className="mt-1 text-sm font-semibold text-white/60">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-2xl font-black text-white hover:bg-white/20"
                    >
                        ×
                    </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto p-7">
                    {children}
                </div>
            </div>
        </div>
    );
}