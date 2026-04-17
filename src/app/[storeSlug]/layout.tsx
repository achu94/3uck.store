import { PublicNavbar } from "@/app/components/public/PublicNavbar";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PublicNavbar />
            {children}
        </>
    );
}
