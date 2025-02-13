import { Link } from "@tanstack/react-router";
import { Profile } from "@z1/supabase/types";
import { Button } from "@z1/ui/button";
import { LoaderPinwheel, LogOut } from "lucide-react";

export function Nav({ profile }: { profile: Profile }) {
  return (
    <nav className="h-16 bg-background border-b sticky top-0 z-20">
      <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
            <LoaderPinwheel strokeWidth={1.5} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>{profile.email}</div>
          <Button asChild size="icon" variant="outline">
            <Link to="/logout">
              <LogOut />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
