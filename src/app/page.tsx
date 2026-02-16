"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Box,
    Zap,
    Store,
    DollarSign,
    Shield,
    Users,
    Mail,
    Check,
    Sparkles,
    Rocket,
    ArrowRight,
    Calendar,
    BarChart,
    CheckCircle,
    Lightbulb,
    AlertCircle,
} from "lucide-react";

export default function Home() {
    const [waitlistForm, setWaitlistForm] = useState({
        name: "",
        email: "",
        interest: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const features = [
        {
            icon: Store,
            title: "Eigener Store",
            description: "Professioneller Shop für deine 3D-Druck-Modelle und Prints",
        },
        {
            icon: Zap,
            title: "Schnell & Einfach",
            description: "Keine technischen Kenntnisse nötig – in 2 Minuten live",
        },
        {
            icon: DollarSign,
            title: "100% Einnahmen",
            description: "Du behältst alle deine Einnahmen – ohne versteckte Gebühren",
        },
        {
            icon: Shield,
            title: "Freemium Modell",
            description: "Starte kostenlos, upgraden wenn du wächst",
        },
    ];

    const roadmap = [
        {
            phase: "Q1",
            title: "Foundation",
            period: "Jan - Mär",
            status: "in-progress",
            description: "Stores, Listings, Dashboards & Settings",
            items: [
                "Store CRUD (erstellen, editieren, löschen)",
                "Category CRUD",
                "Item (Listing) CRUD",
                "Store Dashboard",
                "User Settings (Profile, Email, etc.)",
                "Public Store Page",
                "Mobile Responsive Design",
            ],
        },
        {
            phase: "Q2",
            title: "Payment & Orders",
            period: "Apr - Jun",
            status: "planned",
            description: "Stripe, Orders, History & Notifications",
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
            phase: "Q3",
            title: "STL Sales & Revenue",
            period: "Jul - Sep",
            status: "planned",
            description: "STL Uploads, Sales & Revenue Share",
            items: [
                "STL File Upload",
                "STL Sales Feature",
                "Revenue Share System",
                "Share Settings (Prozentual)",
                "Commission Tracking",
            ],
        },
        {
            phase: "Q4",
            title: "Marketplace",
            period: "Okt - Dez",
            status: "planned",
            description: "Discovery, Search, Directory & Reviews",
            items: [
                "Featured Store Products",
                "Discovery Page",
                "Search & Filters",
                "Store Directory",
                "Reviews & Ratings",
            ],
        },
    ];

    const benefits = [
        {
            icon: Users,
            title: "Für 3D-Designer",
            description: "Erstelle deine STL-Modelle und verkaufe sie weltweit",
        },
        {
            icon: Store,
            title: "Für 3D-Drucker",
            description: "Biete Druckaufträge an und verkaufe deine Services",
        },
        {
            icon: Shield,
            title: "Sicherheit & Kontrolle",
            description: "Deine Daten, dein Store – volle Kontrolle",
        },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const response = await fetch("/api/waitlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(waitlistForm),
            });

            if (!response.ok) {
                throw new Error("Fehler beim Anmelden");
            }

            const data = await response.json();
            setSuccess(true);
            setWaitlistForm({
                name: "",
                email: "",
                interest: "",
                message: "",
            });
        } catch (err) {
            setError("Fehler beim Anmelden. Bitte versuche es später erneut.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case "in-progress":
                return <Rocket className="w-5 h-5 text-yellow-600 animate-pulse" />;
            case "planned":
                return <Calendar className="w-5 h-5 text-gray-600" />;
            default:
                return <CheckCircle className="w-5 h-5" />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "completed":
                return "Erledigt";
            case "in-progress":
                return "In Arbeit";
            case "planned":
                return "Geplant";
            default:
                return status;
        }
    };

    return (
        <main className="min-h-screen max-w-6xl mx-auto">
            {/* Banner */}
            <div className="border-b bg-primary text-primary-foreground">
                <div className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-center gap-2 text-sm font-medium">
                        <AlertCircle className="w-4 h-4" />
                        <span>In Entwicklung – Wir arbeiten mit Hochdruck an 3uck.store!</span>
                        <Link href="https://dev.3uck.store" target="_blank" rel="noopener noreferrer" className="ml-2 hover:underline font-semibold">
                            Zu dev.3uck.store →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Box className="w-8 h-8" />
                        <span className="font-bold text-xl">3uck.store</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost">
                            <Link href="https://dev.3uck.store" target="_blank" rel="noopener noreferrer">
                                Dev
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href="#waitlist">
                                Interesse anmelden
                            </Link>
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-16">
                <div className="mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                        <Sparkles className="w-4 h-4" />
                        <span>Bald verfügbar – Melde dich an für Updates!</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Deine Plattform für
                        <span className="block text-primary">
                            3D-Designer & 3D-Drucker
                        </span>
                    </h1>

                    {/* Subline */}
                    <p className="text-xl md:text-2xl text-muted-foreground mx-auto mb-8">
                        Wir entwickeln 3uck.store – eine moderne Plattform für
                        3D-Designer und 3D-Drucker. Melde dich an und werde Teil der ersten Welle!
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-8">
                        <Button size="lg" className="w-full sm:w-auto">
                            <Link href="#waitlist">
                                Interessiert?
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                            <Link href="https://dev.3uck.store" target="_blank" rel="noopener noreferrer">
                                Zu Dev →
                            </Link>
                        </Button>
                    </div>

                    {/* Trust Badge */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600" />
                            <span>Kostenlos</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600" />
                            <span>Keine Gebühren</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600" />
                            <span>100% Kontrolle</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Preview */}
            <section className="container mx-auto px-6 py-16 bg-muted/30">
                <div className="mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            Was kommt?
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Stores, Listings, Dashboards und mehr – alles in einer Plattform.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                                {feature.title}
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <CardDescription className="text-base">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="container mx-auto py-16">
                <div className="mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            Für wen?
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            3D-Designer, 3D-Drucker und Kunden – alle profitieren.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;
                            return (
                                <Card key={benefit.title} className="text-center hover:shadow-lg transition-shadow">
                                    <CardContent className="pt-6">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <h3 className="font-bold text-xl mb-2">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {benefit.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Roadmap */}
            <section id="roadmap" className="container mx-auto py-16">
                <div className="mx-auto">
                    <div className="text-center mb-12">
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

                    <div className="space-y-6">
                        {roadmap.map((quarter) => (
                            <Card key={quarter.phase} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                                                quarter.status === "completed"
                                                    ? "bg-green-600"
                                                    : quarter.status === "in-progress"
                                                        ? "bg-yellow-600"
                                                        : "bg-gray-400"
                                            }`}>
                                                {quarter.phase}
                                            </div>
                                            <div>
                                                <CardTitle className="text-xl">
                                                    {quarter.title}
                                                </CardTitle>
                                                <p className="text-sm text-muted-foreground">
                                                    {quarter.period}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(quarter.status)}
                                            <span className="text-sm font-medium">
                                                {getStatusText(quarter.status)}
                                            </span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base mb-4">
                                        {quarter.description}
                                    </CardDescription>
                                    <ul className="space-y-2">
                                        {quarter.items.map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3D-Designer & 3D-Drucker CTA */}
            <section className="container mx-auto py-16">
                <div className="mx-auto text-center bg-card p-8">
                    <div className="inline-flex items-center gap-2 mb-6">
                        <Lightbulb className="w-8 h-8" />
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            3D-Designer & 3D-Drucker gesucht!
                        </h2>
                    </div>
                    <p className="text-xl opacity-90 mx-auto mb-8">
                        Wir suchen motivierte 3D-Designer, die ihre Modelle verkaufen wollen,
                        und 3D-Drucker, die Druckaufträge annehmen. Melde dich an und werde Teil der ersten Welle!
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                            <Link href="#waitlist" className="flex items-center">
                                Interesse anmelden
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto bg-transparent border-white hover:bg-white/10"
                        >
                            <Link href="mailto:hello@3uck.store" className="flex items-center">
                                Kontakt aufnehmen
                                <Mail className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Waitlist Form */}
            {/* <section id="waitlist" className="container mx-auto py-16">
                <div>
                    <Card className="border-2 border-primary/20">
                        <CardHeader className="text-center pb-6">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <Mail className="w-8 h-8 text-primary" />
                                <CardTitle className="text-2xl md:text-3xl">
                                    Interesse anmelden
                                </CardTitle>
                            </div>
                            <CardDescription className="text-base">
                                Melde dich an, sobald wir live gehen benachrichtigen wir dich!
                                Kein Spam, nur Updates.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {success ? (
                                <div className="flex flex-col items-center justify-center gap-3 py-8 text-green-600">
                                    <CheckCircle className="w-12 h-12" />
                                    <h3 className="text-xl font-semibold">
                                        Erfolgreich angemeldet!
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Wir benachrichtigen dich, sobald 3uck.store live geht.
                                    </p>
                                    <Button
                                        onClick={() => setSuccess(false)}
                                        variant="outline"
                                        className="mt-4"
                                    >
                                        Weitere Anmeldung
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        {error && (
                                            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{error}</span>
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Dein Name"
                                                value={waitlistForm.name}
                                                onChange={(e) => setWaitlistForm({...waitlistForm, name: e.target.value})}
                                                required
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">E-Mail</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="deine@email.com"
                                                value={waitlistForm.email}
                                                onChange={(e) => setWaitlistForm({...waitlistForm, email: e.target.value})}
                                                required
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="interest">Interesse als</Label>
                                            <select
                                                id="interest"
                                                value={waitlistForm.interest}
                                                onChange={(e) => setWaitlistForm({...waitlistForm, interest: e.target.value})}
                                                className="w-full px-3 py-2 border rounded-md bg-background"
                                                required
                                            >
                                                <option value="">Bitte auswählen...</option>
                                                <option value="designer">3D-Designer</option>
                                                <option value="printer">3D-Drucker</option>
                                                <option value="customer">Kunde</option>
                                                <option value="investor">Investor</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message">Nachricht (optional)</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Erzähl uns, was du suchst..."
                                                value={waitlistForm.message}
                                                onChange={(e) => setWaitlistForm({...waitlistForm, message: e.target.value})}
                                                className="w-full resize-none"
                                                rows={3}
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <Rocket className="w-4 h-4 mr-2 animate-spin" />
                                                    Anmelden...
                                                </>
                                            ) : (
                                                <>
                                                    Anmelden
                                                    <ArrowRight className="ml-2 w-4 h-4" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section> */}

            {/* Footer */}
            <footer className="container mx-auto px-6 py-12 border-t bg-muted/30">
                <div className="mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Box className="w-6 h-6" />
                                <span className="font-bold text-lg">3uck.store</span>
                            </div>
                            <p className="text-muted-foreground max-w-sm">
                                Deine Plattform für 3D-Designer und 3D-Drucker.
                                Noch in Entwicklung.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Roadmap</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>
                                    <Link href="#roadmap" className="hover:text-foreground transition-colors">
                                        Roadmap 2025
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://dev.3uck.store" className="hover:text-foreground transition-colors">
                                        Development Stage
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Rechtliches</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">
                                        Datenschutz
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">
                                        AGB
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">
                                        Impressum
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                        <p>© {new Date().getFullYear()} 3uck.store – In Entwicklung</p>
                        <div className="flex items-center gap-4">
                            <Link href="mailto:hello@3uck.store" className="hover:text-foreground transition-colors flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>Kontakt</span>
                            </Link>
                            <Link href="https://github.com/achu94/3uck.store" className="hover:text-foreground transition-colors flex items-center gap-2">
                                <GitHubIcon className="w-4 h-4" />
                                <span>GitHub</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}

// GitHub Icon Component
function GitHubIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207-12.998 1.448-4.425 1.354-2.191-1.517-1.735a1.462 1.462 0 0 0-1.032-.425c-.024-.394-.032-.786-.032-1.18 0-2.648 1.374-4.86 4.008-8.432.608-3.405 1.735-4.582 4.425-8.432-1.033-3.384-4.425-2.777-8.432-2.514-5.864-4.425-8.432-6.926-6.828-2.777-8.432-3.362-5.864-4.425-8.432-6.236-3.051-4.425-2.948-8.432-3.362-5.864-4.425-8.432-6.926-6.828-2.777-8.432-3.362-5.864-4.425-8.432zm-9.914 0c-.627 0-1.135-.508-1.135-1.135v-6.327c0-.627.508-1.135 1.135-1.135h1.728c-.347 0-.654.183-.894.446l-2.318 2.318c-.263.263-.446.613-.446 1.005v1.728c0 .627-.508 1.135-1.135 1.135h-1.728c-.347 0-.654.183-.894.446l-2.318-2.318c-.263-.263-.446-.613-.446-1.005v-1.728c0-.627.508-1.135-1.135-1.135h-1.728c-.347 0-.654.183-.894.446l-2.318-2.318c-.263-.263-.446-.613-.446-1.005v-1.728c0-.627.508-1.135-1.135-1.135h1.728c.347 0 .654.183.894-.446l2.318 2.318c.263.263.446.613.446 1.005v1.728c0 .627.508 1.135 1.135 1.135h1.728c.347 0 .654.183.894-.446l2.318-2.318c.263-.263.446-.613.446-1.005v-1.728c0-.627.508-1.135-1.135-1.135z" />
        </svg>
    );
}
