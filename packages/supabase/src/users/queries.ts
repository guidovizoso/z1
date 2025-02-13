import { AuthError, User } from "@supabase/supabase-js";
import { logger } from "@z1/logger";
import { getSupabaseServerClient } from "@z1/supabase/client";
import { Profile } from "../types";

export async function getCurrentUser() {
  const supabase = getSupabaseServerClient();

  try {
    const result = await supabase.auth.getUser();
    const userProfile = await supabase
      .from("users")
      .select("*")
      .eq("id", result.data.user?.id)
      .single();

    const withProfile = {
      ...result,
      data: {
        ...result.data,
        user: { ...result.data.user, profile: userProfile.data },
      },
    };
    return withProfile as
      | {
          data: {
            user: User & { profile: Profile };
          };
          error: null;
        }
      | {
          data: {
            user: null;
          };
          error: AuthError;
        };
  } catch (error) {
    logger.error(error);

    throw error;
  }
}
