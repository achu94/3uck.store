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
