// User row wie sie aus der DB kommt
export type UserBase = {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  provider: string; // "google" | "credentials" | ...
  image: string | null;
  created_at: string;
  updated_at: string;
  provider_id: string | null;
};

export type UserInsert = Omit<UserBase, "id" | "created_at" | "updated_at">;
export type UserUpdate = Partial<UserInsert> & { id: string };