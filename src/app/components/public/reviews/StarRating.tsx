"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
    value: number;
    onChange?: (value: number) => void;
    readonly?: boolean;
    size?: "sm" | "md" | "lg";
};

export function StarRating({ value, onChange, readonly = false, size = "md" }: Props) {
    const [hovered, setHovered] = useState<number | null>(null);

    const sizeClass = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-7 h-7",
    }[size];

    const display = hovered ?? value;

    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={readonly}
                    onClick={() => onChange?.(star === value ? 0 : star)}
                    onMouseEnter={() => !readonly && setHovered(star)}
                    onMouseLeave={() => !readonly && setHovered(null)}
                    className={cn(
                        "transition-colors",
                        readonly ? "cursor-default" : "cursor-pointer",
                    )}
                    aria-label={`${star} Stern${star > 1 ? "e" : ""}`}
                >
                    <svg
                        className={cn(sizeClass, "transition-colors")}
                        viewBox="0 0 24 24"
                        fill={star <= display ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                    </svg>
                </button>
            ))}
        </div>
    );
}

export function StarDisplay({ value, count }: { value: number | null; count?: number | null }) {
    const rounded = Math.round((value ?? 0) * 2) / 2;
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        className="w-4 h-4 text-yellow-400"
                        viewBox="0 0 24 24"
                        fill={star <= rounded ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                    </svg>
                ))}
            </div>
            {value !== null && value !== undefined && (
                <span className="text-sm text-muted-foreground">
                    {value.toFixed(1)}{count != null ? ` (${count})` : ""}
                </span>
            )}
        </div>
    );
}
