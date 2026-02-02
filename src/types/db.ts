import type { Database } from "@/types/supabase";

/** ========= USERS ========= */
export type UserRow = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

/** ========= STORES ========= */
export type StoreRow = Database["public"]["Tables"]["stores"]["Row"];
export type StoreInsert = Database["public"]["Tables"]["stores"]["Insert"];
export type StoreUpdate = Database["public"]["Tables"]["stores"]["Update"];

/** ========= DOMAIN TYPES ========= */
export const STORE_TYPES = ["print", "model"] as const;
export type StoreType = (typeof STORE_TYPES)[number];

/**
 * Optional: erzwinge StoreType statt string (falls DB type nur string ist)
 */
export type Store = Omit<StoreRow, "type"> & { type: StoreType };

/** Inputs (wie du sie hattest) */
type StoreSystemFields = "id" | "uuid" | "created_at" | "updated_at";
type StoreImmutableFields = "name" | "slug";

export type StoreEditableFields = Omit<
    StoreRow,
    StoreSystemFields | StoreImmutableFields | "user_id"
>;

export type StoreCreateInput = Omit<
    StoreRow,
    StoreSystemFields | "is_aktiv"
>;

export type StoreUpdateInput =
    Pick<StoreRow, "id"> & Partial<StoreEditableFields>;

export type StoreSoftDeleteInput = {
    id: StoreRow["id"];
};

export type StoreSoftDeleteResponse = StoreRow;
