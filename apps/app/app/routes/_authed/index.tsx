import { postListQueryOptions } from "@/lib/posts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight, FileText } from "lucide-react";

export const Route = createFileRoute("/_authed/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(postListQueryOptions());
  },
  head: () => ({
    meta: [{ title: "Dashboard" }],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { data: posts } = useSuspenseQuery(postListQueryOptions());

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="w-full max-w-lg mx-auto bg-background border border-border rounded-2xl shadow-xs">
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight">Posts</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Latest posts by users.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={"/posts/$postId"}
                params={{ postId: post.id }}
              >
                <div className="group flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors duration-200 cursor-pointer">
                  <div className="flex-none p-2 rounded-lg bg-muted">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{post.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {post.content}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
