import Link from "next/link";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

import { LayoutDashboard, StoreIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SidebarUser } from "./SidebarUser";

export function AppSidebar() {
    const GenerateSidebarMenuItem = (
        name: string,
        tooltip: string,
        Icon: LucideIcon,
        href: string,
    ) => (
        <Link href={href}>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip={tooltip}>
                    <Icon className="h-4 w-4" />
                    <span>{name}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </Link>
    );

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                {/* <SidebarGroup> */}
                <SidebarContent>
                    <SidebarMenu>
                        {GenerateSidebarMenuItem(
                            "Store Manager",
                            "Go to store",
                            StoreIcon,
                            "/store",
                        )}
                    </SidebarMenu>
                </SidebarContent>
                {/* </SidebarGroup> */}
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {GenerateSidebarMenuItem(
                            "Dashboard",
                            "Go to dashboard",
                            LayoutDashboard,
                            "/dashboard",
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
