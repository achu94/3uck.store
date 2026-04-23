import Link from "next/link";
import { auth } from "@/lib/auth";
import { buttonVariants } from "@/components/ui/button";
import { LayoutDashboard, LogIn, Package2 } from "lucide-react";
import { cn } from "@/lib/utils";

export async function PublicNavbar() {
    const session = await auth();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                    <Package2 className="h-5 w-5" />
                    3uck.store
                </Link>

                <nav className="flex items-center gap-2">
                    {session?.user ? (
                        <Link
                            href="/store"
                            className={cn(buttonVariants({ variant: "default", size: "sm" }), "gap-2")}
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/auth/signin"
                                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                            >
                                Anmelden
                            </Link>
                            <Link
                                href="/auth/signup"
                                className={cn(buttonVariants({ variant: "default", size: "sm" }), "gap-2")}
                            >
                                <LogIn className="h-4 w-4" />
                                Registrieren
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
