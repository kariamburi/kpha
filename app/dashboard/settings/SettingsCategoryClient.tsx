"use client";

import { useState } from "react";

type Category = {
    id: string;
    name: string;
    description: string | null;
    annualFee: number;
    active: boolean;
};

type CertificateSettings = {
    id: string;
    chairpersonName: string | null;
    chairpersonSignature: string | null;
    secretaryName: string | null;
    secretarySignature: string | null;
};

type SystemSettings = {
    id: string;
    adminOtpEnabled: boolean;
};

type ModalMode = "add" | "edit" | "toggle" | "delete" | null;

function money(value: number) {
    return `KES ${Number(value || 0).toLocaleString("en-KE")}`;
}

export default function SettingsCategoryClient({
    categories,
    certificateSettings,
    systemSettings,
    addCategory,
    updateCategory,
    toggleCategory,
    deleteCategory,
    saveCertificateSettings,
    saveSystemSettings,
}: {
    categories: Category[];
    certificateSettings: CertificateSettings;
    systemSettings: SystemSettings;
    addCategory: (formData: FormData) => void;
    updateCategory: (formData: FormData) => void;
    toggleCategory: (formData: FormData) => void;
    deleteCategory: (formData: FormData) => void;
    saveCertificateSettings: (formData: FormData) => void;
    saveSystemSettings: (formData: FormData) => void;
}) {
    const [mode, setMode] = useState<ModalMode>(null);
    const [selected, setSelected] = useState<Category | null>(null);

    const activeCategories = categories.filter((c) => c.active).length;
    const disabledCategories = categories.filter((c) => !c.active).length;
    const totalAnnualFee = categories.reduce((sum, c) => sum + c.annualFee, 0);

    function openModal(nextMode: ModalMode, category?: Category) {
        setMode(nextMode);
        setSelected(category || null);
    }

    function closeModal() {
        setMode(null);
        setSelected(null);
    }

    return (
        <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <p className="text-sm font-black text-slate-500">
                    AHPK Configuration
                </p>

                <div className="mt-1 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-black text-slate-950">
                            Settings
                        </h1>

                        <p className="mt-2 text-sm font-semibold text-slate-500">
                            Manage membership categories, security, certificate signatures, and availability.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => openModal("add")}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-red-800"
                    >
                        <PlusIcon />
                        Add Category
                    </button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <StatCard title="Total Categories" value={categories.length.toString()} />
                <StatCard title="Active" value={activeCategories.toString()} />
                <StatCard title="Disabled" value={disabledCategories.toString()} />
                <StatCard title="Total Fee Value" value={money(totalAnnualFee)} />
            </div>

            <SystemSettingsCard
                settings={systemSettings}
                action={saveSystemSettings}
            />

            <CertificateSettingsCard
                settings={certificateSettings}
                action={saveCertificateSettings}
            />

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-black text-slate-950">
                            Membership Categories
                        </h2>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            Total {categories.length} categor{categories.length === 1 ? "y" : "ies"}
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <Th>Category</Th>
                                <Th>Description</Th>
                                <Th>Annual Fee</Th>
                                <Th>Status</Th>
                                <th className="px-2 py-2 text-left font-bold">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                                        No membership categories found.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category) => (
                                    <tr key={category.id} className="border-b hover:bg-slate-50">
                                        <td className="whitespace-nowrap px-2 py-2">
                                            <p className="font-semibold text-slate-900">
                                                {category.name}
                                            </p>
                                        </td>

                                        <td className="px-2 py-2 text-slate-600">
                                            <p className="max-w-xl line-clamp-2">
                                                {category.description || "-"}
                                            </p>
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 font-semibold text-[#C1121F]">
                                            {money(category.annualFee)}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <StatusBadge active={category.active} />
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => openModal("edit", category)}
                                                    className="cursor-pointer rounded bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-700 transition hover:bg-slate-200"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => openModal("toggle", category)}
                                                    className="cursor-pointer rounded bg-amber-50 px-3 py-1.5 text-[12px] font-bold text-amber-700 transition hover:bg-amber-100"
                                                >
                                                    {category.active ? "Disable" : "Enable"}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => openModal("delete", category)}
                                                    className="cursor-pointer rounded bg-red-50 px-3 py-1.5 text-[12px] font-bold text-red-700 transition hover:bg-red-100"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {mode && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
                    <button
                        type="button"
                        className="absolute inset-0 cursor-pointer bg-black/50 backdrop-blur-sm"
                        onClick={closeModal}
                    />

                    <div className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-[0_25px_80px_rgba(0,0,0,.28)]">
                        <div className="bg-[#111111] px-6 py-5 text-white">
                            <p className="text-xs font-black tracking-[0.25em] text-[#F3C64E]">
                                AHPK SETTINGS
                            </p>

                            <h3 className="mt-1 text-2xl font-black">
                                {mode === "add"
                                    ? "Add Membership Category"
                                    : mode === "edit"
                                        ? "Edit Membership Category"
                                        : mode === "toggle"
                                            ? selected?.active
                                                ? "Disable Category"
                                                : "Enable Category"
                                            : "Delete Category"}
                            </h3>
                        </div>

                        <div className="p-6">
                            {mode === "add" && (
                                <CategoryForm action={addCategory} onClose={closeModal} />
                            )}

                            {mode === "edit" && selected && (
                                <CategoryForm
                                    action={updateCategory}
                                    category={selected}
                                    onClose={closeModal}
                                />
                            )}

                            {mode === "toggle" && selected && (
                                <ConfirmForm
                                    message={`Are you sure you want to ${selected.active ? "disable" : "enable"
                                        } "${selected.name}"?`}
                                    action={toggleCategory}
                                    category={selected}
                                    onClose={closeModal}
                                />
                            )}

                            {mode === "delete" && selected && (
                                <ConfirmForm
                                    message={`Delete "${selected.name}"? If it already has members or applications, it will be disabled instead.`}
                                    action={deleteCategory}
                                    category={selected}
                                    danger
                                    onClose={closeModal}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function SystemSettingsCard({
    settings,
    action,
}: {
    settings: SystemSettings;
    action: (formData: FormData) => void;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 border-b border-slate-200 pb-4">
                <h2 className="text-xl font-black text-slate-950">
                    Admin Login Security
                </h2>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                    Enable email OTP verification after correct admin login credentials.
                </p>
            </div>

            <form
                action={action}
                className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            >
                <div>
                    <p className="text-sm font-black text-slate-900">
                        Email OTP Login
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                        When enabled, dashboard users must verify a 6-digit OTP sent to their email.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <input
                            type="checkbox"
                            name="adminOtpEnabled"
                            defaultChecked={settings.adminOtpEnabled}
                            className="h-5 w-5 cursor-pointer accent-[#C1121F]"
                        />

                        <span className="text-sm font-black text-slate-700">
                            {settings.adminOtpEnabled ? "Enabled" : "Enable OTP"}
                        </span>
                    </label>

                    <button className="cursor-pointer rounded-xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white transition hover:bg-red-800">
                        Save Security
                    </button>
                </div>
            </form>
        </div>
    );
}

function CertificateSettingsCard({
    settings,
    action,
}: {
    settings: CertificateSettings;
    action: (formData: FormData) => void;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 border-b border-slate-200 pb-4">
                <h2 className="text-xl font-black text-slate-950">
                    Certificate Signatures
                </h2>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                    Upload Chairperson and Secretary signatures used on generated certificates.
                </p>
            </div>

            <form action={action} className="grid gap-5 md:grid-cols-2">
                <SignatureUpload
                    label="Chairperson"
                    nameField="chairpersonName"
                    fileField="chairpersonSignature"
                    currentName={settings.chairpersonName}
                    currentSignature={settings.chairpersonSignature}
                />

                <SignatureUpload
                    label="Secretary"
                    nameField="secretaryName"
                    fileField="secretarySignature"
                    currentName={settings.secretaryName}
                    currentSignature={settings.secretarySignature}
                />

                <div className="flex justify-end border-t border-slate-200 pt-5 md:col-span-2">
                    <button className="cursor-pointer rounded-xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white transition hover:bg-red-800">
                        Save Certificate Settings
                    </button>
                </div>
            </form>
        </div>
    );
}

function SignatureUpload({
    label,
    nameField,
    fileField,
    currentName,
    currentSignature,
}: {
    label: string;
    nameField: string;
    fileField: string;
    currentName?: string | null;
    currentSignature?: string | null;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <Label text={`${label} Name`} />

            <Input
                name={nameField}
                defaultValue={currentName || ""}
                placeholder={`Enter ${label.toLowerCase()} name`}
            />

            <div className="mt-4">
                <Label text={`${label} Signature`} />

                {currentSignature ? (
                    <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
                        <img
                            src={currentSignature}
                            alt={`${label} signature`}
                            className="h-16 max-w-full object-contain"
                        />
                    </div>
                ) : (
                    <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm font-semibold text-slate-500">
                        No signature uploaded.
                    </div>
                )}

                <input
                    type="file"
                    name={fileField}
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold"
                />

                <p className="mt-2 text-xs font-semibold text-slate-500">
                    Recommended: transparent PNG, maximum 1MB.
                </p>
            </div>
        </div>
    );
}

function CategoryForm({
    action,
    category,
    onClose,
}: {
    action: (formData: FormData) => void;
    category?: Category;
    onClose: () => void;
}) {
    return (
        <form
            action={async (formData) => {
                await action(formData);
                onClose();
            }}
            className="space-y-4"
        >
            {category && <input type="hidden" name="id" value={category.id} />}

            <div>
                <Label text="Category Name" />
                <Input name="name" required defaultValue={category?.name || ""} />
            </div>

            <div>
                <Label text="Annual Fee" />
                <Input
                    name="annualFee"
                    required
                    type="number"
                    defaultValue={category?.annualFee || ""}
                />
            </div>

            <div>
                <Label text="Description" />
                <textarea
                    name="description"
                    defaultValue={category?.description || ""}
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    placeholder="Describe this membership category"
                />
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                    type="button"
                    onClick={onClose}
                    className="cursor-pointer rounded-xl border border-slate-300 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                >
                    Cancel
                </button>

                <button className="cursor-pointer rounded-xl bg-[#C1121F] px-4 py-2 text-sm font-black text-white transition hover:bg-red-800">
                    Save Category
                </button>
            </div>
        </form>
    );
}

function ConfirmForm({
    message,
    action,
    category,
    danger,
    onClose,
}: {
    message: string;
    action: (formData: FormData) => void;
    category: Category;
    danger?: boolean;
    onClose: () => void;
}) {
    return (
        <form
            action={async (formData) => {
                await action(formData);
                onClose();
            }}
        >
            <input type="hidden" name="id" value={category.id} />
            <input type="hidden" name="active" value={String(category.active)} />

            <div
                className={`rounded-2xl border p-4 ${danger
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-amber-200 bg-amber-50 text-amber-800"
                    }`}
            >
                <p className="text-sm font-bold">{message}</p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="cursor-pointer rounded-xl border border-slate-300 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                >
                    Cancel
                </button>

                <button
                    className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-black text-white transition ${danger
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-[#C1121F] hover:bg-red-800"
                        }`}
                >
                    Confirm
                </button>
            </div>
        </form>
    );
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-2xl bg-[#111111] p-5 text-white shadow-sm">
            <p className="text-sm font-semibold text-white/65">{title}</p>
            <h2 className="mt-2 text-2xl font-black">{value}</h2>
        </div>
    );
}

function StatusBadge({ active }: { active: boolean }) {
    return (
        <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold ${active ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"
                }`}
        >
            {active ? "ACTIVE" : "DISABLED"}
        </span>
    );
}

function Th({ children }: { children: React.ReactNode }) {
    return (
        <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
            {children}
        </th>
    );
}

function Label({ text }: { text: string }) {
    return (
        <label className="block text-sm font-black text-slate-700">
            {text}
        </label>
    );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
        />
    );
}

function PlusIcon() {
    return (
        <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
        </svg>
    );
}