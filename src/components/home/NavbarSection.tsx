"use client";

import Link from "next/link";
import { Button } from "../ui/button";

import { LogoIcon } from "../ui/LogoIcon";

export function NavbarSection() {
    return (
        <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <LogoIcon size="2xl" />
                </Link>
                <div className="flex items-center gap-4">
                    <Button asChild>
                        <Link href="/auth/signup">Loslegen</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
