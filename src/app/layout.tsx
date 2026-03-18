import "@/app/globals.css";

import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

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
    title: "3uck.store – Plattform für 3D-Designer & 3D-Druck Anbieter",
    description:
        "Erstelle deinen eigenen Shop für 3D-Modelle und 3D-Druck. Verkaufe STL-Dateien oder gedruckte Produkte einfach online mit 3uck.store.",

    keywords: [
        "3D Druck verkaufen",
        "3D Modelle verkaufen",
        "STL verkaufen",
        "3D Druck Shop",
        "3D Designer Plattform",
    ],
    authors: [{ name: "3uck.store" }],
    creator: "3uck.store",

    // Open Graph (Discord, WhatsApp, Facebook)
    openGraph: {
        title: "3uck.store",
        description:
            "Dein Store für besondere Vorlieben und ausgewählte Inhalte.",
        url: "https://3uck.store",
        siteName: "3uck.store",
        locale: "de_DE",
        type: "website",
        images: [
            {
                url: "/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "3uck.store",
            },
        ],
    },

    // Twitter Cards
    twitter: {
        card: "summary_large_image",
        title: "3uck.store",
        description:
            "Dein Store für besondere Vorlieben und ausgewählte Inhalte.",
        images: ["/images/og-image.png"],
    },

    // Icons / Favicons
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },

    metadataBase: new URL("https://3uck.store"),

    robots: {
        index: true,
        follow: true,
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="de"
            className={jetbrainsMono.variable}
            suppressHydrationWarning
        >
            <head>
                <Script
                    defer
                    src="https://cloud.umami.is/script.js"
                    data-website-id="202af267-80fb-49a0-96fb-669616512829"
                    strategy="afterInteractive"
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Provider>{children}</Provider>
                <Toaster />
            </body>
        </html>
    );
}
