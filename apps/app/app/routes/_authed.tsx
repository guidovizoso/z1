import { Nav } from "@/components/nav";
import {
  Outlet,
  createFileRoute,
  redirect,
  useRouteContext,
} from "@tanstack/react-router";
import { UserWithProfile } from "@z1/supabase/types";

export const Route = createFileRoute("/_authed")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useRouteContext({
    from: "/_authed",
  }) as { user: UserWithProfile };

  return (
    <>
      <Nav profile={user.profile} />
      <div className="h-full flex-1 flex flex-col">
        <Outlet />
      </div>
    </>
  );
}
