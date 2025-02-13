import { Button } from "@z1/ui/button";
import { LoaderPinwheel } from "lucide-react";

export function Nav() {
  return (
    <nav className="h-16 bg-background border-b sticky top-0 z-20">
      <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
            <LoaderPinwheel strokeWidth={1.5} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/guidovizoso/z1"
            >
              Github
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
