import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const MEMBER_SESSION_COOKIE = "ahpk_member_session";

export async function setMemberSession(memberId: string) {
    const cookieStore = await cookies();

    cookieStore.set(MEMBER_SESSION_COOKIE, memberId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/member",
        maxAge: 60 * 60 * 24 * 7,
    });
}

export async function getMemberSession() {
    const cookieStore = await cookies();
    return cookieStore.get(MEMBER_SESSION_COOKIE)?.value || null;
}

export async function requireMemberSession() {
    const memberId = await getMemberSession();

    if (!memberId) {
        redirect("/member/login");
    }

    return memberId;
}

export async function clearMemberSession() {
    const cookieStore = await cookies();

    cookieStore.delete(MEMBER_SESSION_COOKIE);
}