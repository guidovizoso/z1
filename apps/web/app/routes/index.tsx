import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@z1/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="container -mt-24">
        <div className="mt-5 max-w-2xl text-center mx-auto">
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl sm:leading-tight md:text-8xl">
            Create z1
          </h1>
        </div>
        <div className="mt-5 max-w-3xl text-center mx-auto">
          <p className="text-xl text-muted-foreground">
            An open-source starter kit to get your next project up and running.
          </p>
        </div>
        <div className="mt-8 gap-3 flex justify-center">
          <Button
            onClick={() => copyToClipboard("bunx degit guidovizoso/z1 z1")}
            size="lg"
          >
            bunx degit guidovizoso/z1 z1
          </Button>
        </div>
      </div>
    </div>
  );
}
