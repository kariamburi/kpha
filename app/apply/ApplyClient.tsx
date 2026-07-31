"use client";

import {
    type ReactNode,
    useMemo,
    useState,
} from "react";

import {
    completeFreeApplication,
    saveApplicationDraft,
} from "./actions";

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

const steps = [
    "Personal Info",
    "Membership",
    "Documents",
    "Payment",
];

export default function ApplyClient({
    categories,
}: {
    categories: Category[];
}) {
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
        () =>
            categories.find(
                (category) =>
                    category.id === formData.categoryId,
            ),
        [categories, formData.categoryId],
    );

    const isFreeCategory =
        !!selectedCategory &&
        selectedCategory.annualFee <= 0;

    const progress = Math.round(
        ((step + 1) / steps.length) * 100,
    );

    function updateField(
        name: string,
        value: string,
    ) {
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function updateFile(
        name: keyof typeof files,
        file: File | null,
    ) {
        setFiles((previous) => ({
            ...previous,
            [name]: file,
        }));
    }

    async function saveDraft(
        extra?: Partial<typeof formData>,
    ) {
        const merged = {
            ...formData,
            ...extra,
        };

        const result =
            await saveApplicationDraft({
                applicationId:
                    merged.applicationId,

                data: {
                    fullName: merged.fullName,
                    email: merged.email,
                    phone: merged.phone,
                    idNumber: merged.idNumber,
                    categoryId:
                        merged.categoryId,
                    qualification:
                        merged.qualification,
                    institution:
                        merged.institution,
                    position: merged.position,
                    experience:
                        merged.experience,
                    idDocumentUrl:
                        merged.idDocumentUrl,
                    qualificationDocUrl:
                        merged.qualificationDocUrl,
                    cvDocumentUrl:
                        merged.cvDocumentUrl,
                },
            });

        if (
            !result.ok ||
            !result.applicationId
        ) {
            throw new Error(
                "Failed to save application",
            );
        }

        setFormData((previous) => ({
            ...previous,
            ...extra,
            applicationId:
                result.applicationId!,
        }));

        return result.applicationId;
    }

    async function uploadDocuments(
        applicationId: string,
    ) {
        if (
            !files.idDocument ||
            !files.qualificationDoc ||
            !files.cvDocument
        ) {
            throw new Error(
                "Please upload ID copy, certificate and CV.",
            );
        }

        const body = new FormData();

        body.append(
            "applicationId",
            applicationId,
        );

        body.append(
            "idDocument",
            files.idDocument,
        );

        body.append(
            "qualificationDoc",
            files.qualificationDoc,
        );

        body.append(
            "cvDocument",
            files.cvDocument,
        );

        const response = await fetch(
            "/api/applications/upload-documents",
            {
                method: "POST",
                body,
            },
        );

        const data = await response.json();

        if (!response.ok || !data.ok) {
            throw new Error(
                data.error ||
                "Failed to upload documents.",
            );
        }

        const uploaded = {
            idDocumentUrl:
                data.idDocumentUrl,
            qualificationDocUrl:
                data.qualificationDocUrl,
            cvDocumentUrl:
                data.cvDocumentUrl,
        };

        setFormData((previous) => ({
            ...previous,
            ...uploaded,
        }));

        return uploaded;
    }

    async function nextStep() {
        setError("");

        if (
            step === 0 &&
            (!formData.fullName ||
                !formData.email ||
                !formData.phone ||
                !formData.idNumber)
        ) {
            setError(
                "Please complete all personal information fields.",
            );

            return;
        }

        if (
            step === 1 &&
            (!formData.categoryId ||
                !formData.qualification ||
                !formData.institution)
        ) {
            setError(
                "Please select membership category and complete qualification details.",
            );

            return;
        }

        if (
            step === 2 &&
            (!files.idDocument ||
                !files.qualificationDoc ||
                !files.cvDocument)
        ) {
            setError(
                "Please upload ID copy, certificate and CV.",
            );

            return;
        }

        setSaving(true);

        try {
            const applicationId =
                await saveDraft();

            if (step === 2) {
                const uploaded =
                    await uploadDocuments(
                        applicationId,
                    );

                await saveDraft(uploaded);
            }

            setStep((current) =>
                Math.min(
                    current + 1,
                    steps.length - 1,
                ),
            );
        } catch (caughtError) {
            setError(
                caughtError instanceof Error
                    ? caughtError.message
                    : "Failed to save application. Try again.",
            );
        } finally {
            setSaving(false);
        }
    }

    async function handlePaystackPayment() {
        setError("");

        if (!selectedCategory) {
            setError(
                "Please select a membership category first.",
            );

            return;
        }

        setPaying(true);

        try {
            const applicationId =
                await saveDraft();

            const response = await fetch(
                "/api/paystack/initialize",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        applicationId,
                    }),
                },
            );

            const data =
                await response.json();

            if (
                !response.ok ||
                !data.ok
            ) {
                setError(
                    data.error ||
                    "Failed to start payment.",
                );

                return;
            }

            window.location.href =
                data.authorizationUrl;
        } catch {
            setError(
                "Failed to start payment. Try again.",
            );
        } finally {
            setPaying(false);
        }
    }

    async function handleFreeCompletion() {
        setError("");

        if (!selectedCategory) {
            setError(
                "Please select a membership category first.",
            );

            return;
        }

        setPaying(true);

        try {
            const applicationId =
                await saveDraft();

            const result =
                await completeFreeApplication(
                    applicationId,
                );

            if (!result.ok) {
                setError(
                    result.error ||
                    "Failed to complete application.",
                );

                return;
            }

            window.location.href =
                `/apply/success?applicationId=${applicationId}`;
        } catch {
            setError(
                "Failed to complete application. Try again.",
            );
        } finally {
            setPaying(false);
        }
    }

    function previousStep() {
        setError("");

        setStep((current) =>
            Math.max(current - 1, 0),
        );
    }

    return (
        <main className="min-h-screen bg-white text-slate-950">
            {/* EDITORIAL MASTHEAD */}
            <section className="border-b border-slate-300 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
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
                            href="/members-section/constitution-rules/membership"
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

                    <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
                        <div className="max-w-4xl">
                            <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                AHPK Membership
                            </p>

                            <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                                Begin Your Professional
                                Membership Journey
                            </h1>

                            <p className="mt-4 max-w-3xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                                Complete your information,
                                select the correct membership
                                category, upload the required
                                documents and submit securely
                                for official review.
                            </p>
                        </div>

                        <div className="border-t-4 border-[#C8102E] bg-slate-50 p-5">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-[#C8102E]" />

                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                                        Secure Application
                                    </p>

                                    <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                        Your information and
                                        supporting documents are
                                        submitted for official
                                        membership review.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 border-y border-slate-300">
                                <HeroStat
                                    value="4"
                                    label="Steps"
                                />

                                <HeroStat
                                    value={`${progress}%`}
                                    label="Progress"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* APPLICATION */}
            <section className="bg-white py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <ApplicationProgress
                        step={step}
                        progress={progress}
                        onNavigate={(index) => {
                            setError("");
                            setStep(index);
                        }}
                    />

                    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
                        <section className="min-w-0 border-t-4 border-[#C8102E] pt-4">
                            {error ? (
                                <div
                                    role="alert"
                                    className="mb-5 flex items-start gap-3 border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700"
                                >
                                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                                    <span>{error}</span>
                                </div>
                            ) : null}

                            {step === 0 ? (
                                <StepCard
                                    icon={<UserRound />}
                                    eyebrow="Applicant Details"
                                    title="Personal Information"
                                    subtitle="Provide your official name, contact details and identification information."
                                >
                                    <div className="grid gap-4 md:grid-cols-2">
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
                                    eyebrow="Professional Background"
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
                                                required
                                                value={formData.categoryId}
                                                onChange={(event) =>
                                                    updateField(
                                                        "categoryId",
                                                        event.target.value,
                                                    )
                                                }
                                                className="min-h-12 w-full appearance-none border border-slate-300 bg-white px-4 py-3 pr-12 text-sm font-semibold text-slate-800 outline-none transition hover:border-slate-400 focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                                            >
                                                <option value="">
                                                    Select membership category
                                                </option>

                                                {categories.map(
                                                    (category) => (
                                                        <option
                                                            key={category.id}
                                                            value={category.id}
                                                        >
                                                            {category.name} — KES{" "}
                                                            {category.annualFee.toLocaleString()}
                                                        </option>
                                                    ),
                                                )}
                                            </select>

                                            <ChevronRight className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400" />
                                        </div>

                                        {selectedCategory ? (
                                            <div className="mt-4 border-l-4 border-[#C8102E] bg-slate-50 px-4 py-3">
                                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                    <div>
                                                        <p className="text-sm font-black text-slate-950">
                                                            {selectedCategory.name}
                                                        </p>

                                                        {selectedCategory.description ? (
                                                            <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-slate-600">
                                                                {selectedCategory.description}
                                                            </p>
                                                        ) : null}
                                                    </div>

                                                    <span className="shrink-0 border border-red-200 bg-white px-3 py-1.5 text-xs font-black text-[#C8102E]">
                                                        {isFreeCategory
                                                            ? "No online fee"
                                                            : `KES ${selectedCategory.annualFee.toLocaleString()}`}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>

                                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                                        <Input
                                            name="qualification"
                                            label="Highest qualification"
                                            placeholder="Example: Diploma in Hospitality"
                                            icon={<GraduationCap />}
                                            value={formData.qualification}
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
                                            icon={<BriefcaseBusiness />}
                                            value={formData.institution}
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
                                            icon={<BriefcaseBusiness />}
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
                                            value={formData.experience}
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
                                    eyebrow="Supporting Documents"
                                    title="Upload Required Documents"
                                    subtitle="Upload clear copies of the required documents for verification by the Secretariat."
                                >
                                    <div className="divide-y divide-slate-300 border-y border-slate-300">
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
                                            file={files.qualificationDoc}
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

                                    <div className="mt-4 flex items-start gap-3 border-l-4 border-slate-950 bg-slate-50 px-4 py-3">
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
                                    eyebrow="Final Submission"
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
                                    <div className="border-y border-slate-300">
                                        <div className="border-b border-slate-300 py-4">
                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                                                Selected membership
                                            </p>

                                            <h3 className="mt-1.5 text-xl font-black text-slate-950">
                                                {selectedCategory?.name ||
                                                    "No category selected"}
                                            </h3>
                                        </div>

                                        <div className="py-5">
                                            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#C8102E]">
                                                Amount payable
                                            </p>

                                            <p className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                                                <span className="mr-2 text-lg text-slate-400">
                                                    KES
                                                </span>

                                                {selectedCategory?.annualFee.toLocaleString() ||
                                                    "0"}
                                            </p>

                                            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600">
                                                {isFreeCategory
                                                    ? "This category does not require online payment. Complete the application to submit it for Secretariat review."
                                                    : "Payment is processed securely through Paystack. Your application will be submitted after successful payment confirmation."}
                                            </p>

                                            <div className="mt-4 flex items-center gap-3 border-l-4 border-[#C8102E] bg-slate-50 px-4 py-3">
                                                <LockKeyhole className="h-5 w-5 shrink-0 text-[#C8102E]" />

                                                <p className="text-sm font-semibold text-slate-600">
                                                    Payment details are
                                                    handled securely by
                                                    the payment provider.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {isFreeCategory ? (
                                        <PrimaryButton
                                            loading={paying}
                                            onClick={handleFreeCompletion}
                                            icon={<CheckCircle2 />}
                                            idleLabel="Complete Application"
                                            loadingLabel="Completing application..."
                                        />
                                    ) : (
                                        <PrimaryButton
                                            loading={paying}
                                            onClick={handlePaystackPayment}
                                            icon={<CreditCard />}
                                            idleLabel="Continue to Secure Payment"
                                            loadingLabel="Starting secure payment..."
                                        />
                                    )}
                                </StepCard>
                            ) : null}

                            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-300 pt-5 sm:flex-row sm:items-center sm:justify-between">
                                <button
                                    type="button"
                                    onClick={previousStep}
                                    disabled={
                                        step === 0 ||
                                        saving ||
                                        paying
                                    }
                                    className="group inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 border border-slate-300 bg-white px-5 text-sm font-black text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-[#C8102E] hover:text-[#C8102E] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />

                                    Previous Step
                                </button>

                                {step < steps.length - 1 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={
                                            saving ||
                                            paying
                                        }
                                        className="group inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition duration-200 hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {saving
                                            ? "Saving application..."
                                            : "Save and Continue"}

                                        {!saving ? (
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        ) : null}
                                    </button>
                                ) : null}
                            </div>
                        </section>

                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <ApplicationSummary
                                formData={formData}
                                selectedCategory={selectedCategory}
                            />

                            <ApplicationChecklist
                                formData={formData}
                                files={files}
                            />

                            <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                                <ShieldCheck className="h-6 w-6 text-red-300" />

                                <h2 className="mt-2 text-xl font-black">
                                    Need Assistance?
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                    Contact the AHPK Secretariat
                                    for help selecting a category
                                    or completing your application.
                                </p>

                                <a
                                    href="/contact"
                                    className="group mt-4 inline-flex items-center gap-2 text-sm font-black text-red-300 transition hover:text-white"
                                >
                                    Contact Secretariat

                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </a>
                            </section>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    );
}

function ApplicationProgress({
    step,
    progress,
    onNavigate,
}: {
    step: number;
    progress: number;
    onNavigate: (index: number) => void;
}) {
    return (
        <section className="border-t-4 border-slate-950">
            <div className="flex flex-col gap-3 border-b border-slate-300 py-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                        Application Progress
                    </p>

                    <h2 className="mt-1.5 text-2xl font-black text-slate-950">
                        Step {step + 1} of {steps.length}:{" "}
                        {steps[step]}
                    </h2>
                </div>

                <p className="text-3xl font-black text-[#C8102E]">
                    {progress}%
                </p>
            </div>

            <div className="h-1 bg-slate-200">
                <div
                    className="h-full bg-[#C8102E] transition-all duration-500"
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>

            <div className="grid border-b border-slate-300 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((item, index) => {
                    const current =
                        index === step;

                    const complete =
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
                                    onNavigate(index);
                                }
                            }}
                            className={[
                                "group flex min-h-20 items-center gap-3 border-b border-slate-300 px-3 py-3 text-left transition duration-200 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0",
                                current
                                    ? "bg-red-50"
                                    : "bg-white",
                                canNavigate
                                    ? "cursor-pointer hover:bg-red-50/70"
                                    : "cursor-not-allowed opacity-55",
                            ].join(" ")}
                        >
                            <span
                                className={[
                                    "flex h-9 w-9 shrink-0 items-center justify-center text-sm font-black transition duration-200",
                                    current
                                        ? "bg-[#C8102E] text-white"
                                        : complete
                                            ? "bg-slate-950 text-white"
                                            : "border border-slate-300 bg-white text-slate-400",
                                ].join(" ")}
                            >
                                {complete ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    index + 1
                                )}
                            </span>

                            <span>
                                <span
                                    className={[
                                        "block text-[10px] font-black uppercase tracking-[0.14em]",
                                        current
                                            ? "text-[#C8102E]"
                                            : complete
                                                ? "text-slate-950"
                                                : "text-slate-400",
                                    ].join(" ")}
                                >
                                    {complete
                                        ? "Completed"
                                        : current
                                            ? "Current Step"
                                            : "Upcoming"}
                                </span>

                                <span className="mt-1 block text-sm font-black text-slate-800 transition group-hover:text-[#C8102E]">
                                    {item}
                                </span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
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
        <div className="border-r border-slate-300 py-3 last:border-r-0">
            <p className="text-2xl font-black text-slate-950">
                {value}
            </p>

            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
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
            <div className="flex items-start gap-3 border-b border-slate-300 pb-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white [&>svg]:h-5 [&>svg]:w-5">
                    {icon}
                </span>

                <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                        {eyebrow}
                    </p>

                    <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                        {title}
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                        {subtitle}
                    </p>
                </div>
            </div>

            <div className="mt-5">
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
                        onChange(
                            event.target.value,
                        )
                    }
                    className={[
                        "min-h-12 w-full border border-slate-300 bg-white py-3 pr-4 text-sm font-semibold text-slate-800 outline-none transition",
                        icon
                            ? "pl-11"
                            : "pl-4",
                        "placeholder:font-medium placeholder:text-slate-400",
                        "hover:border-slate-400",
                        "focus:border-[#C1121F] focus:ring-2 focus:ring-red-100",
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
                "group block cursor-pointer py-5 transition",
                file
                    ? "bg-emerald-50/50"
                    : "hover:bg-red-50/50",
            ].join(" ")}
        >
            <div className="grid gap-4 sm:grid-cols-[46px_minmax(0,1fr)_auto] sm:items-center">
                <span
                    className={[
                        "flex h-10 w-10 items-center justify-center [&>svg]:h-5 [&>svg]:w-5",
                        file
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-950 text-white transition group-hover:bg-[#C8102E]",
                    ].join(" ")}
                >
                    {file ? (
                        <CheckCircle2 />
                    ) : (
                        icon
                    )}
                </span>

                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-black text-slate-950">
                            {label}
                        </p>

                        <span
                            className={[
                                "px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.1em]",
                                file
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-amber-100 text-amber-800",
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
                        <p className="mt-1 truncate text-xs font-bold text-emerald-700">
                            {file.name}
                        </p>
                    ) : (
                        <p className="mt-1 text-xs font-bold text-[#C8102E]">
                            PDF, JPG or PNG
                        </p>
                    )}
                </div>

                <span className="inline-flex min-h-10 items-center justify-center gap-2 border border-slate-300 bg-white px-4 text-xs font-black text-slate-700 transition group-hover:border-[#C8102E] group-hover:text-[#C8102E]">
                    <UploadCloud className="h-4 w-4" />

                    {file
                        ? "Replace"
                        : "Choose File"}
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

function PrimaryButton({
    loading,
    onClick,
    icon,
    idleLabel,
    loadingLabel,
}: {
    loading: boolean;
    onClick: () => void;
    icon: ReactNode;
    idleLabel: string;
    loadingLabel: string;
}) {
    return (
        <button
            type="button"
            disabled={loading}
            onClick={onClick}
            className="group mt-5 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition duration-200 hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
            <span className="[&>svg]:h-5 [&>svg]:w-5">
                {icon}
            </span>

            {loading
                ? loadingLabel
                : idleLabel}
        </button>
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
        <section className="border-t-4 border-[#C8102E]">
            <div className="border-b border-slate-300 py-3">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                    Application Summary
                </p>

                <h2 className="mt-1.5 text-xl font-black text-slate-950">
                    Your Information
                </h2>
            </div>

            <div className="divide-y divide-slate-300 border-b border-slate-300">
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
        </section>
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
        <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
            <FileCheck2 className="h-6 w-6 text-[#C8102E]" />

            <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                Review Checklist
            </p>

            <h2 className="mt-1.5 text-xl font-black text-slate-950">
                Application Readiness
            </h2>

            <div className="mt-4 divide-y divide-slate-300 border-y border-slate-300">
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
        </section>
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
        <div className="py-3">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                {label}
            </p>

            <p
                className={[
                    "mt-1 break-words text-sm font-black leading-6",
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
        <div className="flex items-center justify-between gap-3 py-3">
            <div className="flex items-center gap-3">
                <span
                    className={[
                        "flex h-8 w-8 items-center justify-center",
                        checked
                            ? "bg-emerald-600 text-white"
                            : "border border-slate-300 bg-white text-slate-300",
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
                    "text-[10px] font-black uppercase tracking-[0.1em]",
                    checked
                        ? "text-emerald-700"
                        : "text-slate-400",
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
            className="block text-sm font-black text-slate-800"
        >
            {text}
        </label>
    );
}