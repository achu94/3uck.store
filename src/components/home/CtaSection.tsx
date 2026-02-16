"use client";

import Link from "next/link";

import { ArrowRight, Lightbulb, Mail } from "lucide-react";
import { Button } from "../ui/button";

export function CtaSection() {
    return (
        <section className="container mx-auto py-16">
            <div className="mx-auto text-center bg-card p-8">
                <div className="inline-flex items-center gap-2 mb-6">
                    <Lightbulb className="w-8 h-8" />
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        3D-Designer & 3D-Drucker gesucht!
                    </h2>
                </div>
                <p className="text-xl opacity-90 mx-auto mb-8">
                    Wir suchen motivierte 3D-Designer, die ihre Modelle
                    verkaufen wollen, und 3D-Drucker, die Druckaufträge
                    annehmen. Melde dich an und werde Teil der ersten Welle!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        size="lg"
                        variant="secondary"
                        className="w-full sm:w-auto"
                    >
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
                        <Link
                            href="mailto:hello@3uck.store"
                            className="flex items-center"
                        >
                            Kontakt aufnehmen
                            <Mail className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
