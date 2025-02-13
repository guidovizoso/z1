import { logoutUser } from "@/lib/users";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/logout")({
  preload: false,
  loader: () => logoutUser(),
});
