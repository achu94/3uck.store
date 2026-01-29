import { notFound } from "next/navigation";
import { RESERVED_SLUGS } from "@/lib/reservedSlugs";
import { PublicStore } from "@/app/components/public/PublicStore";

interface PageProps {
    params: { storeSlug: string };
}

export default function Page({ params }: PageProps) {
    const slug = params.storeSlug.toLowerCase();

    // Block reserved pages
    if (RESERVED_SLUGS.includes(slug)) {
        notFound();
    }

    return <PublicStore storeSlug={slug} />;
}
