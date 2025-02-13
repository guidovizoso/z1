import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Database, Tables } from "./db";

export type Client = SupabaseClient<Database>;

export * from "./db";

export type Profile = Tables<"users">;
export type UserWithProfile = User & { profile: Profile };
export type Post = Tables<"posts">;
