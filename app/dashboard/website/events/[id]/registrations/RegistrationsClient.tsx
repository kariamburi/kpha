"use client";

import Link from "next/link";
import {
    useMemo,
    useState,
} from "react";

import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    CircleDollarSign,
    Download,
    Eye,
    Mail,
    MapPin,
    Phone,
    Printer,
    Search,
    Ticket,
    UserCheck,
    Users,
    XCircle,
} from "lucide-react";

import {
    cancelRegistration,
    confirmRegistration,
    markRegistrationPaid,
    restoreRegistration,
} from "./actions";

type BookingStatus =
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED";

type PaymentStatus =
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "CANCELLED";

type PaymentMethod =
    | "PAYSTACK"
    | "FREE"
    | "MANUAL"
    | null;

type EventData = {
    id: string;
    title: string;
    slug: string;
    venue: string | null;
    eventDate: string;
    capacity: number | null;
    fee: number;
};

type Registration = {
    id: string;
    bookingNumber: string;
    fullName: string;
    phone: string;
    email: string;
    organisation: string | null;
    membershipNumber: string | null;
    paymentDetails: string | null;
    amount: number;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    paymentReference: string | null;
    paidAt: string | null;
    createdAt: string;
};

type Props = {
    event: EventData;
    registrations: Registration[];
};

export default function RegistrationsClient({
    event,
    registrations,
}: Props) {
    const [query, setQuery] = useState("");
    const [
        paymentFilter,
        setPaymentFilter,
    ] = useState("");

    const [
        bookingFilter,
        setBookingFilter,
    ] = useState("");

    const [
        selectedRegistration,
        setSelectedRegistration,
    ] =
        useState<Registration | null>(null);

    const confirmedCount =
        registrations.filter(
            (item) =>
                item.status === "CONFIRMED",
        ).length;

    const pendingCount =
        registrations.filter(
            (item) =>
                item.status === "PENDING",
        ).length;

    const cancelledCount =
        registrations.filter(
            (item) =>
                item.status === "CANCELLED",
        ).length;

    const paidCount =
        registrations.filter(
            (item) =>
                item.paymentStatus === "PAID",
        ).length;

    const totalRevenue =
        registrations.reduce(
            (sum, item) =>
                item.paymentStatus === "PAID"
                    ? sum + item.amount
                    : sum,
            0,
        );

    const availablePlaces =
        event.capacity === null
            ? null
            : Math.max(
                event.capacity -
                confirmedCount,
                0,
            );

    const filteredRegistrations =
        useMemo(() => {
            const search =
                query.trim().toLowerCase();

            return registrations.filter(
                (registration) => {
                    const matchesQuery =
                        !search ||
                        registration.fullName
                            .toLowerCase()
                            .includes(search) ||
                        registration.email
                            .toLowerCase()
                            .includes(search) ||
                        registration.phone
                            .toLowerCase()
                            .includes(search) ||
                        registration.bookingNumber
                            .toLowerCase()
                            .includes(search) ||
                        registration.organisation
                            ?.toLowerCase()
                            .includes(search) ||
                        registration.membershipNumber
                            ?.toLowerCase()
                            .includes(search);

                    const matchesPayment =
                        !paymentFilter ||
                        registration.paymentStatus ===
                        paymentFilter;

                    const matchesBooking =
                        !bookingFilter ||
                        registration.status ===
                        bookingFilter;

                    return (
                        matchesQuery &&
                        matchesPayment &&
                        matchesBooking
                    );
                },
            );
        }, [
            registrations,
            query,
            paymentFilter,
            bookingFilter,
        ]);

    function resetFilters() {
        setQuery("");
        setPaymentFilter("");
        setBookingFilter("");
    }

    function printAttendanceRegister() {
        window.print();
    }

    return (
        <div className="space-y-5">
            <section className="print:hidden rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <Link
                    href="/dashboard/website/events"
                    className="inline-flex items-center gap-2 text-sm font-black text-[#C1121F] hover:text-red-800"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Events
                </Link>

                <div className="mt-5 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                    <div>
                        <p className="text-sm font-black text-slate-500">
                            Event Bookings
                        </p>

                        <h1 className="mt-1 text-3xl font-black text-slate-950">
                            {event.title}
                        </h1>

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-500">
                            <span className="inline-flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-[#C1121F]" />
                                {formatDateTime(
                                    event.eventDate,
                                )}
                            </span>

                            <span className="inline-flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-[#C1121F]" />
                                {event.venue ||
                                    "Venue not specified"}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            href={`/events/${event.slug}`}
                            target="_blank"
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                        >
                            <Eye className="h-4 w-4" />
                            View Event
                        </Link>

                        <a
                            href={`/api/events/${event.id}/registrations/export`}
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                        >
                            <Download className="h-4 w-4" />
                            Export CSV
                        </a>

                        <button
                            type="button"
                            onClick={
                                printAttendanceRegister
                            }
                            className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C1121F] px-4 text-sm font-black text-white transition hover:bg-red-800"
                        >
                            <Printer className="h-4 w-4" />
                            Print Register
                        </button>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
                <StatCard
                    title="Total Bookings"
                    value={registrations.length}
                    icon={<Users />}
                    tone="blue"
                />

                <StatCard
                    title="Confirmed"
                    value={confirmedCount}
                    icon={<UserCheck />}
                    tone="green"
                />

                <StatCard
                    title="Pending"
                    value={pendingCount}
                    icon={<Ticket />}
                    tone="amber"
                />

                <StatCard
                    title="Cancelled"
                    value={cancelledCount}
                    icon={<XCircle />}
                    tone="red"
                />

                <StatCard
                    title="Payments"
                    value={paidCount}
                    icon={<CheckCircle2 />}
                    tone="green"
                />

                <StatCard
                    title="Revenue"
                    value={`KES ${totalRevenue.toLocaleString(
                        "en-KE",
                    )}`}
                    icon={<CircleDollarSign />}
                    tone="red"
                />
            </section>

            <section className="print:hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4">
                    <h2 className="text-lg font-black text-slate-950">
                        Search and Filter
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-slate-500">
                        Find attendees using their name,
                        booking number, email, phone or
                        organisation.
                    </p>
                </div>

                <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_190px_190px_auto]">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <input
                            value={query}
                            onChange={(event) =>
                                setQuery(event.target.value)
                            }
                            placeholder="Search bookings..."
                            className="h-11 w-full rounded-xl border border-slate-300 pl-10 pr-4 text-sm font-semibold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                        />
                    </div>

                    <select
                        value={paymentFilter}
                        onChange={(event) =>
                            setPaymentFilter(
                                event.target.value,
                            )
                        }
                        className="h-11 rounded-xl border border-slate-300 px-3 text-sm font-semibold outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">
                            All payment statuses
                        </option>
                        <option value="PAID">
                            Paid
                        </option>
                        <option value="PENDING">
                            Pending payment
                        </option>
                        <option value="FAILED">
                            Failed
                        </option>
                        <option value="CANCELLED">
                            Cancelled payment
                        </option>
                    </select>

                    <select
                        value={bookingFilter}
                        onChange={(event) =>
                            setBookingFilter(
                                event.target.value,
                            )
                        }
                        className="h-11 rounded-xl border border-slate-300 px-3 text-sm font-semibold outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">
                            All booking statuses
                        </option>
                        <option value="CONFIRMED">
                            Confirmed
                        </option>
                        <option value="PENDING">
                            Pending
                        </option>
                        <option value="CANCELLED">
                            Cancelled
                        </option>
                    </select>

                    <button
                        type="button"
                        onClick={resetFilters}
                        className="h-11 cursor-pointer rounded-xl border border-slate-300 px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                    >
                        Reset
                    </button>
                </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C1121F]">
                                Attendance register
                            </p>

                            <h2 className="mt-2 text-xl font-black text-slate-950">
                                Registered Participants
                            </h2>

                            <p className="mt-1 text-sm font-semibold text-slate-500">
                                Showing{" "}
                                {
                                    filteredRegistrations.length
                                }{" "}
                                of {registrations.length}{" "}
                                bookings
                            </p>
                        </div>

                        <div className="text-sm font-bold text-slate-500">
                            {event.capacity
                                ? `${confirmedCount}/${event.capacity} confirmed • ${availablePlaces} available`
                                : `${confirmedCount} confirmed`}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1450px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <Th>Booking Number</Th>
                                <Th>Participant</Th>
                                <Th>Contact</Th>
                                <Th>Organisation</Th>
                                <Th>Membership</Th>
                                <Th>Amount</Th>
                                <Th>Payment</Th>
                                <Th>Booking Status</Th>
                                <Th>Registered</Th>

                                <th className="print:hidden px-3 py-3 text-left font-black">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredRegistrations.length ===
                                0 ? (
                                <tr>
                                    <td
                                        colSpan={10}
                                        className="px-5 py-12 text-center text-sm font-semibold text-slate-500"
                                    >
                                        No event bookings matched
                                        your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredRegistrations.map(
                                    (registration) => (
                                        <tr
                                            key={registration.id}
                                            className="border-b border-slate-100 align-top hover:bg-slate-50"
                                        >
                                            <td className="px-3 py-4">
                                                <p className="font-mono font-black text-[#C1121F]">
                                                    {
                                                        registration.bookingNumber
                                                    }
                                                </p>

                                                {registration.paymentReference ? (
                                                    <p className="mt-1 max-w-[180px] truncate text-[10px] text-slate-400">
                                                        {
                                                            registration.paymentReference
                                                        }
                                                    </p>
                                                ) : null}
                                            </td>

                                            <td className="px-3 py-4">
                                                <p className="font-black text-slate-900">
                                                    {
                                                        registration.fullName
                                                    }
                                                </p>

                                                <p className="mt-1 text-[11px] text-slate-500">
                                                    {
                                                        registration.email
                                                    }
                                                </p>
                                            </td>

                                            <td className="px-3 py-4">
                                                <p className="inline-flex items-center gap-1 font-semibold text-slate-700">
                                                    <Phone className="h-3.5 w-3.5" />
                                                    {
                                                        registration.phone
                                                    }
                                                </p>

                                                <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-slate-500">
                                                    <Mail className="h-3.5 w-3.5" />
                                                    {
                                                        registration.email
                                                    }
                                                </p>
                                            </td>

                                            <td className="px-3 py-4 font-semibold text-slate-700">
                                                {registration.organisation ||
                                                    "-"}
                                            </td>

                                            <td className="px-3 py-4 font-semibold text-slate-700">
                                                {registration.membershipNumber ||
                                                    "Non-member"}
                                            </td>

                                            <td className="px-3 py-4 font-black text-slate-900">
                                                KES{" "}
                                                {registration.amount.toLocaleString(
                                                    "en-KE",
                                                )}
                                            </td>

                                            <td className="px-3 py-4">
                                                <PaymentBadge
                                                    status={
                                                        registration.paymentStatus
                                                    }
                                                />

                                                {registration.paymentMethod ? (
                                                    <p className="mt-2 text-[10px] font-bold text-slate-400">
                                                        {
                                                            registration.paymentMethod
                                                        }
                                                    </p>
                                                ) : null}
                                            </td>

                                            <td className="px-3 py-4">
                                                <BookingBadge
                                                    status={
                                                        registration.status
                                                    }
                                                />
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-4 font-semibold text-slate-600">
                                                {formatDateTime(
                                                    registration.createdAt,
                                                )}
                                            </td>

                                            <td className="print:hidden px-3 py-4">
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setSelectedRegistration(
                                                                registration,
                                                            )
                                                        }
                                                        className="cursor-pointer rounded-lg bg-slate-100 px-3 py-2 text-[11px] font-black text-slate-700 transition hover:bg-slate-200"
                                                    >
                                                        View
                                                    </button>

                                                    {registration.status ===
                                                        "CANCELLED" ? (
                                                        <ActionForm
                                                            action={
                                                                restoreRegistration
                                                            }
                                                            registrationId={
                                                                registration.id
                                                            }
                                                            label="Restore"
                                                            className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                                                        />
                                                    ) : (
                                                        <>
                                                            {registration.status !==
                                                                "CONFIRMED" ? (
                                                                <ActionForm
                                                                    action={
                                                                        confirmRegistration
                                                                    }
                                                                    registrationId={
                                                                        registration.id
                                                                    }
                                                                    label="Confirm"
                                                                    className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                                                />
                                                            ) : null}

                                                            {registration.paymentStatus !==
                                                                "PAID" ? (
                                                                <ActionForm
                                                                    action={
                                                                        markRegistrationPaid
                                                                    }
                                                                    registrationId={
                                                                        registration.id
                                                                    }
                                                                    label="Mark Paid"
                                                                    className="bg-amber-50 text-amber-700 hover:bg-amber-100"
                                                                />
                                                            ) : null}

                                                            <ActionForm
                                                                action={
                                                                    cancelRegistration
                                                                }
                                                                registrationId={
                                                                    registration.id
                                                                }
                                                                label="Cancel"
                                                                confirmMessage="Cancel this event booking?"
                                                                className="bg-red-50 text-red-700 hover:bg-red-100"
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ),
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {selectedRegistration ? (
                <BookingModal
                    registration={
                        selectedRegistration
                    }
                    onClose={() =>
                        setSelectedRegistration(null)
                    }
                />
            ) : null}
        </div>
    );
}

function ActionForm({
    action,
    registrationId,
    label,
    className,
    confirmMessage,
}: {
    action: (
        formData: FormData,
    ) => void | Promise<void>;
    registrationId: string;
    label: string;
    className: string;
    confirmMessage?: string;
}) {
    return (
        <form
            action={action}
            onSubmit={(event) => {
                if (
                    confirmMessage &&
                    !window.confirm(confirmMessage)
                ) {
                    event.preventDefault();
                }
            }}
        >
            <input
                type="hidden"
                name="registrationId"
                value={registrationId}
            />

            <button
                type="submit"
                className={`cursor-pointer rounded-lg px-3 py-2 text-[11px] font-black transition ${className}`}
            >
                {label}
            </button>
        </form>
    );
}

function BookingModal({
    registration,
    onClose,
}: {
    registration: Registration;
    onClose: () => void;
}) {
    return (
        <div className="print:hidden fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
            <button
                type="button"
                aria-label="Close booking"
                onClick={onClose}
                className="absolute inset-0 cursor-default"
            />

            <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white shadow-2xl">
                <div className="border-b border-slate-200 px-6 py-5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C1121F]">
                        Booking details
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                        {registration.fullName}
                    </h2>

                    <p className="mt-1 font-mono text-sm font-bold text-slate-500">
                        {registration.bookingNumber}
                    </p>
                </div>

                <div className="grid gap-4 p-6 sm:grid-cols-2">
                    <ModalInfo
                        label="Email"
                        value={registration.email}
                    />

                    <ModalInfo
                        label="Phone"
                        value={registration.phone}
                    />

                    <ModalInfo
                        label="Organisation"
                        value={
                            registration.organisation ||
                            "-"
                        }
                    />

                    <ModalInfo
                        label="Membership Number"
                        value={
                            registration.membershipNumber ||
                            "Non-member"
                        }
                    />

                    <ModalInfo
                        label="Amount"
                        value={`KES ${registration.amount.toLocaleString(
                            "en-KE",
                        )}`}
                    />

                    <ModalInfo
                        label="Payment Method"
                        value={
                            registration.paymentMethod ||
                            "-"
                        }
                    />

                    <ModalInfo
                        label="Payment Status"
                        value={
                            registration.paymentStatus
                        }
                    />

                    <ModalInfo
                        label="Booking Status"
                        value={registration.status}
                    />

                    <ModalInfo
                        label="Payment Reference"
                        value={
                            registration.paymentReference ||
                            "-"
                        }
                        wide
                    />

                    <ModalInfo
                        label="Additional Details"
                        value={
                            registration.paymentDetails ||
                            "-"
                        }
                        wide
                    />

                    <ModalInfo
                        label="Registration Date"
                        value={formatDateTime(
                            registration.createdAt,
                        )}
                        wide
                    />
                </div>

                <div className="border-t border-slate-200 bg-slate-50 p-5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-black text-white"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

function ModalInfo({
    label,
    value,
    wide = false,
}: {
    label: string;
    value: string;
    wide?: boolean;
}) {
    return (
        <div
            className={`rounded-2xl bg-slate-50 p-4 ${wide ? "sm:col-span-2" : ""
                }`}
        >
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                {label}
            </p>

            <p className="mt-1 break-words text-sm font-black leading-6 text-slate-900">
                {value}
            </p>
        </div>
    );
}

function StatCard({
    title,
    value,
    icon,
    tone,
}: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    tone:
    | "blue"
    | "green"
    | "amber"
    | "red";
}) {
    const styles = {
        blue:
            "border-blue-100 bg-blue-50 text-blue-700",
        green:
            "border-emerald-100 bg-emerald-50 text-emerald-700",
        amber:
            "border-amber-100 bg-amber-50 text-amber-700",
        red:
            "border-red-100 bg-red-50 text-red-700",
    };

    return (
        <div
            className={`rounded-2xl border p-5 shadow-sm ${styles[tone]}`}
        >
            <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold opacity-80">
                    {title}
                </p>

                <span className="[&>svg]:h-5 [&>svg]:w-5">
                    {icon}
                </span>
            </div>

            <p className="mt-3 text-2xl font-black">
                {value}
            </p>
        </div>
    );
}

function PaymentBadge({
    status,
}: {
    status: PaymentStatus;
}) {
    const styles = {
        PAID:
            "bg-emerald-50 text-emerald-700",
        PENDING:
            "bg-amber-50 text-amber-700",
        FAILED:
            "bg-red-50 text-red-700",
        CANCELLED:
            "bg-slate-100 text-slate-600",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black ${styles[status]}`}
        >
            {status}
        </span>
    );
}

function BookingBadge({
    status,
}: {
    status: BookingStatus;
}) {
    const styles = {
        CONFIRMED:
            "bg-emerald-50 text-emerald-700",
        PENDING:
            "bg-amber-50 text-amber-700",
        CANCELLED:
            "bg-red-50 text-red-700",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black ${styles[status]}`}
        >
            {status}
        </span>
    );
}

function Th({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <th className="px-3 py-3 text-left font-black">
            {children}
        </th>
    );
}

function formatDateTime(
    value: string,
) {
    return new Date(value).toLocaleString(
        "en-KE",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        },
    );
}