"use client";

import { ReactNode, useMemo, useState } from "react";
import { completeFreeApplication, saveApplicationDraft } from "./actions";
import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    BriefcaseBusiness,
    Check,
    CheckCircle2,
    ChevronRight,
    Circle,
    CreditCard,
    FileCheck2,
    FileText,
    GraduationCap,
    IdCard,
    LockKeyhole,
    Mail,
    Phone,
    ShieldCheck,
    UploadCloud,
    UserRound,
    WalletCards,
} from "lucide-react";

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
        <main className="min-h-screen bg-white text-slate-950">
            {/* APPLICATION HERO */}
            <section className="relative isolate overflow-hidden border-b border-slate-200 bg-white">
                <div className="pointer-events-none absolute inset-0 -z-20">
                    <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-red-100/70 blur-3xl" />

                    <div className="absolute right-0 top-0 h-full w-[55%] bg-[linear-gradient(135deg,transparent_0%,rgba(200,16,46,0.055)_100%)]" />

                    <div className="absolute right-[9%] top-12 h-52 w-52 rounded-full border border-red-100/80" />

                    <div className="absolute right-[14%] top-24 h-28 w-28 rounded-full border border-red-100/60" />
                </div>

                <div className="mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-6 sm:pb-16 lg:px-8">
                    <nav
                        aria-label="Breadcrumb"
                        className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500"
                    >
                        <a
                            href="/"
                            className="transition hover:text-[#C8102E]"
                        >
                            Home
                        </a>

                        <ChevronRight className="h-4 w-4 text-slate-300" />

                        <a
                            href="/membership"
                            className="transition hover:text-[#C8102E]"
                        >
                            Membership
                        </a>

                        <ChevronRight className="h-4 w-4 text-slate-300" />

                        <span
                            className="text-[#C8102E]"
                            aria-current="page"
                        >
                            Apply
                        </span>
                    </nav>

                    <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-100 bg-white text-[#C8102E] shadow-sm">
                                    <BadgeCheck className="h-6 w-6" />
                                </div>

                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#C8102E]">
                                        AHPK Membership
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-500">
                                        Professional membership application
                                    </p>
                                </div>
                            </div>

                            <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.06] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                Begin Your Professional
                                <span className="mt-2 block text-[#C8102E]">
                                    Membership Journey
                                </span>
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                                Complete your membership application,
                                provide your professional information,
                                upload the required documents and submit
                                securely for review by the AHPK Secretariat.
                            </p>
                        </div>

                        <div className="rounded-[26px] border border-red-100 bg-white/90 p-6 shadow-lg shadow-red-100/40 backdrop-blur">
                            <div className="flex items-start gap-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                                    <ShieldCheck className="h-5 w-5" />
                                </span>

                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                                        Secure application
                                    </p>

                                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
                                        Your information and supporting
                                        documents are submitted securely
                                        for official membership review.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <HeroStat
                                    value="4"
                                    label="Simple steps"
                                />

                                <HeroStat
                                    value={`${progress}%`}
                                    label="Current progress"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* APPLICATION CONTENT */}
            <section className="bg-slate-50/80 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    {/* TOP PROGRESS NAVIGATION */}
                    <div className="mb-8 overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-5 border-b border-slate-200 px-5 py-5 sm:px-7 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Application progress
                                </p>

                                <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
                                    Step {step + 1} of {steps.length}:{" "}
                                    {steps[step]}
                                </h2>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-extrabold text-[#C8102E]">
                                    {progress}%
                                </span>

                                <span className="text-xs font-bold leading-5 text-slate-400">
                                    application
                                    <br />
                                    completed
                                </span>
                            </div>
                        </div>

                        <div className="px-5 py-5 sm:px-7">
                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-[#C8102E] transition-all duration-500"
                                    style={{
                                        width: `${progress}%`,
                                    }}
                                />
                            </div>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                {steps.map((item, index) => {
                                    const isCurrent =
                                        index === step;

                                    const isComplete =
                                        index < step;

                                    const canNavigate =
                                        index <= step;

                                    return (
                                        <button
                                            key={item}
                                            type="button"
                                            disabled={!canNavigate}
                                            onClick={() => {
                                                if (canNavigate) {
                                                    setError("");
                                                    setStep(index);
                                                }
                                            }}
                                            className={[
                                                "group flex min-h-[72px] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition",
                                                isCurrent
                                                    ? "border-[#C8102E] bg-red-50"
                                                    : isComplete
                                                        ? "border-emerald-200 bg-emerald-50/70"
                                                        : "border-slate-200 bg-slate-50",
                                                canNavigate
                                                    ? "cursor-pointer hover:border-red-200"
                                                    : "cursor-not-allowed opacity-65",
                                            ].join(" ")}
                                        >
                                            <span
                                                className={[
                                                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black",
                                                    isCurrent
                                                        ? "bg-[#C8102E] text-white"
                                                        : isComplete
                                                            ? "bg-emerald-600 text-white"
                                                            : "bg-white text-slate-400 shadow-sm",
                                                ].join(" ")}
                                            >
                                                {isComplete ? (
                                                    <Check className="h-4 w-4" />
                                                ) : (
                                                    index + 1
                                                )}
                                            </span>

                                            <span>
                                                <span
                                                    className={[
                                                        "block text-[10px] font-black uppercase tracking-[0.14em]",
                                                        isCurrent
                                                            ? "text-[#C8102E]"
                                                            : isComplete
                                                                ? "text-emerald-700"
                                                                : "text-slate-400",
                                                    ].join(" ")}
                                                >
                                                    {isComplete
                                                        ? "Completed"
                                                        : isCurrent
                                                            ? "Current step"
                                                            : "Upcoming"}
                                                </span>

                                                <span className="mt-1 block text-sm font-extrabold text-slate-800">
                                                    {item}
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
                        {/* FORM CARD */}
                        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                            <div className="p-6 sm:p-8 lg:p-10">
                                {error ? (
                                    <div
                                        role="alert"
                                        className="mb-7 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-semibold leading-6 text-red-700"
                                    >
                                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                ) : null}

                                {step === 0 ? (
                                    <StepCard
                                        icon={<UserRound />}
                                        eyebrow="Applicant details"
                                        title="Personal Information"
                                        subtitle="Provide your official name, contact details and identification information."
                                    >
                                        <div className="grid gap-5 md:grid-cols-2">
                                            <Input
                                                name="fullName"
                                                label="Full name"
                                                placeholder="Enter your full legal name"
                                                autoComplete="name"
                                                icon={<UserRound />}
                                                value={formData.fullName}
                                                onChange={(value) =>
                                                    updateField(
                                                        "fullName",
                                                        value,
                                                    )
                                                }
                                            />

                                            <Input
                                                name="email"
                                                label="Email address"
                                                type="email"
                                                placeholder="name@example.com"
                                                autoComplete="email"
                                                icon={<Mail />}
                                                value={formData.email}
                                                onChange={(value) =>
                                                    updateField(
                                                        "email",
                                                        value,
                                                    )
                                                }
                                            />

                                            <Input
                                                name="phone"
                                                label="Phone number"
                                                type="tel"
                                                placeholder="+254 700 000 000"
                                                autoComplete="tel"
                                                icon={<Phone />}
                                                value={formData.phone}
                                                onChange={(value) =>
                                                    updateField(
                                                        "phone",
                                                        value,
                                                    )
                                                }
                                            />

                                            <Input
                                                name="idNumber"
                                                label="ID or passport number"
                                                placeholder="Enter identification number"
                                                icon={<IdCard />}
                                                value={formData.idNumber}
                                                onChange={(value) =>
                                                    updateField(
                                                        "idNumber",
                                                        value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </StepCard>
                                ) : null}

                                {step === 1 ? (
                                    <StepCard
                                        icon={<GraduationCap />}
                                        eyebrow="Professional background"
                                        title="Membership Details"
                                        subtitle="Choose the appropriate membership category and provide your professional qualifications."
                                    >
                                        <div>
                                            <Label
                                                htmlFor="categoryId"
                                                text="Membership category"
                                            />

                                            <div className="relative mt-2">
                                                <select
                                                    id="categoryId"
                                                    name="categoryId"
                                                    value={
                                                        formData.categoryId
                                                    }
                                                    onChange={(event) =>
                                                        updateField(
                                                            "categoryId",
                                                            event.target
                                                                .value,
                                                        )
                                                    }
                                                    className="min-h-13 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 text-sm font-semibold text-slate-800 outline-none transition hover:border-slate-300 focus:border-[#C1121F] focus:bg-white focus:ring-4 focus:ring-red-100/70"
                                                >
                                                    <option value="">
                                                        Select membership
                                                        category
                                                    </option>

                                                    {categories.map(
                                                        (category) => (
                                                            <option
                                                                key={
                                                                    category.id
                                                                }
                                                                value={
                                                                    category.id
                                                                }
                                                            >
                                                                {
                                                                    category.name
                                                                }{" "}
                                                                — KES{" "}
                                                                {category.annualFee.toLocaleString()}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>

                                                <ChevronRight className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400" />
                                            </div>

                                            {selectedCategory ? (
                                                <div className="mt-4 rounded-2xl border border-red-100 bg-red-50/70 p-4">
                                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                        <div>
                                                            <p className="text-sm font-extrabold text-slate-900">
                                                                {
                                                                    selectedCategory.name
                                                                }
                                                            </p>

                                                            {selectedCategory.description ? (
                                                                <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-slate-600">
                                                                    {
                                                                        selectedCategory.description
                                                                    }
                                                                </p>
                                                            ) : null}
                                                        </div>

                                                        <span className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-black text-[#C8102E] shadow-sm">
                                                            {isFreeCategory
                                                                ? "No online fee"
                                                                : `KES ${selectedCategory.annualFee.toLocaleString()}`}
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>

                                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                                            <Input
                                                name="qualification"
                                                label="Highest qualification"
                                                placeholder="Example: Diploma in Hospitality"
                                                icon={<GraduationCap />}
                                                value={
                                                    formData.qualification
                                                }
                                                onChange={(value) =>
                                                    updateField(
                                                        "qualification",
                                                        value,
                                                    )
                                                }
                                            />

                                            <Input
                                                name="institution"
                                                label="Institution or employer"
                                                placeholder="Enter institution or employer"
                                                icon={
                                                    <BriefcaseBusiness />
                                                }
                                                value={
                                                    formData.institution
                                                }
                                                onChange={(value) =>
                                                    updateField(
                                                        "institution",
                                                        value,
                                                    )
                                                }
                                            />

                                            <Input
                                                name="position"
                                                label="Current position"
                                                placeholder="Enter current position"
                                                icon={
                                                    <BriefcaseBusiness />
                                                }
                                                value={formData.position}
                                                onChange={(value) =>
                                                    updateField(
                                                        "position",
                                                        value,
                                                    )
                                                }
                                            />

                                            <Input
                                                name="experience"
                                                label="Years of experience"
                                                type="number"
                                                min="0"
                                                placeholder="0"
                                                icon={<BadgeCheck />}
                                                value={
                                                    formData.experience
                                                }
                                                onChange={(value) =>
                                                    updateField(
                                                        "experience",
                                                        value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </StepCard>
                                ) : null}

                                {step === 2 ? (
                                    <StepCard
                                        icon={<UploadCloud />}
                                        eyebrow="Supporting documents"
                                        title="Upload Required Documents"
                                        subtitle="Upload clear copies of the required documents for verification by the Secretariat."
                                    >
                                        <div className="grid gap-4">
                                            <FileInput
                                                label="ID or passport copy"
                                                description="A clear copy of your national ID or passport."
                                                name="idDocument"
                                                icon={<IdCard />}
                                                file={files.idDocument}
                                                onChange={(file) =>
                                                    updateFile(
                                                        "idDocument",
                                                        file,
                                                    )
                                                }
                                            />

                                            <FileInput
                                                label="Certificate or qualification"
                                                description="Upload your relevant academic or professional certificate."
                                                name="qualificationDoc"
                                                icon={<GraduationCap />}
                                                file={
                                                    files.qualificationDoc
                                                }
                                                onChange={(file) =>
                                                    updateFile(
                                                        "qualificationDoc",
                                                        file,
                                                    )
                                                }
                                            />

                                            <FileInput
                                                label="CV or professional profile"
                                                description="Upload your current curriculum vitae or professional profile."
                                                name="cvDocument"
                                                icon={<FileText />}
                                                file={files.cvDocument}
                                                onChange={(file) =>
                                                    updateFile(
                                                        "cvDocument",
                                                        file,
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C8102E]" />

                                            <p className="text-sm font-medium leading-6 text-slate-600">
                                                Accepted formats are PDF,
                                                JPG and PNG. Ensure all
                                                documents are clear and
                                                readable before continuing.
                                            </p>
                                        </div>
                                    </StepCard>
                                ) : null}

                                {step === 3 ? (
                                    <StepCard
                                        icon={
                                            isFreeCategory ? (
                                                <FileCheck2 />
                                            ) : (
                                                <WalletCards />
                                            )
                                        }
                                        eyebrow="Final submission"
                                        title={
                                            isFreeCategory
                                                ? "Review and Complete Application"
                                                : "Review and Make Payment"
                                        }
                                        subtitle={
                                            isFreeCategory
                                                ? "Confirm your application information and submit it for review."
                                                : "Confirm your information and proceed to secure online payment."
                                        }
                                    >
                                        <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50">
                                            <div className="border-b border-slate-200 bg-white px-5 py-5">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                                                    Selected membership
                                                </p>

                                                <h3 className="mt-2 text-xl font-extrabold text-slate-950">
                                                    {selectedCategory?.name ||
                                                        "No category selected"}
                                                </h3>
                                            </div>

                                            <div className="p-5 sm:p-6">
                                                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#C8102E]">
                                                    Amount payable
                                                </p>

                                                <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                                                    <span className="mr-2 text-lg text-slate-400">
                                                        KES
                                                    </span>

                                                    {selectedCategory?.annualFee.toLocaleString() ||
                                                        "0"}
                                                </p>

                                                <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600">
                                                    {isFreeCategory
                                                        ? "This membership category does not require an online payment. Complete the application to submit it for Secretariat review."
                                                        : "Payment is processed securely through Paystack. Your application will be submitted after successful payment confirmation."}
                                                </p>

                                                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white p-4">
                                                    <LockKeyhole className="h-5 w-5 shrink-0 text-[#C8102E]" />

                                                    <p className="text-sm font-semibold text-slate-600">
                                                        Your payment details
                                                        are handled securely
                                                        by the payment
                                                        provider.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {isFreeCategory ? (
                                            <button
                                                type="button"
                                                disabled={paying}
                                                onClick={
                                                    handleFreeCompletion
                                                }
                                                className="mt-6 flex min-h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                <CheckCircle2 className="h-5 w-5" />

                                                {paying
                                                    ? "Completing application..."
                                                    : "Complete Application"}
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                disabled={paying}
                                                onClick={
                                                    handlePaystackPayment
                                                }
                                                className="mt-6 flex min-h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                <CreditCard className="h-5 w-5" />

                                                {paying
                                                    ? "Starting secure payment..."
                                                    : "Continue to Secure Payment"}
                                            </button>
                                        )}
                                    </StepCard>
                                ) : null}

                                {/* NAVIGATION */}
                                <div className="mt-9 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        disabled={
                                            step === 0 ||
                                            saving ||
                                            paying
                                        }
                                        className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-[#C8102E] disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Previous Step
                                    </button>

                                    {step <
                                        steps.length - 1 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={
                                                saving || paying
                                            }
                                            className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {saving
                                                ? "Saving application..."
                                                : "Save and Continue"}

                                            {!saving ? (
                                                <ArrowRight className="h-4 w-4" />
                                            ) : null}
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </section>

                        {/* STICKY SIDEBAR */}
                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <ApplicationSummary
                                formData={formData}
                                selectedCategory={
                                    selectedCategory
                                }
                            />

                            <ApplicationChecklist
                                formData={formData}
                                files={files}
                            />

                            <div className="rounded-[24px] border border-red-100 bg-red-50/70 p-6">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#C8102E] shadow-sm">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <h2 className="mt-5 text-lg font-extrabold text-slate-950">
                                    Need Assistance?
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                                    Contact the AHPK Secretariat
                                    for help selecting a membership
                                    category or completing your
                                    application.
                                </p>

                                <a
                                    href="/contact"
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
                                >
                                    Contact Secretariat
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    );
}


function HeroStat({
    value,
    label,
}: {
    value: string;
    label: string;
}) {
    return (
        <div className="rounded-2xl bg-slate-50 px-4 py-4">
            <p className="text-2xl font-extrabold text-slate-950">
                {value}
            </p>

            <p className="mt-1 text-xs font-bold text-slate-500">
                {label}
            </p>
        </div>
    );
}

function StepCard({
    icon,
    eyebrow,
    title,
    subtitle,
    children,
}: {
    icon: ReactNode;
    eyebrow: string;
    title: string;
    subtitle: string;
    children: ReactNode;
}) {
    return (
        <div>
            <div className="border-b border-slate-200 pb-6">
                <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E] [&>svg]:h-6 [&>svg]:w-6">
                        {icon}
                    </span>

                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                            {eyebrow}
                        </p>

                        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                            {title}
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-600">
                            {subtitle}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-7">
                {children}
            </div>
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
    placeholder,
    autoComplete,
    icon,
}: {
    name: string;
    label: string;
    type?: string;
    value: string;
    min?: string;
    placeholder?: string;
    autoComplete?: string;
    icon?: ReactNode;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <Label
                htmlFor={name}
                text={label}
            />

            <div className="relative mt-2">
                {icon ? (
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 [&>svg]:h-4 [&>svg]:w-4">
                        {icon}
                    </span>
                ) : null}

                <input
                    id={name}
                    name={name}
                    type={type}
                    min={min}
                    required
                    value={value}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    className={[
                        "min-h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pr-4 text-sm font-semibold text-slate-800 outline-none transition",
                        icon ? "pl-11" : "pl-4",
                        "placeholder:font-medium placeholder:text-slate-400",
                        "hover:border-slate-300",
                        "focus:border-[#C1121F] focus:bg-white focus:ring-4 focus:ring-red-100/70",
                    ].join(" ")}
                />
            </div>
        </div>
    );
}

function FileInput({
    name,
    label,
    description,
    icon,
    file,
    onChange,
}: {
    name: string;
    label: string;
    description: string;
    icon: ReactNode;
    file: File | null;
    onChange: (file: File | null) => void;
}) {
    return (
        <label
            htmlFor={name}
            className={[
                "group block cursor-pointer rounded-[22px] border border-dashed p-5 transition",
                file
                    ? "border-emerald-300 bg-emerald-50/60"
                    : "border-slate-300 bg-slate-50 hover:border-[#C8102E] hover:bg-red-50/40",
            ].join(" ")}
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span
                    className={[
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm [&>svg]:h-5 [&>svg]:w-5",
                        file
                            ? "bg-emerald-600 text-white"
                            : "bg-white text-[#C8102E]",
                    ].join(" ")}
                >
                    {file ? (
                        <CheckCircle2 />
                    ) : (
                        icon
                    )}
                </span>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-extrabold text-slate-900">
                            {label}
                        </p>

                        <span
                            className={[
                                "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em]",
                                file
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-amber-100 text-amber-700",
                            ].join(" ")}
                        >
                            {file
                                ? "Selected"
                                : "Required"}
                        </span>
                    </div>

                    <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                        {description}
                    </p>

                    {file ? (
                        <p className="mt-2 truncate text-xs font-bold text-emerald-700">
                            {file.name}
                        </p>
                    ) : (
                        <p className="mt-2 text-xs font-bold text-[#C8102E]">
                            Select PDF, JPG or PNG
                        </p>
                    )}
                </div>

                <span className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-extrabold text-slate-700 shadow-sm transition group-hover:border-red-200 group-hover:text-[#C8102E]">
                    <UploadCloud className="h-4 w-4" />

                    {file
                        ? "Replace file"
                        : "Choose file"}
                </span>
            </div>

            <input
                id={name}
                name={name}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(event) =>
                    onChange(
                        event.target.files?.[0] ||
                        null,
                    )
                }
                className="sr-only"
            />
        </label>
    );
}

function ApplicationSummary({
    formData,
    selectedCategory,
}: {
    formData: {
        fullName: string;
        email: string;
        phone: string;
        categoryId: string;
    };

    selectedCategory:
    | Category
    | undefined;
}) {
    return (
        <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                    Application summary
                </p>

                <h2 className="mt-2 text-xl font-extrabold text-slate-950">
                    Your Information
                </h2>
            </div>

            <div className="space-y-4 p-6">
                <SummaryItem
                    label="Applicant"
                    value={
                        formData.fullName ||
                        "Not provided"
                    }
                />

                <SummaryItem
                    label="Email"
                    value={
                        formData.email ||
                        "Not provided"
                    }
                />

                <SummaryItem
                    label="Phone"
                    value={
                        formData.phone ||
                        "Not provided"
                    }
                />

                <SummaryItem
                    label="Membership category"
                    value={
                        selectedCategory?.name ||
                        "Not selected"
                    }
                />

                <SummaryItem
                    label="Annual fee"
                    value={
                        selectedCategory
                            ? `KES ${selectedCategory.annualFee.toLocaleString()}`
                            : "KES 0"
                    }
                    highlight
                />
            </div>
        </div>
    );
}

function ApplicationChecklist({
    formData,
    files,
}: {
    formData: {
        fullName: string;
        email: string;
        phone: string;
        idNumber: string;
        categoryId: string;
        qualification: string;
        institution: string;
    };

    files: {
        idDocument: File | null;
        qualificationDoc: File | null;
        cvDocument: File | null;
    };
}) {
    return (
        <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                    <FileCheck2 className="h-5 w-5" />
                </span>

                <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                        Review checklist
                    </p>

                    <h2 className="mt-1 text-lg font-extrabold text-slate-950">
                        Application Readiness
                    </h2>
                </div>
            </div>

            <div className="mt-6 space-y-4">
                <ChecklistItem
                    text="Personal information"
                    checked={Boolean(
                        formData.fullName &&
                        formData.email &&
                        formData.phone &&
                        formData.idNumber,
                    )}
                />

                <ChecklistItem
                    text="Membership category"
                    checked={Boolean(
                        formData.categoryId,
                    )}
                />

                <ChecklistItem
                    text="Professional information"
                    checked={Boolean(
                        formData.qualification &&
                        formData.institution,
                    )}
                />

                <ChecklistItem
                    text="Required documents"
                    checked={Boolean(
                        files.idDocument &&
                        files.qualificationDoc &&
                        files.cvDocument,
                    )}
                />
            </div>
        </div>
    );
}

function SummaryItem({
    label,
    value,
    highlight = false,
}: {
    label: string;
    value: string;
    highlight?: boolean;
}) {
    return (
        <div
            className={[
                "rounded-2xl border px-4 py-3.5",
                highlight
                    ? "border-red-100 bg-red-50"
                    : "border-slate-100 bg-slate-50",
            ].join(" ")}
        >
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                {label}
            </p>

            <p
                className={[
                    "mt-1 break-words text-sm font-extrabold leading-6",
                    highlight
                        ? "text-[#C8102E]"
                        : "text-slate-900",
                ].join(" ")}
            >
                {value}
            </p>
        </div>
    );
}

function ChecklistItem({
    text,
    checked,
}: {
    text: string;
    checked: boolean;
}) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3.5">
            <div className="flex items-center gap-3">
                <span
                    className={[
                        "flex h-8 w-8 items-center justify-center rounded-full",
                        checked
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-white text-slate-300 shadow-sm",
                    ].join(" ")}
                >
                    {checked ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        <Circle className="h-4 w-4" />
                    )}
                </span>

                <span className="text-sm font-bold text-slate-700">
                    {text}
                </span>
            </div>

            <span
                className={[
                    "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em]",
                    checked
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-200 text-slate-500",
                ].join(" ")}
            >
                {checked
                    ? "Complete"
                    : "Pending"}
            </span>
        </div>
    );
}

function Label({
    htmlFor,
    text,
}: {
    htmlFor: string;
    text: string;
}) {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-sm font-extrabold text-slate-800"
        >
            {text}
        </label>
    );
}