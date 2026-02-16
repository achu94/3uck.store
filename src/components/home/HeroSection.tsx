"use client";

import Link from "next/link";

import { Check, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export function HeroSection() {
    return (
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
                    3D-Designer und 3D-Drucker. Melde dich an und werde Teil der
                    ersten Welle!
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-8">
                    <Button size="lg" className="w-full sm:w-auto">
                        <Link href="#waitlist">Interessiert?</Link>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto"
                    >
                        <Link
                            href="https://dev.3uck.store"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
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
    );
}
