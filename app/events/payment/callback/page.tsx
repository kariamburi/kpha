import Image from "next/image";
import Link from "next/link";

import Logo from "@/app/assets/logo.png";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";
import { createAuditLog } from "@/lib/audit";

type CallbackPageProps = {
  searchParams: Promise<{
    reference?: string;
  }>;
};

export default async function EventPaymentCallbackPage({
  searchParams,
}: CallbackPageProps) {
  const { reference } = await searchParams;

  if (!reference) {
    return (
      <PaymentFailure message="Payment reference is missing." />
    );
  }

  const verifyResponse = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(
      reference,
    )}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
      cache: "no-store",
    },
  );

  const paystackData =
    await verifyResponse.json();

  if (
    !verifyResponse.ok ||
    !paystackData.status ||
    paystackData.data?.status !==
    "success"
  ) {
    return (
      <PaymentFailure message="The payment could not be verified." />
    );
  }

  const registrationId =
    paystackData.data.metadata
      ?.registrationId;

  if (!registrationId) {
    return (
      <PaymentFailure message="The event booking reference is missing." />
    );
  }

  const existingRegistration: any =
    await prisma.eventRegistration.findUnique({
      where: {
        id: registrationId,
      },
      include: {
        event: true,
      },
    });

  if (!existingRegistration) {
    return (
      <PaymentFailure message="The event booking was not found." />
    );
  }

  const amountPaid =
    Number(paystackData.data.amount || 0) /
    100;

  if (
    amountPaid <
    Number(existingRegistration.amount)
  ) {
    return (
      <PaymentFailure message="The amount paid does not match the event booking amount." />
    );
  }

  const alreadyPaid =
    existingRegistration.paymentStatus ===
    "PAID";

  const registration: any = alreadyPaid
    ? existingRegistration
    : await prisma.eventRegistration.update({
      where: {
        id: existingRegistration.id,
      },
      data: {
        status: "CONFIRMED",
        paymentStatus: "PAID",
        paymentMethod: "PAYSTACK",
        paymentReference: reference,
        paidAt: new Date(),
      },
      include: {
        event: true,
      },
    });

  if (!alreadyPaid) {
    await createAuditLog({
      action:
        "EVENT_PAYMENT_CONFIRMED",
      entityType:
        "EventRegistration",
      entityId: registration.id,
      metadata: {
        bookingNumber:
          registration.bookingNumber,
        paymentReference: reference,
        participantName:
          registration.fullName,
        participantEmail:
          registration.email,
        eventId:
          registration.event.id,
        eventTitle:
          registration.event.title,
        amount:
          registration.amount,
      },
    });

    try {
      await sendMail({
        to: registration.email,
        subject: `Booking Confirmed: ${registration.event.title}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
            <h2 style="color:#C1121F;">Event Booking Confirmed</h2>

            <p>Dear ${escapeHtml(registration.fullName)},</p>

            <p>Your booking and payment for <strong>${escapeHtml(
          registration.event.title,
        )}</strong> have been confirmed.</p>

            <table style="width:100%;border-collapse:collapse;margin-top:18px;">
              <tr>
                <td style="border:1px solid #eeeeee;padding:10px;font-weight:bold;">Booking number</td>
                <td style="border:1px solid #eeeeee;padding:10px;">${escapeHtml(
          registration.bookingNumber,
        )}</td>
              </tr>

              <tr>
                <td style="border:1px solid #eeeeee;padding:10px;font-weight:bold;">Participant</td>
                <td style="border:1px solid #eeeeee;padding:10px;">${escapeHtml(
          registration.fullName,
        )}</td>
              </tr>

              <tr>
                <td style="border:1px solid #eeeeee;padding:10px;font-weight:bold;">Event</td>
                <td style="border:1px solid #eeeeee;padding:10px;">${escapeHtml(
          registration.event.title,
        )}</td>
              </tr>

              <tr>
                <td style="border:1px solid #eeeeee;padding:10px;font-weight:bold;">Amount paid</td>
                <td style="border:1px solid #eeeeee;padding:10px;">KES ${registration.amount.toLocaleString(
          "en-KE",
        )}</td>
              </tr>

              <tr>
                <td style="border:1px solid #eeeeee;padding:10px;font-weight:bold;">Payment reference</td>
                <td style="border:1px solid #eeeeee;padding:10px;">${escapeHtml(
          reference,
        )}</td>
              </tr>
            </table>

            <p style="margin-top:18px;">
              Please keep your booking number for event check-in and support.
            </p>

            <p>Regards,<br/>AHPK Secretariat</p>
          </div>
        `,
      });
    } catch (error) {
      console.error(
        "EVENT_CONFIRMATION_EMAIL_ERROR",
        error,
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#111111] px-5 py-10 text-white">
        <div className="mx-auto flex max-w-5xl items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2">
            <Image
              src={Logo}
              alt="AHPK Logo"
              width={52}
              height={52}
              priority
              className="object-contain"
            />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F3C64E]">
              AHPK Events
            </p>

            <h1 className="mt-1 text-3xl font-black">
              Booking Confirmed
            </h1>

            <p className="mt-2 text-sm font-semibold text-white/70">
              Your payment and registration
              have been received.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-7 max-w-5xl px-5 pb-14">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
          <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black text-slate-500">
                Participant
              </p>

              <h2 className="mt-1 text-3xl font-black text-slate-950">
                {registration.fullName}
              </h2>

              <p className="mt-2 text-sm font-semibold text-slate-500">
                {registration.event.title}
              </p>
            </div>

            <span className="w-fit rounded-full bg-green-50 px-5 py-2 text-sm font-black text-green-700">
              PAYMENT CONFIRMED
            </span>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Info
              label="Booking number"
              value={
                registration.bookingNumber
              }
            />

            <Info
              label="Payment reference"
              value={reference}
            />

            <Info
              label="Email"
              value={registration.email}
            />

            <Info
              label="Phone"
              value={registration.phone}
            />

            <Info
              label="Organisation"
              value={
                registration.organisation ||
                "-"
              }
            />

            <Info
              label="Amount paid"
              value={`KES ${registration.amount.toLocaleString(
                "en-KE",
              )}`}
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
            <p className="text-xs font-semibold leading-5 text-slate-500">
              A confirmation email has been
              sent to {registration.email}.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/events/${registration.event.slug}`}
                className="rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-700 hover:bg-slate-50"
              >
                View Event
              </Link>

              <Link
                href="/events"
                className="rounded-xl bg-[#C1121F] px-5 py-3 text-center text-sm font-black text-white hover:bg-red-800"
              >
                Browse Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PaymentFailure({
  message,
}: {
  message: string;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
      <div className="w-full max-w-xl rounded-[28px] border border-red-200 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl">
          ❌
        </div>

        <h1 className="mt-5 text-3xl font-black text-slate-950">
          Payment Verification Failed
        </h1>

        <p className="mt-3 text-sm font-semibold leading-7 text-slate-500">
          {message}
        </p>

        <Link
          href="/events"
          className="mt-6 inline-flex rounded-xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white hover:bg-red-800"
        >
          Return to Events
        </Link>
      </div>
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-all text-sm font-black text-slate-900">
        {value}
      </p>
    </div>
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}