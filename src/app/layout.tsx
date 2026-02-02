import "@/app/globals.css";

import { Inter } from "next/font/google";
import Provider from "@/components/Provider";

export const metadata = {
    title: "NextJs 15 App Router and NextAuth",
    description: "NextJs 15 App Router and NextAuth",
};

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.variable}>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
