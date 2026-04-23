import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type BasketItem = {
    productId: string;
    storeId: number;
    storeSlug: string;
    title: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    selectedColor?: string;
    selectedMaterial?: string;
    selectedSize?: string;
};

export const basketAtom = atomWithStorage<BasketItem[]>("3uck-basket", []);

export const basketCountAtom = atom((get) =>
    get(basketAtom).reduce((acc, item) => acc + item.quantity, 0)
);

export const basketTotalAtom = atom((get) =>
    get(basketAtom).reduce((acc, item) => acc + item.price * item.quantity, 0)
);
