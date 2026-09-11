import {
    ImageIcon,
    Plus,
    Trash2,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

import {
    deleteHomepageHeroSlide,
    saveHomepageContent,
    saveHomepageHeroSlide,
} from "./actions";

export const dynamic =
    "force-dynamic";

export default async function HomepageAdminPage() {
    const [
        slides,
        content,
    ] = await Promise.all([
        prisma
            .homepageHeroSlide
            .findMany({
                orderBy: [
                    {
                        order: "asc",
                    },
                    {
                        createdAt:
                            "asc",
                    },
                ],
            }),

        prisma
            .homepageContent
            .findUnique({
                where: {
                    id: 1,
                },
            }),
    ]);

    return (
        <div className="space-y-8 p-6">
            <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                    Website
                </p>

                <h1 className="mt-2 text-3xl font-black text-slate-950">
                    Homepage Management
                </h1>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                    Manage homepage
                    slider images,
                    headlines, buttons
                    and the welcome
                    section.
                </p>
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                        <Plus className="h-5 w-5" />
                    </div>

                    <div>
                        <h2 className="text-xl font-black text-slate-950">
                            Add Hero Slide
                        </h2>

                        <p className="text-sm text-slate-500">
                            Create a new
                            homepage slider
                            item.
                        </p>
                    </div>
                </div>

                <form
                    action={
                        saveHomepageHeroSlide
                    }
                    className="mt-6 grid gap-5 lg:grid-cols-2"
                >
                    <div>
                        <label className="text-sm font-bold text-slate-700">
                            Title
                        </label>

                        <input
                            name="title"
                            required
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-700">
                            Display Order
                        </label>

                        <input
                            name="order"
                            type="number"
                            defaultValue={
                                slides.length
                            }
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <label className="text-sm font-bold text-slate-700">
                            Description
                        </label>

                        <textarea
                            name="description"
                            required
                            rows={4}
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-700">
                            Button Label
                        </label>

                        <input
                            name="buttonLabel"
                            placeholder="Learn More"
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-700">
                            Button URL
                        </label>

                        <input
                            name="buttonHref"
                            placeholder="/about/who-we-are"
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <label className="text-sm font-bold text-slate-700">
                            Slide Image
                        </label>

                        <input
                            name="image"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            required
                            className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <label className="flex items-center gap-3">
                        <input
                            name="active"
                            type="checkbox"
                            defaultChecked
                            className="h-5 w-5"
                        />

                        <span className="text-sm font-bold text-slate-700">
                            Active
                        </span>
                    </label>

                    <div className="lg:col-span-2">
                        <button
                            type="submit"
                            className="rounded-lg bg-[#C8102E] px-6 py-3 text-sm font-black text-white"
                        >
                            Add Slide
                        </button>
                    </div>
                </form>
            </section>

            <section className="space-y-5">
                <div>
                    <h2 className="text-2xl font-black text-slate-950">
                        Hero Slides
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Edit existing
                        homepage slides.
                    </p>
                </div>

                {slides.length ===
                    0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                        No homepage
                        slides have been
                        added yet.
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {slides.map(
                            (
                                slide
                            ) => (
                                <article
                                    key={
                                        slide.id
                                    }
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                                >
                                    <div className="grid lg:grid-cols-[320px_1fr]">
                                        <div className="bg-slate-100">
                                            <img
                                                src={
                                                    slide.imageUrl
                                                }
                                                alt={
                                                    slide.title
                                                }
                                                className="h-full min-h-[240px] w-full object-cover"
                                            />
                                        </div>

                                        <div className="p-6">
                                            <form
                                                action={
                                                    saveHomepageHeroSlide
                                                }
                                                className="grid gap-4 lg:grid-cols-2"
                                            >
                                                <input
                                                    type="hidden"
                                                    name="id"
                                                    value={
                                                        slide.id
                                                    }
                                                />

                                                <div>
                                                    <label className="text-sm font-bold text-slate-700">
                                                        Title
                                                    </label>

                                                    <input
                                                        name="title"
                                                        defaultValue={
                                                            slide.title
                                                        }
                                                        required
                                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-sm font-bold text-slate-700">
                                                        Order
                                                    </label>

                                                    <input
                                                        name="order"
                                                        type="number"
                                                        defaultValue={
                                                            slide.order
                                                        }
                                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                                                    />
                                                </div>

                                                <div className="lg:col-span-2">
                                                    <label className="text-sm font-bold text-slate-700">
                                                        Description
                                                    </label>

                                                    <textarea
                                                        name="description"
                                                        rows={
                                                            3
                                                        }
                                                        defaultValue={
                                                            slide.description
                                                        }
                                                        required
                                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-sm font-bold text-slate-700">
                                                        Button Label
                                                    </label>

                                                    <input
                                                        name="buttonLabel"
                                                        defaultValue={
                                                            slide.buttonLabel ||
                                                            ""
                                                        }
                                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-sm font-bold text-slate-700">
                                                        Button URL
                                                    </label>

                                                    <input
                                                        name="buttonHref"
                                                        defaultValue={
                                                            slide.buttonHref ||
                                                            ""
                                                        }
                                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                                                    />
                                                </div>

                                                <div className="lg:col-span-2">
                                                    <label className="text-sm font-bold text-slate-700">
                                                        Replace
                                                        Image
                                                    </label>

                                                    <input
                                                        name="image"
                                                        type="file"
                                                        accept="image/jpeg,image/png,image/webp"
                                                        className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3"
                                                    />
                                                </div>

                                                <label className="flex items-center gap-3">
                                                    <input
                                                        name="active"
                                                        type="checkbox"
                                                        defaultChecked={
                                                            slide.active
                                                        }
                                                        className="h-5 w-5"
                                                    />

                                                    <span className="text-sm font-bold text-slate-700">
                                                        Active
                                                    </span>
                                                </label>

                                                <div className="lg:col-span-2 flex flex-wrap gap-3">
                                                    <button
                                                        type="submit"
                                                        className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-black text-white"
                                                    >
                                                        Save
                                                        Changes
                                                    </button>
                                                </div>
                                            </form>

                                            <form
                                                action={
                                                    deleteHomepageHeroSlide
                                                }
                                                className="mt-3"
                                            >
                                                <input
                                                    type="hidden"
                                                    name="id"
                                                    value={
                                                        slide.id
                                                    }
                                                />

                                                <button
                                                    type="submit"
                                                    className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-5 py-3 text-sm font-black text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />

                                                    Delete
                                                    Slide
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </article>
                            )
                        )}
                    </div>
                )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
                        <ImageIcon className="h-5 w-5" />
                    </div>

                    <div>
                        <h2 className="text-xl font-black text-slate-950">
                            Welcome Section
                        </h2>

                        <p className="text-sm text-slate-500">
                            Manage the
                            content below the
                            main slider.
                        </p>
                    </div>
                </div>

                {content
                    ?.welcomeImageUrl ? (
                    <div className="mt-6 max-w-xl overflow-hidden rounded-xl bg-slate-100">
                        <img
                            src={
                                content.welcomeImageUrl
                            }
                            alt="Current welcome section"
                            className="h-64 w-full object-cover"
                        />
                    </div>
                ) : null}

                <form
                    action={
                        saveHomepageContent
                    }
                    className="mt-6 grid gap-5 lg:grid-cols-2"
                >
                    <div>
                        <label className="text-sm font-bold text-slate-700">
                            Section Label
                        </label>

                        <input
                            name="welcomeLabel"
                            defaultValue={
                                content?.welcomeLabel ||
                                "Welcome to AHPK"
                            }
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-700">
                            Welcome Title
                        </label>

                        <input
                            name="welcomeTitle"
                            defaultValue={
                                content?.welcomeTitle ||
                                ""
                            }
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <label className="text-sm font-bold text-slate-700">
                            Main Text
                        </label>

                        <textarea
                            name="welcomeText"
                            rows={4}
                            defaultValue={
                                content?.welcomeText ||
                                ""
                            }
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <label className="text-sm font-bold text-slate-700">
                            Secondary Text
                        </label>

                        <textarea
                            name="welcomeSecondaryText"
                            rows={4}
                            defaultValue={
                                content?.welcomeSecondaryText ||
                                ""
                            }
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-700">
                            Primary Button
                            Label
                        </label>

                        <input
                            name="primaryButtonLabel"
                            defaultValue={
                                content?.primaryButtonLabel ||
                                "Discover AHPK"
                            }
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-700">
                            Primary Button
                            URL
                        </label>

                        <input
                            name="primaryButtonHref"
                            defaultValue={
                                content?.primaryButtonHref ||
                                "/about/who-we-are"
                            }
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-700">
                            Secondary Button
                            Label
                        </label>

                        <input
                            name="secondaryButtonLabel"
                            defaultValue={
                                content?.secondaryButtonLabel ||
                                "Become a Member"
                            }
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-700">
                            Secondary Button
                            URL
                        </label>

                        <input
                            name="secondaryButtonHref"
                            defaultValue={
                                content?.secondaryButtonHref ||
                                "/apply"
                            }
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <label className="text-sm font-bold text-slate-700">
                            Replace Welcome
                            Image
                        </label>

                        <input
                            name="welcomeImage"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <button
                            type="submit"
                            className="rounded-lg bg-[#C8102E] px-6 py-3 text-sm font-black text-white"
                        >
                            Save Welcome
                            Section
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}