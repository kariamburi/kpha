import VerifyClient from "./VerifyClient";

export default async function VerifyPage({
    searchParams,
}: {
    searchParams: Promise<{ code?: string }>;
}) {
    const params = await searchParams;

    return <VerifyClient failedCode={params.code || ""} />;
}