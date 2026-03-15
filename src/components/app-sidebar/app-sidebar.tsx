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
    SidebarTrigger,
} from "@/components/ui/sidebar";

import {
    LayoutDashboard,
    StoreIcon,
    FolderTree,
    Package,
    Home,
} from "lucide-react";
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
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                {/* <SidebarGroup> */}
                <SidebarContent>
                    <SidebarMenu>
                        <SidebarTrigger />
                    </SidebarMenu>
                </SidebarContent>
                {/* </SidebarGroup> */}
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {GenerateSidebarMenuItem(
                            "Store Manager",
                            "Go to store",
                            StoreIcon,
                            "/store",
                        )}
                    </SidebarMenu>
                    <SidebarMenu>
                        {GenerateSidebarMenuItem(
                            "Start",
                            "Go to dashboard",
                            LayoutDashboard,
                            "/dashboard",
                        )}
                    </SidebarMenu>
                    <SidebarMenu>
                        {GenerateSidebarMenuItem(
                            "Kategorien",
                            "Go to categories",
                            FolderTree,
                            "/dashboard/categories",
                        )}
                    </SidebarMenu>
                    <SidebarMenu>
                        {GenerateSidebarMenuItem(
                            "Products",
                            "Go to products",
                            Package,
                            "/dashboard/products",
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
