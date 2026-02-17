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
                    <Button asChild variant="ghost">
                        <Link
                            href="https://dev.3uck.store"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Dev
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="#waitlist">Interesse anmelden</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
