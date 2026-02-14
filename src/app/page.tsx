"use client";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import GoogleButton from "@/components/buttons/GoogleButton";
import { DevEnvironmentBanner } from "@/components/dev-environment-banner";
import { useState, useEffect } from "react";

export default function Home() {
    const [session, setSession] = useState(null);
    const [devAccepted, setDevAccepted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userSession = await auth();
                setSession(userSession);
                
                if (userSession) {
                    window.location.href = "/store";
                    return;
                }
            } catch (error) {
                console.error("Auth check failed:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <main className="flex min-h-screen items-center justify-center px-6">
                <div className="text-muted-foreground">Lading...</div>
            </main>
        );
    }

    return (
        <>
            {!devAccepted && <DevEnvironmentBanner onAccept={() => setDevAccepted(true)} />}
            
            <main className="flex min-h-screen items-center justify-center px-6">
                <div className="max-w-xl text-center space-y-8">
                {/* Headline */}
                <h1 className="text-4xl font-bold tracking-tight">
                    Erstelle deinen eigenen Store
                    <span className="block text-muted-foreground mt-2">
                        für 3D-Modelle & Prints
                    </span>
                </h1>

                {/* Subline */}
                <p className="text-lg text-muted-foreground">
                    Verkaufe digitale 3D-Modelle oder physische Prints. Ohne
                    Setup-Hölle. Ohne Marktplatz-Abhängigkeit.
                </p>

                {/* CTA */}
                <div className="flex flex-col items-center gap-4">
                    <GoogleButton disabled={!devAccepted} />

                    {!devAccepted && (
                        <div className="bg-yellow-100 border border-yellow-300 rounded-md p-3 text-sm text-yellow-800">
                            Bitte bestätige zuerst, dass du die Entwicklungs-Umgebung verstanden hast.
                        </div>
                    )}

                    <p className="text-xs text-muted-foreground">
                        Kostenlos starten · Kein Credit-Card nötig
                    </p>
                </div>

                {/* Trust / Secondary */}
                <div className="pt-8 border-t text-sm text-muted-foreground">
                    Eigene Domain · Eigene Preise · Volle Kontrolle
                </div>
            </div>
        </main>
        </>
    );
}
