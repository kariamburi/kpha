import { Metadata } from "next";
import VerifyClient from "./VerifyClient";
export const metadata: Metadata = {
    title: "Verify Certificate",
    description:
        "Verify AHPK membership certificates online using a certificate verification code issued by the Association of Hotel Professionals Kenya.",
    alternates: {
        canonical: "/verify",
    },
};
export default async function VerifyPage({
    searchParams,
}: {
    searchParams: Promise<{ code?: string }>;
}) {
    const params = await searchParams;

    return <VerifyClient failedCode={params.code || ""} />;
}