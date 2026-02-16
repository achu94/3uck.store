"use client";

import { AlertCircle } from "lucide-react";

import Link from "next/link";

export type BannerSectionProps = {
    show: boolean;
};

export function BannerSection({ show }: BannerSectionProps) {
    if (!show) return null;

    return (
        <div className="border-b bg-primary text-primary-foreground">
            <div className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-center gap-2 text-sm font-medium">
                    <AlertCircle className="w-4 h-4" />
                    <span>
                        In Entwicklung – Wir arbeiten mit Hochdruck an
                        3uck.store!
                    </span>
                    <Link
                        href="https://dev.3uck.store"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 hover:underline font-semibold"
                    >
                        Zu dev.3uck.store →
                    </Link>
                </div>
            </div>
        </div>
    );
}
