"use client";

import {
    useState,
    type FormEvent,
    type InputHTMLAttributes,
} from "react";

import {
    AlertCircle,
    CheckCircle2,
    Send,
} from "lucide-react";

export default function ContactForm() {
    const [loading, setLoading] =
        useState(false);

    const [success, setSuccess] =
        useState("");

    const [error, setError] =
        useState("");

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        if (loading) {
            return;
        }

        setSuccess("");
        setError("");
        setLoading(true);

        const form = event.currentTarget;
        const formData = new FormData(form);

        const payload = {
            name: String(
                formData.get("name") || "",
            ).trim(),

            email: String(
                formData.get("email") || "",
            ).trim(),

            subject: String(
                formData.get("subject") || "",
            ).trim(),

            message: String(
                formData.get("message") || "",
            ).trim(),
        };

        try {
            const response = await fetch(
                "/api/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify(payload),
                },
            );

            const data = await response
                .json()
                .catch(() => null);

            if (
                !response.ok ||
                !data?.ok
            ) {
                throw new Error(
                    data?.error ||
                    "We could not send your message. Please try again.",
                );
            }

            form.reset();

            setSuccess(
                "Your message has been sent successfully. The AHPK Secretariat will respond as soon as possible.",
            );
        } catch (submissionError) {
            setError(
                submissionError instanceof Error
                    ? submissionError.message
                    : "We could not send your message. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <div
                aria-live="polite"
                aria-atomic="true"
            >
                {success ? (
                    <div className="flex items-start gap-3 border-l-4 border-emerald-600 bg-emerald-50 px-4 py-3 text-sm font-semibold leading-6 text-emerald-800">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

                        <span>{success}</span>
                    </div>
                ) : null}

                {error ? (
                    <div className="flex items-start gap-3 border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700">
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                        <span>{error}</span>
                    </div>
                ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    label="Full name"
                    name="name"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    minLength={2}
                />

                <FormField
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                />
            </div>

            <FormField
                label="Subject"
                name="subject"
                placeholder="How can we assist you?"
                minLength={3}
            />

            <div>
                <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-black text-slate-800"
                >
                    Message
                </label>

                <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    minLength={10}
                    placeholder="Write your enquiry here..."
                    className="w-full resize-y border border-slate-300 bg-white px-4 py-3 text-sm font-semibold leading-7 text-slate-800 outline-none transition placeholder:font-medium placeholder:text-slate-400 hover:border-slate-400 focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                />
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-300 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-xs font-semibold leading-5 text-slate-500">
                    Please provide accurate contact
                    details so the AHPK Secretariat can
                    respond to your enquiry.
                </p>

                <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 bg-[#C1121F] px-6 text-sm font-black text-white transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Send className="h-4 w-4" />

                    {loading
                        ? "Sending message..."
                        : "Send Message"}
                </button>
            </div>
        </form>
    );
}

type FormFieldProps =
    InputHTMLAttributes<HTMLInputElement> & {
        label: string;
        name: string;
    };

function FormField({
    label,
    name,
    className,
    ...props
}: FormFieldProps) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-black text-slate-800"
            >
                {label}
            </label>

            <input
                {...props}
                id={name}
                name={name}
                required
                className={[
                    "min-h-11 w-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition",
                    "placeholder:font-medium placeholder:text-slate-400",
                    "hover:border-slate-400",
                    "focus:border-[#C1121F] focus:ring-2 focus:ring-red-100",
                    className,
                ]
                    .filter(Boolean)
                    .join(" ")}
            />
        </div>
    );
}