import { notFound } from "next/navigation";
import { RESERVED_SLUGS } from "@/lib/reservedSlugs";
import { PublicStore } from "@/app/components/public/PublicStore";

interface PageProps {
    params: Promise<{ storeSlug: string }>;
}

export default async function Page({ params }: PageProps) {
    const { storeSlug } = await params;
    const slug = storeSlug.toLowerCase();

    if (RESERVED_SLUGS.includes(slug)) {
        notFound();
    }

    return <PublicStore storeSlug={slug} />;
}

export async function generateMetadata({ params }: PageProps) {
    // 1. Await params (Wichtig für Next.js 15)
    const { storeSlug } = await params;

    // 2. Formatieren (Erster Buchstabe groß sieht im Tab schöner aus)
    const displayTitle = storeSlug.charAt(0).toUpperCase() + storeSlug.slice(1);

    return {
        title: `${displayTitle} | 3uck.store`,
        openGraph: {
            images: [
                {
                    // URL-Encoding für Sonderzeichen/Leerzeichen im Shopnamen
                    url: `/api/og?title=${encodeURIComponent(displayTitle)}`,
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };
}
