import { authMiddleware } from "@/lib/users";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getPostById, getPosts } from "@z1/supabase/posts/queries";
import { z } from "zod";

export const fetchPosts = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const { data, error } = await getPosts();
    if (error) {
      throw error;
    }
    return data;
  });

export const postListQueryOptions = () =>
  queryOptions({
    queryKey: ["posts", "list"],
    queryFn: fetchPosts,
  });

export const fetchPostById = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { data, error } = await getPostById({ id });
    if (error) {
      throw error;
    }
    return data;
  });

export const postByIdQueryOptions = ({ id }: { id: string }) =>
  queryOptions({
    queryKey: ["posts", "details", id],
    queryFn: () => fetchPostById({ data: { id } }),
  });
