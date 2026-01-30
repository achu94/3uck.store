import Script from "next/script";

import "@/app/globals.css";
import Provider from "@/components/Provider";

export const metadata = {
    title: "3uck.store — Bald verfügbar",
    description: "Wir arbeiten gerade an 3uck.store. Schau bald wieder vorbei!",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="de" data-theme="cupcake">
            <head>
                <Script
                    defer
                    src="https://cloud.umami.is/script.js"
                    data-website-id="202af267-80fb-49a0-96fb-669616512829"
                    strategy="afterInteractive"
                />
            </head>
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
