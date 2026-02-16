import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import GoogleButton from "@/components/buttons/GoogleButton";
import {
    Store,
    DollarSign,
    Shield,
    Zap,
} from "lucide-react";

export default async function Home() {
    const session = await auth();

    if (session) {
        redirect("/store");
    }

    const features = [
        {
            icon: Store,
            title: "Eigener Store",
            description: "Erstelle deinen Store in 2 Minuten. Keine technische Kenntnisse nötig.",
        },
        {
            icon: DollarSign,
            title: "Volle Einnahmen",
            description: "Du bekommst 100% deiner Einnahmen. Keine versteckten Gebühren.",
        },
        {
            icon: Shield,
            title: "Keine Abhängigkeit",
            description: "Dein Store, deine Domain, deine Kunden. Volle Kontrolle.",
        },
        {
            icon: Zap,
            title: "Schnell & Einfach",
            description: "Direkter Upload von 3D-Modellen und automatische Print-Angebote.",
        },
    ];

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Hero Section */}
            <section className="container mx-auto px-6 py-16 md:py-24">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span>3uck.store ist jetzt live</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Verkaufe deine 3D-Modelle
                        <span className="block text-muted-foreground mt-2">
                            & Prints – ganz einfach
                        </span>
                    </h1>

                    {/* Subline */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Erstelle deinen eigenen Store für 3D-Druck-Modelle und
                        physische Prints. Ohne Setup-Hölle. Ohne
                        Marktplatz-Abhängigkeit.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                        <GoogleButton />

                        <Button asChild variant="outline" className="w-full">
                            <Link href="/auth/signup">
                                Mit E-Mail starten
                            </Link>
                        </Button>
                    </div>

                    {/* Trust Badge */}
                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
                        <span>✓ Kostenlos starten</span>
                        <span>✓ Kein Credit-Card nötig</span>
                        <span>✓ Keine Gebühren</span>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Warum 3uck.store?
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            Alles, was du für deinen 3D-Druck-Store brauchst.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={feature.title}
                                    className="border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 py-16">
                <div className="max-w-3xl mx-auto text-center space-y-6 p-8 rounded-lg border bg-card">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Bereit loszulegen?
                    </h2>
                    <p className="text-muted-foreground">
                        Starte jetzt kostenlos und erstelle deinen ersten Store
                        in wenigen Minuten.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild size="lg" className="w-full sm:w-auto">
                            <Link href="/auth/signup">
                                Kostenlos starten
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto"
                        >
                            <Link href="/auth/signin">
                                Einloggen
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="container mx-auto px-6 py-8 border-t">
                <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} 3uck.store</p>
                </div>
            </footer>
        </main>
    );
}
