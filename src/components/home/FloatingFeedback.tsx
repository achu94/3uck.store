"use client";

import { MessageSquarePlus, Sparkles } from "lucide-react";

export function FloatingFeedback() {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 group">
            {/* Kleine Sprechblase, die beim Hover erscheint */}
            <div className="bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-xl border border-white/10 translate-x-[-10px]">
                Idee? Fehler gefunden? Schreib uns! 🚀
            </div>

            {/* Der eigentliche Button */}
            <a
                href="mailto:hello@3uck.store?subject=Feedback aus dem Dashboard"
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group border-2 border-white/20"
            >
                <MessageSquarePlus className="w-6 h-6" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold whitespace-nowrap">
                    Feedback geben
                </span>
                <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </a>
        </div>
    );
}
