import { logger } from "@z1/logger";
import { getSupabaseServerClient } from "@z1/supabase/client";
import type { TablesUpdate } from "../types";

export async function updateUser(userId: string, data: TablesUpdate<"users">) {
  const supabase = getSupabaseServerClient();

  try {
    const result = await supabase.from("users").update(data).eq("id", userId);

    return result;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = getSupabaseServerClient();

  try {
    const result = await supabase.auth.signInWithPassword({ email, password });

    return result;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

export async function logoutUser() {
  const supabase = getSupabaseServerClient();

  return await supabase.auth.signOut();
}
