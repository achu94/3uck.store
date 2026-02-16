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
    Box,
    Globe,
    Users,
    Check,
    ArrowRight,
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
            description: "Erstelle deinen professionellen Store in 2 Minuten. Keine technischen Kenntnisse nötig.",
            stats: "2 Minuten Setup",
        },
        {
            icon: DollarSign,
            title: "100% Einnahmen",
            description: "Du bekommst 100% deiner Einnahmen. Keine versteckten Gebühren, keine Abzüge.",
            stats: "Keine Gebühren",
        },
        {
            icon: Shield,
            title: "Freemium Modell",
            description: "Starte kostenlos und upgraden wenn du wächst. Keine versteckten Kosten.",
            stats: "Freemium",
        },
        {
            icon: Zap,
            title: "Schnell & Einfach",
            description: "Direkter Upload von 3D-Modellen und automatische Print-Angebote in Sekunden.",
            stats: "Sofort live",
        },
    ];

    const benefits = [
        {
            icon: Globe,
            title: "Eigener Store-Slug",
            description: "Dein Store unter 3uck.store/dein-name – einzigartig & leicht merklich",
        },
        {
            icon: Box,
            title: "Digital & Physisch",
            description: "Verkaufe sowohl STL-Dateien als auch gedruckte Produkte",
        },
        {
            icon: Users,
            title: "Direkter Kundenkontakt",
            description: "Kommuniziere direkt mit deinen Kunden ohne Middleman",
        },
    ];

    const stats = [
        { value: "0€", label: "Startkosten" },
        { value: "0%", label: "Gebühren" },
        { value: "2", label: "Minuten" },
        { value: "100%", label: "Einnahmen" },
    ];

    return (
        <main className="min-h-screen">
            {/* Navbar */}
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Box className="w-8 h-8" />
                        <span className="font-bold text-xl">3uck.store</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost">
                            <Link href="/auth/signin">Einloggen</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/auth/signup">Loslegen</Link>
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-16 md:py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div className="space-y-8">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium">
                                <span className="w-2 h-2 rounded-full animate-pulse" />
                                <span>3uck.store ist jetzt live</span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                                Dein Store für
                                <span className="block">
                                    3D-Modelle & Prints
                                </span>
                            </h1>

                            {/* Subline */}
                            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                                Erstelle deinen eigenen Store für 3D-Druck-Modelle
                                und physische Prints. Kostenlos. Ohne
                                Marktplatz-Abhängigkeit.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md">
                                <GoogleButton />

                                <Button asChild variant="outline" className="w-full sm:w-auto">
                                    <Link href="/auth/signup">
                                        Mit E-Mail starten
                                    </Link>
                                </Button>
                            </div>

                            {/* Trust Badge */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Check className="w-4 h-4" />
                                    <span>Kostenlos starten</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Check className="w-4 h-4" />
                                    <span>Keine Credit-Card</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Check className="w-4 h-4" />
                                    <span>Keine Gebühren</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual - 3D Cube Icon */}
                        <div className="hidden lg:flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 border rounded-2xl transform rotate-6" />
                                <div className="relative border rounded-2xl p-12">
                                    <div className="flex items-center justify-center">
                                        <Box className="w-32 h-32 animate-pulse" />
                                    </div>
                                    <div className="mt-8 text-center">
                                        <p className="text-sm text-muted-foreground">
                                            Dein Store. Deine Regeln.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-6 py-16 border-y">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center space-y-2">
                                <div className="text-3xl md:text-4xl font-bold">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-6 py-16 md:py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            Warum 3uck.store?
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Alles, was du für einen professionellen 3D-Druck-Store brauchst.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={feature.title}
                                    className="group relative border rounded-xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-muted-foreground mb-4">
                                                {feature.description}
                                            </p>
                                            <div className="text-sm font-medium">
                                                {feature.stats}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="container mx-auto px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            Noch mehr Vorteile
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Was dich von Marktplätzen unterscheidet.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;
                            return (
                                <div
                                    key={benefit.title}
                                    className="text-center space-y-4 p-6 rounded-xl border"
                                >
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-bold text-xl">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {benefit.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 py-16 md:py-24">
                <div className="max-w-4xl mx-auto">
                    <div className="relative overflow-hidden rounded-2xl p-12 text-center">
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
                        </div>

                        <div className="relative space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold">
                                Bereit loszulegen?
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Starte jetzt kostenlos und erstelle deinen
                                professionellen 3D-Druck-Store in wenigen Minuten.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button
                                    asChild
                                    size="lg"
                                    className="w-full sm:w-auto"
                                >
                                    <Link href="/auth/signup">
                                        Kostenlos starten
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                >
                                    <Link href="/auth/signin">
                                        Einloggen
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="container mx-auto px-6 py-12 border-t">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <Box className="w-6 h-6" />
                                <span className="font-bold text-lg">3uck.store</span>
                            </div>
                            <p className="text-muted-foreground max-w-sm">
                                Deine Plattform für 3D-Druck-Modelle und physische Prints.
                                Kostenlos. Ohne Gebühren. Deine Kontrolle.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Produkt</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>
                                    <Link href="/features" className="hover:text-foreground transition-colors">
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/pricing" className="hover:text-foreground transition-colors">
                                        Preise
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/api" className="hover:text-foreground transition-colors">
                                        API
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Rechtliches</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>
                                    <Link href="/privacy" className="hover:text-foreground transition-colors">
                                        Datenschutz
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="hover:text-foreground transition-colors">
                                        AGB
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/imprint" className="hover:text-foreground transition-colors">
                                        Impressum
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                        <p>© {new Date().getFullYear()} 3uck.store. Alle Rechte vorbehalten.</p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="hover:text-foreground transition-colors">
                                Twitter
                            </Link>
                            <Link href="#" className="hover:text-foreground transition-colors">
                                GitHub
                            </Link>
                            <Link href="#" className="hover:text-foreground transition-colors">
                                Discord
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
