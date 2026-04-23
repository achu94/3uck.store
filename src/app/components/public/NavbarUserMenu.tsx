"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LayoutDashboard, LogIn, LogOut, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

function getInitials(name?: string | null): string {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return (parts[0][0] ?? "?").toUpperCase();
    return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

export function NavbarUserMenu() {
    const { data: session } = useSession();

    if (!session?.user) {
        return (
            <div className="flex items-center gap-2">
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
            </div>
        );
    }

    const { name, email, image } = session.user;
    const initials = getInitials(name);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center gap-2 h-9 px-2 rounded-full"
                >
                    <Avatar className="h-7 w-7">
                        <AvatarImage src={image ?? ""} alt={name ?? ""} />
                        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm font-medium max-w-28 truncate">
                        {name}
                    </span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex items-center gap-3 py-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={image ?? ""} alt={name ?? ""} />
                        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold leading-none truncate">{name}</p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{email}</p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href="/account" className="flex items-center gap-2 cursor-pointer">
                        <User className="h-4 w-4" />
                        Mein Profil
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                        <Settings className="h-4 w-4" />
                        Einstellungen
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href="/store" className="flex items-center gap-2 cursor-pointer">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-red-500 focus:text-red-500 cursor-pointer"
                >
                    <LogOut className="h-4 w-4" />
                    Abmelden
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
