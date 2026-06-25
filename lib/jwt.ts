import jwt from "jsonwebtoken";

export function signToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "7d",
    });
}

export function verifyToken<T>(token: string): T | null {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!) as T;
    } catch {
        return null;
    }
}