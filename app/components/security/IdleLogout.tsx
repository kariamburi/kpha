"use client";

import { useEffect, useRef } from "react";

export default function IdleLogout({
    timeoutMinutes = 30,
    logoutUrl,
}: {
    timeoutMinutes?: number;
    logoutUrl: string;
}) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const timeoutMs = timeoutMinutes * 60 * 1000;

        function logout() {
            window.location.href = logoutUrl;
        }

        function resetTimer() {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(logout, timeoutMs);
        }

        const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];

        events.forEach((event) => window.addEventListener(event, resetTimer));
        resetTimer();

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            events.forEach((event) => window.removeEventListener(event, resetTimer));
        };
    }, [timeoutMinutes, logoutUrl]);

    return null;
}