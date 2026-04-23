import Link from "next/link";
import { Package2 } from "lucide-react";
import { NavbarUserMenu } from "./NavbarUserMenu";
import { NavbarBasket } from "./NavbarBasket";

export function PublicNavbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                    <Package2 className="h-5 w-5" />
                    3uck.store
                </Link>

                <div className="flex items-center gap-1">
                    <NavbarBasket />
                    <NavbarUserMenu />
                </div>
            </div>
        </header>
    );
}
