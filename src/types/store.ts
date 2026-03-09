import { Database, Tables } from "@/types/supabase";

export const STORE_TYPES = ["print", "model"] as const;
export type StoreType = (typeof STORE_TYPES)[number];

export type StoreDataBase = Tables<"stores">;

type StoreSystemFields = "id" | "uuid" | "created_at" | "updated_at";
type StoreImmutableFields = "name" | "slug";

type StoreEditableFields = Omit<
    StoreDataBase,
    StoreSystemFields | StoreImmutableFields | "user_id"
>;

export type StoreCreateInput = Omit<
    Database["public"]["Tables"]["stores"]["Insert"],
    StoreSystemFields | "is_active"
>;

export type StoreUpdateInput = Pick<StoreDataBase, "id"> &
    Partial<StoreEditableFields>;

export type StoreSoftDeleteResponse = StoreDataBase;
