import "@/app/globals.css";

import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import Provider from "@/components/Provider";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-sans",
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "NextJs 15 App Router and NextAuth",
    description: "NextJs 15 App Router and NextAuth",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={jetbrainsMono.variable}
            suppressHydrationWarning
        >
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
