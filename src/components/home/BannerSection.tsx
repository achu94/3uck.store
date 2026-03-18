"use client";

import { Construction } from "lucide-react";

export type BannerSectionProps = {
    show: boolean;
};

export function BannerSection({ show }: BannerSectionProps) {
    if (!show) return null;

    return (
        <div className="border-b bg-amber-500 text-amber-950 shadow-sm">
            <div className="container mx-auto px-6 py-2.5">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-1 text-xs md:text-sm font-bold">
                    <div className="flex items-center gap-2">
                        <Construction className="w-4 h-4" />
                        <span>WORK IN PROGRESS</span>
                    </div>
                    <span className="hidden sm:inline opacity-30">|</span>
                    <span className="text-center">
                        Shops & Produkte anlegen ist live – Verkauf folgt! 🚀
                    </span>
                </div>
            </div>
        </div>
    );
}
