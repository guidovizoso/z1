import { postByIdQueryOptions, postListQueryOptions } from "@/lib/posts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@z1/ui/button";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/_authed/posts/$postId")({
  loader: async ({ params, context }) => {
    const post = await context.queryClient.ensureQueryData(
      postByIdQueryOptions({ id: params.postId }),
    );

    return { post };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.post?.title }],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { postId } = Route.useParams();
  const { data: post } = useSuspenseQuery(postByIdQueryOptions({ id: postId }));

  return (
    <div className="flex-1 flex flex-col max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex flex-row items-center mt-6">
        <Button variant="ghost" size="sm" className="gap-2" asChild>
          <Link to="/">
            <ChevronLeft />
            Go back
          </Link>
        </Button>
      </div>
      <h1 className="text-foreground text-4xl/[1.1] font-bold tracking-tight md:text-5xl/[1.1] mt-20 text-center">
        {post?.title}
      </h1>
      <p className="text-muted-foreground mt-12 text-lg max-w-prose mx-auto">
        {post?.content}
      </p>
    </div>
  );
}
