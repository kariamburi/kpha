"use client";

import { useState } from "react";
import {
    AlertCircle,
    Building2,
    CreditCard,
    Hash,
    Mail,
    Phone,
    ShieldCheck,
    UserRound,
} from "lucide-react";

type EventBookingFormProps = {
    eventId: string;
    eventSlug: string;
    eventTitle: string;
    fee: number;
};

export default function EventBookingForm({
    eventId,
    eventSlug,
    eventTitle,
    fee,
}: EventBookingFormProps) {
    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        organisation: "",
        membershipNumber: "",
        paymentDetails: "",
    });

    function updateField(
        name: keyof typeof formData,
        value: string,
    ) {
        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();
        setError("");

        if (
            !formData.fullName.trim() ||
            !formData.phone.trim() ||
            !formData.email.trim() ||
            !formData.organisation.trim()
        ) {
            setError(
                "Please complete all required participant information.",
            );
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch(
                "/api/events/book",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        eventId,
                        ...formData,
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok || !data.ok) {
                setError(
                    data.error ||
                    "Failed to create your booking.",
                );
                return;
            }

            if (data.authorizationUrl) {
                window.location.href =
                    data.authorizationUrl;
                return;
            }

            window.location.href = `/events/${eventSlug}/book/success?booking=${encodeURIComponent(
                data.bookingNumber,
            )}`;
        } catch {
            setError(
                "Unable to complete the booking. Please try again.",
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {error ? (
                <div
                    role="alert"
                    className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700"
                >
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                    <span>{error}</span>
                </div>
            ) : null}

            <div className="grid gap-5 md:grid-cols-2">
                <FormInput
                    label="Participant full name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(value) =>
                        updateField("fullName", value)
                    }
                    placeholder="Enter your full name"
                    autoComplete="name"
                    icon={<UserRound />}
                    required
                />

                <FormInput
                    label="Phone number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(value) =>
                        updateField("phone", value)
                    }
                    placeholder="+254 700 000 000"
                    autoComplete="tel"
                    icon={<Phone />}
                    required
                />

                <FormInput
                    label="Email address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(value) =>
                        updateField("email", value)
                    }
                    placeholder="name@example.com"
                    autoComplete="email"
                    icon={<Mail />}
                    required
                />

                <FormInput
                    label="Organisation or affiliation"
                    name="organisation"
                    value={formData.organisation}
                    onChange={(value) =>
                        updateField("organisation", value)
                    }
                    placeholder="Company or organisation"
                    icon={<Building2 />}
                    required
                />

                <FormInput
                    label="AHPK membership number"
                    name="membershipNumber"
                    value={formData.membershipNumber}
                    onChange={(value) =>
                        updateField(
                            "membershipNumber",
                            value,
                        )
                    }
                    placeholder="Enter None if not a member"
                    icon={<Hash />}
                />
            </div>

            <div>
                <label
                    htmlFor="paymentDetails"
                    className="block text-sm font-extrabold text-slate-800"
                >
                    Additional payment or booking details
                </label>

                <textarea
                    id="paymentDetails"
                    name="paymentDetails"
                    rows={4}
                    value={formData.paymentDetails}
                    onChange={(event) =>
                        updateField(
                            "paymentDetails",
                            event.target.value,
                        )
                    }
                    placeholder="Optional notes or payment information"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-800 outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-[#C8102E] focus:bg-white focus:ring-4 focus:ring-red-100/70"
                />
            </div>

            <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50">
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.17em] text-[#C8102E]">
                            Amount payable
                        </p>

                        <p className="mt-2 text-3xl font-black text-slate-950">
                            {fee > 0
                                ? `KES ${fee.toLocaleString(
                                    "en-KE",
                                )}`
                                : "Free"}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                        <ShieldCheck className="h-5 w-5 text-[#C8102E]" />
                        Secure registration
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="flex min-h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {fee > 0 ? (
                    <CreditCard className="h-5 w-5" />
                ) : (
                    <ShieldCheck className="h-5 w-5" />
                )}

                {submitting
                    ? fee > 0
                        ? "Starting secure payment..."
                        : "Completing booking..."
                    : fee > 0
                        ? "Continue to Secure Payment"
                        : "Complete Free Booking"}
            </button>

            <p className="text-center text-xs font-semibold leading-5 text-slate-400">
                By submitting this form, you confirm
                that the participant information
                provided is correct.
            </p>
        </form>
    );
}

function FormInput({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    autoComplete,
    icon,
    required = false,
}: {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    autoComplete?: string;
    icon: React.ReactNode;
    required?: boolean;
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-extrabold text-slate-800"
            >
                {label}
                {required ? (
                    <span className="ml-1 text-[#C8102E]">
                        *
                    </span>
                ) : null}
            </label>

            <div className="relative mt-2">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 [&>svg]:h-4 [&>svg]:w-4">
                    {icon}
                </span>

                <input
                    id={name}
                    name={name}
                    type={type}
                    required={required}
                    value={value}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    className="min-h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-[#C8102E] focus:bg-white focus:ring-4 focus:ring-red-100/70"
                />
            </div>
        </div>
    );
}