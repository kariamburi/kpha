import { redirect } from "next/navigation";
import { clearMemberSession } from "../session";

export async function GET() {
    await clearMemberSession();

    redirect("/member/login");
}