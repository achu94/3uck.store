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
        <html lang="en" data-theme="cupcake">
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
