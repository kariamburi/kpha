import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { ok: false, error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const validPassword = await verifyPassword(password, user.password);

        if (!validPassword) {
            return NextResponse.json(
                { ok: false, error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const token = signToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        const res = NextResponse.json({
            ok: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

        res.cookies.set("ahpk_token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return res;
    } catch (error) {
        console.error("LOGIN_ERROR", error);

        return NextResponse.json(
            { ok: false, error: "Something went wrong" },
            { status: 500 }
        );
    }
}