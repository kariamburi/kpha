import {
    ImageIcon,
    Plus,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

import {
    deleteHomepageHeroSlide,
    saveHomepageContent,
    saveHomepageHeroSlide,
} from "./actions";

import SubmitButton from "./SubmitButton";

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
            {/* PAGE HEADER */}
            <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                    Website
                </p>

                <h1 className="mt-2 text-3xl font-black text-slate-950">
                    Homepage Management
                </h1>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                    Manage homepage slider
                    images, headlines,
                    buttons and the welcome
                    section.
                </p>
            </div>

            {/* ADD HERO SLIDE */}
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
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
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
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
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
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-700">
                            Button Label
                        </label>

                        <input
                            name="buttonLabel"
                            placeholder="Learn More"
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-700">
                            Button URL
                        </label>

                        <input
                            name="buttonHref"
                            placeholder="/about/who-we-are"
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
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
                            className="mt-2 block w-full cursor-pointer rounded-lg border border-slate-300 px-4 py-3 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-bold file:text-slate-700 hover:file:bg-slate-200"
                        />
                    </div>

                    <label className="flex cursor-pointer items-center gap-3">
                        <input
                            name="active"
                            type="checkbox"
                            defaultChecked
                            className="h-5 w-5 cursor-pointer accent-[#C8102E]"
                        />

                        <span className="text-sm font-bold text-slate-700">
                            Active
                        </span>
                    </label>

                    <div className="lg:col-span-2">
                        <SubmitButton
                            label="Add Slide"
                            pendingLabel="Uploading..."
                            variant="primary"
                        />
                    </div>
                </form>
            </section>

            {/* HERO SLIDES */}
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

                {slides.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm font-medium text-slate-500">
                        No homepage slides
                        have been added yet.
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {slides.map(
                            (slide) => (
                                <article
                                    key={
                                        slide.id
                                    }
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                                >
                                    <div className="grid lg:grid-cols-[320px_1fr]">
                                        {/* IMAGE */}
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

                                        {/* EDIT FORM */}
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
                                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
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
                                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
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
                                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-sm font-bold text-slate-700">
                                                        Button
                                                        Label
                                                    </label>

                                                    <input
                                                        name="buttonLabel"
                                                        defaultValue={
                                                            slide.buttonLabel ||
                                                            ""
                                                        }
                                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-sm font-bold text-slate-700">
                                                        Button
                                                        URL
                                                    </label>

                                                    <input
                                                        name="buttonHref"
                                                        defaultValue={
                                                            slide.buttonHref ||
                                                            ""
                                                        }
                                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
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
                                                        className="mt-2 block w-full cursor-pointer rounded-lg border border-slate-300 px-4 py-3 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-bold file:text-slate-700 hover:file:bg-slate-200"
                                                    />
                                                </div>

                                                <label className="flex cursor-pointer items-center gap-3">
                                                    <input
                                                        name="active"
                                                        type="checkbox"
                                                        defaultChecked={
                                                            slide.active
                                                        }
                                                        className="h-5 w-5 cursor-pointer accent-[#C8102E]"
                                                    />

                                                    <span className="text-sm font-bold text-slate-700">
                                                        Active
                                                    </span>
                                                </label>

                                                <div className="lg:col-span-2 flex flex-wrap gap-3">
                                                    <SubmitButton
                                                        label="Save Changes"
                                                        pendingLabel="Saving..."
                                                        variant="dark"
                                                    />
                                                </div>
                                            </form>

                                            {/* DELETE */}
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

                                                <SubmitButton
                                                    label="Delete Slide"
                                                    pendingLabel="Deleting..."
                                                    variant="danger"
                                                    showTrashIcon
                                                />
                                            </form>
                                        </div>
                                    </div>
                                </article>
                            )
                        )}
                    </div>
                )}
            </section>

            {/* WELCOME SECTION */}
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
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
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
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
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
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
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
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
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
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
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
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
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
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
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
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
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
                            className="mt-2 block w-full cursor-pointer rounded-lg border border-slate-300 px-4 py-3 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-bold file:text-slate-700 hover:file:bg-slate-200"
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <SubmitButton
                            label="Save Welcome Section"
                            pendingLabel="Saving..."
                            variant="primary"
                        />
                    </div>
                </form>
            </section>
        </div>
    );
}