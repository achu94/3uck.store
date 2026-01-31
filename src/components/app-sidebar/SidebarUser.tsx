"use client";

import { signOut, useSession } from "next-auth/react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

export function SidebarUser() {
    const { data: session } = useSession();

    const getFirstChar = (value?: string) => {
        if (!value) return "?";
        const trimmed = value.trim();
        if (!trimmed) return "?";
        return Array.from(trimmed)[0].toUpperCase();
    };

    const names = session?.user?.name?.split(" ");

    const email = session?.user?.email || "";
    const name = session?.user?.name || "Unknown User";
    const image = session?.user?.image || "";
    const fallbackName = `${getFirstChar(names?.[0])}${getFirstChar(names?.[1])}`;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="
            w-full flex items-center gap-3 rounded-xl px-3 py-2
            transition hover:bg-muted/60
            data-[state=open]:bg-muted/70
          "
                >
                    <Avatar className="h-9 w-9 rounded-2xl">
                        <AvatarImage src={image} alt={name} />
                        <AvatarFallback>{fallbackName}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 text-left overflow-hidden">
                        <p className="text-sm font-semibold leading-none truncate">
                            {name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            {email}
                        </p>
                    </div>

                    <ChevronsUpDown className="h-4 w-4 opacity-60" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="top" align="start" className="w-64">
                {/* user header like screenshot */}
                <DropdownMenuLabel className="flex items-center gap-3 py-3">
                    <Avatar className="h-9 w-9 rounded-2xl">
                        <AvatarImage src={image} alt={name} />
                        <AvatarFallback>{fallbackName}</AvatarFallback>
                    </Avatar>

                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold leading-none truncate">
                            {name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            {email}
                        </p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href="/upgrade" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Upgrade to Pro
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href="/account" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Account
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-red-500 focus:text-red-500"
                >
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
