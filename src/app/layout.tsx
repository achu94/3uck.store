import Script from "next/script";

import "@/app/globals.css";

import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/sonner";

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
    title: "3uck.store",
    description: "Dein Store für besondere Vorlieben und ausgewählte Inhalte.",
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
                <Toaster />
            </body>
        </html>
    );
}
