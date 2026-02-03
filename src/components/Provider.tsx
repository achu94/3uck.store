"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { userIdAtom } from "@/atoms/auth";

function UserAtomSync() {
    const { data: session, status } = useSession();
    const setUserId = useSetAtom(userIdAtom);

    useEffect(() => {
        if (session?.user?.id) {
            setUserId(session.user.id);
        } else {
            setUserId(null);
        }
    }, [session, status, setUserId]);

    return null;
}

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <UserAtomSync />
                {children}
            </ThemeProvider>
        </SessionProvider>
    );
}
