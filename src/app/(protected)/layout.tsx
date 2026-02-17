import {
    SidebarInset,
    SidebarProvider,
    MobileSidebarTrigger,
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
        <SidebarProvider defaultOpen={false}>
            <div className="flex min-h-screen w-full">
                <AppSidebar />

                <SidebarInset className="flex flex-1 flex-col">
                    <MobileSidebarTrigger />
                    <main className="flex-1 p-4">{children}</main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
