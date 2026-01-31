import "@/app/globals.css";

import Provider from "@/components/Provider";

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
        <html lang="en">
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
