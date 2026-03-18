import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://3uck.store";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/dashboard", // Deine interne Verwaltung
                    "/api", // Backend-Endpunkte
                    "/login", // Muss nicht im Index sein
                    "/settings", // Private Einstellungen
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
