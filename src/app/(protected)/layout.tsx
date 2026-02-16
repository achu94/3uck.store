import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";

export const metadata = {
    title: "Dashboard",
    description: "NextJs 15 App Router and NextAuth",
};

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-svh w-full">
                <AppSidebar />

                <SidebarInset className="flex-1">
                    <header className="flex h-16 items-center gap-2 px-4">
                        <SidebarTrigger />
                    </header>

                    <main className="p-4">{children}</main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
