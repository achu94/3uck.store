export const STORE_TYPES = ["print", "model"] as const;
export type StoreType = (typeof STORE_TYPES)[number];

export type StoreDataBase = {
    id: number;
    uuid: string;
    user_id: number;
    name: string;
    slug: string;
    description: string;
    logo_url: string;
    contact_email: string;
    is_aktiv: boolean;
    type: StoreType;
    created_at: Date;
    updated_at: Date;
};

type StoreSystemFields = "id" | "uuid" | "created_at" | "updated_at";

type StoreImmutableFields = "name" | "slug";

type StoreEditableFields = Omit<
    StoreDataBase,
    StoreSystemFields | StoreImmutableFields | "user_id"
>;

export type StoreCreateInput = Omit<
    StoreDataBase,
    StoreSystemFields | "is_aktiv"
>;

export type StoreUpdateInput = Pick<StoreDataBase, "id"> &
    Partial<StoreEditableFields>;

export type StoreSoftDeleteInput = {
    id: StoreDataBase["id"];
};

export type StoreSoftDeleteResponse = StoreDataBase;
