import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
