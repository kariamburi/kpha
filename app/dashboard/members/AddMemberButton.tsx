"use client";

import { useState } from "react";
import Modal from "../components/Modal";

type Category = {
    id: string;
    name: string;
};

export default function AddMemberButton({
    categories,
    createMember,
}: {
    categories: Category[];
    createMember: (formData: FormData) => void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-2xl cursor-pointer bg-[#C1121F] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-red-800"
            >
                + Add Member
            </button>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="Add Member"
                subtitle="Create a member directly from the admin dashboard."
            >
                <form
                    action={async (formData) => {
                        await createMember(formData);
                        setOpen(false);
                    }}
                    className="space-y-4"
                >
                    <Input name="fullName" required placeholder="Full name" />
                    <Input name="email" type="email" placeholder="Email address" />
                    <Input name="phone" placeholder="Phone number" />

                    <select
                        name="categoryId"
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">Select membership category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Input name="expiryDate" type="date" />

                        <select
                            name="status"
                            defaultValue="ACTIVE"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                        >
                            <option value="ACTIVE">Active</option>
                            <option value="EXPIRED">Expired</option>
                            <option value="SUSPENDED">Suspended</option>
                        </select>
                    </div>

                    <button className="w-full cursor-pointer rounded-2xl bg-[#C1121F] px-5 py-4 text-sm font-black text-white hover:bg-red-800">
                        Save Member
                    </button>
                </form>
            </Modal>
        </>
    );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
        />
    );
}