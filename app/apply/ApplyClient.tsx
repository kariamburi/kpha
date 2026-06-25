"use client";

import { useMemo, useState } from "react";
import { completeFreeApplication, saveApplicationDraft } from "./actions";

type Category = {
    id: string;
    name: string;
    description: string | null;
    annualFee: number;
    active: boolean;
};

const steps = ["Personal Info", "Membership", "Documents", "Payment"];

export default function ApplyClient({ categories }: { categories: Category[] }) {
    const [step, setStep] = useState(0);
    const [saving, setSaving] = useState(false);
    const [paying, setPaying] = useState(false);
    const [error, setError] = useState("");

    const [files, setFiles] = useState({
        idDocument: null as File | null,
        qualificationDoc: null as File | null,
        cvDocument: null as File | null,
    });

    const [formData, setFormData] = useState({
        applicationId: "",
        fullName: "",
        email: "",
        phone: "",
        idNumber: "",
        categoryId: "",
        qualification: "",
        institution: "",
        position: "",
        experience: "",
        idDocumentUrl: "",
        qualificationDocUrl: "",
        cvDocumentUrl: "",
    });

    const selectedCategory = useMemo(
        () => categories.find((c) => c.id === formData.categoryId),
        [categories, formData.categoryId]
    );

    const isFreeCategory = !!selectedCategory && selectedCategory.annualFee <= 0;
    const progress = Math.round(((step + 1) / steps.length) * 100);

    function updateField(name: string, value: string) {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function updateFile(name: keyof typeof files, file: File | null) {
        setFiles((prev) => ({ ...prev, [name]: file }));
    }

    async function saveDraft(extra?: Partial<typeof formData>) {
        const merged = { ...formData, ...extra };

        const res = await saveApplicationDraft({
            applicationId: merged.applicationId,
            data: {
                fullName: merged.fullName,
                email: merged.email,
                phone: merged.phone,
                idNumber: merged.idNumber,
                categoryId: merged.categoryId,
                qualification: merged.qualification,
                institution: merged.institution,
                position: merged.position,
                experience: merged.experience,
                idDocumentUrl: merged.idDocumentUrl,
                qualificationDocUrl: merged.qualificationDocUrl,
                cvDocumentUrl: merged.cvDocumentUrl,
            },
        });

        if (!res.ok || !res.applicationId) {
            throw new Error("Failed to save application");
        }

        setFormData((prev) => ({
            ...prev,
            ...extra,
            applicationId: res.applicationId!,
        }));

        return res.applicationId;
    }

    async function uploadDocuments(applicationId: string) {
        if (!files.idDocument || !files.qualificationDoc || !files.cvDocument) {
            throw new Error("Please upload ID copy, certificate and CV.");
        }

        const body = new FormData();
        body.append("applicationId", applicationId);
        body.append("idDocument", files.idDocument);
        body.append("qualificationDoc", files.qualificationDoc);
        body.append("cvDocument", files.cvDocument);

        const res = await fetch("/api/applications/upload-documents", {
            method: "POST",
            body,
        });

        const data = await res.json();

        if (!res.ok || !data.ok) {
            throw new Error(data.error || "Failed to upload documents.");
        }

        const uploaded = {
            idDocumentUrl: data.idDocumentUrl,
            qualificationDocUrl: data.qualificationDocUrl,
            cvDocumentUrl: data.cvDocumentUrl,
        };

        setFormData((prev) => ({
            ...prev,
            ...uploaded,
        }));

        return uploaded;
    }

    async function nextStep() {
        setError("");

        if (step === 0) {
            if (
                !formData.fullName ||
                !formData.email ||
                !formData.phone ||
                !formData.idNumber
            ) {
                setError("Please complete all personal information fields.");
                return;
            }
        }

        if (step === 1) {
            if (!formData.categoryId || !formData.qualification || !formData.institution) {
                setError("Please select membership category and complete qualification details.");
                return;
            }
        }

        if (step === 2) {
            if (!files.idDocument || !files.qualificationDoc || !files.cvDocument) {
                setError("Please upload ID copy, certificate and CV.");
                return;
            }
        }

        setSaving(true);

        try {
            const applicationId = await saveDraft();

            if (step === 2) {
                const uploaded = await uploadDocuments(applicationId);
                await saveDraft(uploaded);
            }

            setStep((current) => Math.min(current + 1, steps.length - 1));
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to save application. Try again."
            );
        } finally {
            setSaving(false);
        }
    }

    async function handlePaystackPayment() {
        setError("");

        if (!selectedCategory) {
            setError("Please select a membership category first.");
            return;
        }

        setPaying(true);

        try {
            const applicationId = await saveDraft();

            const res = await fetch("/api/paystack/initialize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ applicationId }),
            });

            const data = await res.json();

            if (!res.ok || !data.ok) {
                setError(data.error || "Failed to start payment.");
                return;
            }

            window.location.href = data.authorizationUrl;
        } catch {
            setError("Failed to start payment. Try again.");
        } finally {
            setPaying(false);
        }
    }

    async function handleFreeCompletion() {
        setError("");

        if (!selectedCategory) {
            setError("Please select a membership category first.");
            return;
        }

        setPaying(true);

        try {
            const applicationId = await saveDraft();

            const res = await completeFreeApplication(applicationId);

            if (!res.ok) {
                setError(res.error || "Failed to complete application.");
                return;
            }

            window.location.href = `/apply/success?applicationId=${applicationId}`;
        } catch {
            setError("Failed to complete application. Try again.");
        } finally {
            setPaying(false);
        }
    }

    function prevStep() {
        setError("");
        setStep((current) => Math.max(current - 1, 0));
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="bg-[#111111] px-4 py-10 text-white">
                <div className="mx-auto max-w-6xl">
                    <p className="text-xs font-black tracking-[0.35em] text-[#F3C64E]">
                        AHPK MEMBERSHIP
                    </p>

                    <h1 className="mt-2 text-3xl font-black md:text-4xl">
                        Membership Application
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-white/70">
                        Complete your application, upload documents, and submit securely online.
                    </p>
                </div>
            </section>

            <section className="mx-auto -mt-8 max-w-6xl px-4 pb-12">
                <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
                    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl">
                        <div className="border-b border-slate-200 px-5 py-5 md:px-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-black text-slate-500">
                                        Step {step + 1} of {steps.length}
                                    </p>

                                    <h2 className="mt-1 text-2xl font-black text-slate-950">
                                        {steps[step]}
                                    </h2>
                                </div>

                                <div className="text-right">
                                    <p className="text-xl font-black text-[#C1121F]">
                                        {progress}%
                                    </p>
                                    <p className="text-xs font-bold text-slate-400">
                                        Completed
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-[#C1121F] transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
                                {steps.map((item, index) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => index <= step && setStep(index)}
                                        className={`cursor-pointer rounded-xl px-3 py-3 text-left text-xs font-black transition ${index === step
                                            ? "bg-[#C1121F] text-white"
                                            : index < step
                                                ? "bg-green-50 text-green-700"
                                                : "bg-slate-100 text-slate-500"
                                            }`}
                                    >
                                        <span className="mr-2">
                                            {index < step ? "✓" : index + 1}
                                        </span>
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-5 md:p-6">
                            {error && (
                                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                                    {error}
                                </div>
                            )}

                            {step === 0 && (
                                <StepCard
                                    title="Personal Information"
                                    subtitle="Provide your official identification and contact details."
                                >
                                    <div className="grid gap-5 md:grid-cols-2">
                                        <Input name="fullName" label="Full Name" value={formData.fullName} onChange={(v) => updateField("fullName", v)} />
                                        <Input name="email" label="Email Address" type="email" value={formData.email} onChange={(v) => updateField("email", v)} />
                                        <Input name="phone" label="Phone Number" type="tel" value={formData.phone} onChange={(v) => updateField("phone", v)} />
                                        <Input name="idNumber" label="ID / Passport Number" value={formData.idNumber} onChange={(v) => updateField("idNumber", v)} />
                                    </div>
                                </StepCard>
                            )}

                            {step === 1 && (
                                <StepCard
                                    title="Membership Details"
                                    subtitle="Select your membership category and professional background."
                                >
                                    <Label text="Membership Category" />

                                    <select
                                        value={formData.categoryId}
                                        onChange={(e) => updateField("categoryId", e.target.value)}
                                        className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name} - KES {category.annualFee.toLocaleString()}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                                        <Input name="qualification" label="Qualification" value={formData.qualification} onChange={(v) => updateField("qualification", v)} />
                                        <Input name="institution" label="Institution / Employer" value={formData.institution} onChange={(v) => updateField("institution", v)} />
                                        <Input name="position" label="Current Position" value={formData.position} onChange={(v) => updateField("position", v)} />
                                        <Input name="experience" label="Years of Experience" type="number" min="0" value={formData.experience} onChange={(v) => updateField("experience", v)} />
                                    </div>
                                </StepCard>
                            )}

                            {step === 2 && (
                                <StepCard
                                    title="Attach Documents"
                                    subtitle="Upload required documents for Secretariat review."
                                >
                                    <div className="grid gap-4">
                                        <FileInput label="ID / Passport Copy" name="idDocument" file={files.idDocument} onChange={(file) => updateFile("idDocument", file)} />
                                        <FileInput label="Certificate / Qualification" name="qualificationDoc" file={files.qualificationDoc} onChange={(file) => updateFile("qualificationDoc", file)} />
                                        <FileInput label="CV / Professional Profile" name="cvDocument" file={files.cvDocument} onChange={(file) => updateFile("cvDocument", file)} />
                                    </div>
                                </StepCard>
                            )}

                            {step === 3 && (
                                <StepCard
                                    title={isFreeCategory ? "Complete Application" : "Payment"}
                                    subtitle={
                                        isFreeCategory
                                            ? "Confirm your application and submit it for Secretariat review."
                                            : "Confirm your application and proceed to secure payment."
                                    }
                                >
                                    <div className="rounded-2xl bg-slate-50 p-5">
                                        <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                                            Amount Payable
                                        </p>

                                        <h3 className="mt-2 text-4xl font-black text-[#C1121F]">
                                            KES {selectedCategory?.annualFee.toLocaleString() || "0"}
                                        </h3>

                                        <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                                            {isFreeCategory
                                                ? "This membership category does not require online payment. Click complete application to submit your application for review."
                                                : "Payment is processed securely through Paystack. Your application will be submitted after successful payment."}
                                        </p>
                                    </div>

                                    {isFreeCategory ? (
                                        <button
                                            type="button"
                                            disabled={paying}
                                            onClick={handleFreeCompletion}
                                            className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 py-4 text-sm font-black text-white transition hover:bg-black disabled:opacity-60"
                                        >
                                            {paying ? "Completing..." : "Complete Application"}
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            disabled={paying}
                                            onClick={handlePaystackPayment}
                                            className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 py-4 text-sm font-black text-white transition hover:bg-black disabled:opacity-60"
                                        >
                                            {paying ? "Starting payment..." : "Continue to Paystack"}
                                        </button>
                                    )}
                                </StepCard>
                            )}

                            <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    disabled={step === 0 || saving || paying}
                                    className="rounded-xl cursor-pointer border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Back
                                </button>

                                {step < steps.length - 1 && (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={saving || paying}
                                        className="rounded-xl cursor-pointer bg-[#C1121F] px-6 py-3 text-sm font-black text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {saving ? "Saving..." : "Continue"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-5">
                        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl">
                            <p className="text-sm font-black text-slate-500">
                                Application Summary
                            </p>

                            <div className="mt-5 space-y-3">
                                <SummaryItem label="Applicant" value={formData.fullName || "Not provided"} />
                                <SummaryItem label="Email" value={formData.email || "Not provided"} />
                                <SummaryItem label="Category" value={selectedCategory?.name || "Not selected"} />
                                <SummaryItem label="Fee" value={selectedCategory ? `KES ${selectedCategory.annualFee.toLocaleString()}` : "KES 0"} />
                            </div>
                        </div>

                        <div className="rounded-[28px] bg-[#111111] p-5 text-white shadow-xl">
                            <p className="text-sm font-semibold text-white/60">
                                Review Checklist
                            </p>

                            <div className="mt-4 space-y-3 text-sm font-semibold">
                                <ChecklistItem text="Personal details" checked={!!formData.fullName && !!formData.email && !!formData.phone && !!formData.idNumber} />
                                <ChecklistItem text="Membership category" checked={!!formData.categoryId} />
                                <ChecklistItem text="Qualification details" checked={!!formData.qualification && !!formData.institution} />
                                <ChecklistItem text="Documents uploaded" checked={!!files.idDocument && !!files.qualificationDoc && !!files.cvDocument} />
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}

function StepCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
    return (
        <div>
            <div className="border-b border-slate-200 pb-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C1121F]">
                    Application Form
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">{title}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-500">{subtitle}</p>
            </div>

            <div className="mt-6">{children}</div>
        </div>
    );
}

function Input({
    name,
    label,
    type = "text",
    value,
    onChange,
    min,
}: {
    name: string;
    label: string;
    type?: string;
    value: string;
    min?: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <Label text={label} />
            <input
                name={name}
                type={type}
                min={min}
                required
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
            />
        </div>
    );
}

function FileInput({
    name,
    label,
    file,
    onChange,
}: {
    name: string;
    label: string;
    file: File | null;
    onChange: (file: File | null) => void;
}) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 transition hover:border-[#C1121F]">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <Label text={label} />
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                        PDF, JPG or PNG accepted.
                    </p>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${file ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                        }`}
                >
                    {file ? "SELECTED" : "REQUIRED"}
                </span>
            </div>

            <input
                name={name}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => onChange(e.target.files?.[0] || null)}
                className="mt-4 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold"
            />

            {file && (
                <p className="mt-2 break-all text-xs font-bold text-slate-600">
                    {file.name}
                </p>
            )}
        </div>
    );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                {label}
            </p>
            <p className="mt-1 text-sm font-black text-slate-900">{value}</p>
        </div>
    );
}

function ChecklistItem({ text, checked }: { text: string; checked: boolean }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <span>{text}</span>
            <span
                className={`rounded-full px-2 py-1 text-[11px] font-black ${checked
                    ? "bg-green-500/20 text-green-200"
                    : "bg-red-500/20 text-red-200"
                    }`}
            >
                {checked ? "YES" : "NO"}
            </span>
        </div>
    );
}

function Label({ text }: { text: string }) {
    return <label className="block text-sm font-black text-slate-700">{text}</label>;
}