"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StorefrontSearch({ defaultValue }: { defaultValue?: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [, startTransition] = useTransition();

    const updateSearch = useCallback(
        (value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set("q", value);
            } else {
                params.delete("q");
            }
            startTransition(() => {
                router.replace(`${pathname}?${params.toString()}`);
            });
        },
        [router, pathname, searchParams]
    );

    return (
        <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
                type="search"
                placeholder="Produkte suchen…"
                defaultValue={defaultValue}
                onChange={(e) => updateSearch(e.target.value)}
                className="pl-9 pr-9"
            />
            {defaultValue && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => updateSearch("")}
                >
                    <X className="h-3.5 w-3.5" />
                </Button>
            )}
        </div>
    );
}
