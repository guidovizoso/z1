import { createServerClient } from "@supabase/ssr";
import { parseCookies, setCookie } from "vinxi/http";

/**
 * Creates and returns a Supabase server client instance.
 *
 * This function initializes the Supabase client with the provided environment variables
 * for the Supabase URL and anonymous key. It also sets up custom cookie handling for the
 * server environment.
 *
 * @returns {SupabaseClient} The initialized Supabase server client.
 *
 * @remarks
 * The `cookies` object provides custom implementations for getting and setting cookies.
 * The `getAll` method retrieves all cookies and returns them in an array of objects with
 * `name` and `value` properties. The `setAll` method sets multiple cookies based on the
 * provided array of cookie objects.
 *
 * @example
 * ```typescript
 * const supabaseClient = getSupabaseServerClient();
 * // Use the supabaseClient for database operations
 * ```
 */
export function getSupabaseServerClient() {
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        // @ts-ignore Wait till Supabase overload works
        getAll() {
          return Object.entries(parseCookies()).map(([name, value]) => ({
            name,
            value,
          }));
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            setCookie(cookie.name, cookie.value);
          });
        },
      },
    },
  );
}
