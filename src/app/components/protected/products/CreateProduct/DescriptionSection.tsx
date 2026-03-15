"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface DescriptionSectionProps {
    value: string;
    error?: string;
    onChange: (val: string) => void;
}

export function DescriptionSection({
    value,
    error,
    onChange,
}: DescriptionSectionProps) {
    const MAX_LENGTH = 2000;
    const currentLength = value?.length || 0;

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <Label
                        htmlFor="description"
                        className={cn(
                            "text-base font-semibold",
                            error && "text-destructive",
                        )}
                    >
                        Produktbeschreibung
                    </Label>
                    <span
                        className={cn(
                            "text-xs font-mono",
                            currentLength > MAX_LENGTH * 0.9
                                ? "text-orange-500"
                                : "text-muted-foreground",
                        )}
                    >
                        {currentLength} / {MAX_LENGTH}
                    </span>
                </div>
                <p className="text-sm text-muted-foreground">
                    Beschreibe dein Produkt so detailliert wie möglich. Gute
                    Beschreibungen erhöhen die Verkaufschancen.
                </p>
            </div>

            <div className="relative">
                <Textarea
                    id="description"
                    placeholder="Erzähle die Geschichte hinter deinem Produkt..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={cn(
                        "min-h-[200px] resize-none py-4 leading-relaxed transition-all focus-visible:ring-blue-600",
                        error
                            ? "border-destructive focus-visible:ring-destructive"
                            : "border-input",
                    )}
                    maxLength={MAX_LENGTH}
                />

                {/* Dekorativer Fokus-Indikator unten rechts */}
                <div className="absolute bottom-3 right-3 pointer-events-none opacity-20">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                </div>
            </div>

            {error && (
                <p className="text-sm font-medium text-destructive animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
}
