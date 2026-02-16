import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import GoogleButton from "@/components/buttons/GoogleButton";

export default async function Home() {
    const session = await auth();

    if (session) {
        redirect("/store");
    }

    return (
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
                    <GoogleButton />

                    <Button asChild variant="outline" className="w-full">
                        <Link href="/auth/signup">
                            oder mit E-Mail registrieren
                        </Link>
                    </Button>

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
    );
}
