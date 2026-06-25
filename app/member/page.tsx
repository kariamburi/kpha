import { redirect } from "next/navigation";
import { getMemberSession } from "./session";

export default async function MemberPage() {
    const memberId = await getMemberSession();

    if (memberId) {
        redirect("/member/dashboard");
    }

    redirect("/member/login");
}