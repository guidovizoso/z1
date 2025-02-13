import { logger } from "@z1/logger";
import { getSupabaseServerClient } from "@z1/supabase/client";

export async function getPosts() {
  const supabase = getSupabaseServerClient();

  try {
    const result = await supabase.from("posts").select("*");

    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function getPostById({ id }: { id: string }) {
  const supabase = getSupabaseServerClient();

  try {
    const result = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
