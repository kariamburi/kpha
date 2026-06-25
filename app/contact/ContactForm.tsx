"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSuccess("");
        setError("");
        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: formData.get("name"),
                email: formData.get("email"),
                subject: formData.get("subject"),
                message: formData.get("message"),
            }),
        });

        const data = await res.json();
        setLoading(false);

        if (!data.ok) {
            setError(data.error || "Failed to send message.");
            return;
        }

        form.reset();
        setSuccess("Message sent successfully. AHPK Secretariat will respond soon.");
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {success && (
                <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
                    {success}
                </div>
            )}

            {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                    {error}
                </div>
            )}

            <Input name="name" placeholder="Your name" />
            <Input name="email" type="email" placeholder="Email address" />
            <Input name="subject" placeholder="Subject" />

            <textarea
                name="message"
                rows={7}
                required
                placeholder="Message"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
            />

            <button
                type="submit"
                disabled={loading}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#C1121F] px-6 py-4 text-sm font-black text-white hover:bg-red-800 disabled:opacity-60"
            >
                <Send className="h-4 w-4" />
                {loading ? "Sending..." : "Send Message"}
            </button>
        </form>
    );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
        />
    );
}