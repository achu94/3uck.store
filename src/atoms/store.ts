import { atom } from "jotai";

import type { StoreType } from "@/types/store";

export const storeTypeAtom = atom<StoreType | null>(null);
