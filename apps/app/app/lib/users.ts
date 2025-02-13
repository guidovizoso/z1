import { redirect } from "@tanstack/react-router";
import { createMiddleware, createServerFn } from "@tanstack/react-start";
import {
  loginUser as supabaseLoginUser,
  logoutUser as supabaseLogoutUser,
} from "@z1/supabase/users/mutations";
import { getCurrentUser } from "@z1/supabase/users/queries";
import { z } from "zod";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const { data: user, error: _error } = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return next();
});

export const fetchCurrentUser = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data, error: _error } = await getCurrentUser();

    if (!data.user?.email) {
      return null;
    }

    return data.user;
  },
);

export const loginUser = createServerFn({ method: "POST" })
  .validator(z.object({ email: z.string().email(), password: z.string() }))
  .handler(async ({ data }) => {
    const { email, password } = data;

    const { data: user, error } = await supabaseLoginUser({ email, password });

    if (error) {
      throw error;
    }

    return user;
  });

export const logoutUser = createServerFn().handler(async () => {
  const { error } = await supabaseLogoutUser();

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  throw redirect({
    href: "/login",
  });
});
