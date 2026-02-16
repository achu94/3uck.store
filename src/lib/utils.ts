import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type AssetUrlType = "USER" | "STORE" | "ITEM";

export function getAssetsUrl(type: AssetUrlType) {
    const assetUrls: Record<AssetUrlType, string> = {
        USER: process.env.NEXT_PUBLIC_USER_ASSET_URL!,
        STORE: process.env.NEXT_PUBLIC_STORE_ASSET_URL!,
        ITEM: process.env.NEXT_PUBLIC_ITEM_ASSET_URL!,
    };

    return assetUrls[type];
}
