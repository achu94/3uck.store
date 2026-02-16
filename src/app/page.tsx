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
    Calendar,
    BarChart,
    CheckCircle,
    Lightbulb,
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

    const roadmap = [
        {
            quarter: "Q1",
            title: "Foundation",
            period: "Jan - Mar",
            color: "bg-primary",
            items: [
                "Store CRUD (erstellen, editieren, löschen)",
                "Category CRUD",
                "Item (Listing) CRUD",
                "Store Dashboard",
                "User Settings",
                "Public Store Page",
                "Mobile Responsive Design",
            ],
        },
        {
            quarter: "Q2",
            title: "Payment & Orders",
            period: "Apr - Jun",
            color: "bg-blue-500",
            items: [
                "Payment Integration (Stripe)",
                "Order System",
                "Order History",
                "Checkout Flow",
                "Order Notifications",
                "Payment Tests",
            ],
        },
        {
            quarter: "Q3",
            title: "STL Sales & Revenue",
            period: "Jul - Sep",
            color: "bg-green-500",
            items: [
                "STL File Upload",
                "STL Sales Feature",
                "Revenue Share System",
                "Share Settings",
                "Commission Tracking",
            ],
        },
        {
            quarter: "Q4",
            title: "Marketplace",
            period: "Okt - Dez",
            color: "bg-purple-500",
            items: [
                "Featured Store Products",
                "Discovery Page",
                "Search & Filters",
                "Store Directory",
                "Reviews & Ratings",
            ],
        },
    ];

    return (
        <main className="min-h-screen mx-auto">
            {/* Banner */}
            <BannerSection show={true} />

            {/* Navbar */}
            <NavbarSection />

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
                                            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
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

            {/* Roadmap Section */}
            <section className="container mx-auto px-6 py-16 md:py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Calendar className="w-6 h-6" />
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                Roadmap 2025
                            </h2>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Unser Plan für die Zukunft von 3uck.store.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
                        {roadmap.map((quarter) => (
                            <div
                                key={quarter.quarter}
                                className="border rounded-xl p-6 bg-card hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${quarter.color}`}>
                                        <span className="text-sm font-bold">
                                            {quarter.quarter}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">
                                            {quarter.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {quarter.period}
                                        </p>
                                    </div>
                                </div>
                                <ul className="space-y-2 text-sm">
                                    {quarter.items.map((item) => (
                                        <li key={item} className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Backlog Preview */}
                    <div className="mt-12">
                        <div className="border rounded-xl p-6 bg-card/50">
                            <div className="flex items-center gap-3 mb-6">
                                <Lightbulb className="w-8 h-8 text-primary" />
                                <div>
                                    <h3 className="font-bold text-lg">Backlog Items</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Nice to Have – Ideen und Features für später
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-sm text-muted-foreground">
                                    <span className="font-semibold text-foreground">Dark Mode</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    <span className="font-semibold text-foreground">Analytics</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    <span className="font-semibold text-foreground">Email Notifications</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    <span className="font-semibold text-foreground">PWA</span>
                                </div>
                            </div>
                        </div>
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
            <FooterSection />
        </main>
    );
}
