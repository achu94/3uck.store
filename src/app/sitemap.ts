import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://3uck.store",
            lastModified: new Date(),
        },
        {
            url: "https://3uck.store/datenschutz",
            lastModified: new Date(),
        },
        {
            url: "https://3uck.store/impressum",
            lastModified: new Date(),
        },
    ];
}
